const { TitleGenerator, DescriptionGenerator } = require("../models/image-caption-model")


const GPTEndpoint = "https://open-gpt.app/api/generate";

const generateTitle = async (input) => {
	try {
		const response  = await fetch(GPTEndpoint, {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				userInput: input,
				id: TitleGenerator.ID,
				userKey: TitleGenerator.UserKey
			}),
			method: 'POST'
		}).then(res => res.text());
		return TitleGenerator.extract(response);
	} catch (error) {
		console.log(error);
		return "Generate title/tags failed!"
	}
}

const generateDescription = async (input) => {
	try {
		const response  = await fetch(GPTEndpoint, {
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				userInput: input,
				id: DescriptionGenerator.ID,
				userKey: DescriptionGenerator.UserKey
			}),
			method: 'POST'
		}).then(res => res.text());
		return DescriptionGenerator.extract(response);
	} catch (error) {
		console.log(error);
		return "Generate description failed!"
	}
}

const generate = async (req, res) => {
	const input = req.query.rq
	console.log("input is ", input);
	const result = await generateTitle(input);
	console.log(result);
	return res.status(200).json({
		code: 1,
		output: result
	})
}

const captionImage = async (req, res) => {
	const apiKey = process.env.JINAAI_SECRET;
	// https://scenex.jina.ai/api
	const {langs = ["en", 'zh'], alg, features = [], len = 200,  style = "default", images = [] } = req.body;
	const mappedLangs = langs.map(lang => lang === "cn" ? "zh" : lang);
	console.log(`new request here!!!! langs is ${mappedLangs}, alg is ${alg}, style is ${style}, features is ${features}, len is ${len}`);
	const data = images.map(image => {
		return {
			image,
			languages: mappedLangs,
			algorithm: alg || "Aqua",
			features,
			output_length: len,
			style,

		}
	})
	try {
		const response = await fetch('https://api.scenex.jina.ai/v1/describe', {
			headers: {
				'x-api-key': `token ${apiKey}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({data}),
			method: 'POST'
		}).then(res => res.json());
		console.log("request got response now!!!");
		const { result } = response;

		await Promise.all(result.map(async r => {
			const text = mappedLangs[0] ? r.i18n[mappedLangs[0]] || r.text : r.text;
			const [titleAndTags, description] = await Promise.all([generateTitle(text), generateDescription(text)]);
			r.description = description;
			const randomIdx = Math.floor(Math.random()*titleAndTags.length);
			const randomPairs = titleAndTags[randomIdx];
			r.title = randomPairs.title;
			r.tags = randomPairs.tags;
		}))


		return res.status(response.code).json({
			sucess: true,
			code: 1,
			description: "生成成功",
			data: result
		})

	} catch (error) {

		return res.status(400).json({
			sucess: false,
			error: error.response
			? error.response.data
			: 'There was an inssue on the server'
		})

	}
}

module.exports = {
	generate,
	captionImage
}
