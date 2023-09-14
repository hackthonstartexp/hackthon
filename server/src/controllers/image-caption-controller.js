const { TitleGenerator, DescriptionGenerator } = require("../models/image-caption-model")


const titleGeneratorEndpoint = "https://open-gpt.app/api/generate";
const titleGeneratorId = "clfjbasiy000ola09946i7xv8";

module.exports = {
	async generateTitle(input) {
		try {
			const response  = await fetch(titleGeneratorEndpoint, {
				headers: {
					'x-api-key': `token ${apiKey}`,
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					userInput: input,
					id: TitleGenerator.ID,
					userKey: TitleGenerator.UserKey
				}),
				method: 'POST'
			}).then(res => res.json());

			// const resp
		} catch (error) {

		}
	},

	async captionImage(req, res){

		const apiKey = process.env.JINAAI_SECRET;

		// https://scenex.jina.ai/api
		const {langs = ["en"], alg, features = [], len = 200,  style = "default", images = [] } = req.body;

		const data = images.map(image => {
			return {
				image,
				languages: langs,
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

			return res.status(response.code).json({
				sucess: true,
				data: response.result
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

}
