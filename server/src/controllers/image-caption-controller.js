const inputPrompt = require("../models/input-prompt")

module.exports = {
	async captionImage(req, res){

		const apiKey = process.env.JINAAI_SECRET;
		// const payload = req.query;
		try {
			const response = await fetch('https://api.scenex.jina.ai/v1/describe', {
				headers: {
					'x-api-key': `token ${apiKey}`,
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					data: [
				{image: "https://picsum.photos/200", features: []},
				{image: "https://cdn.discordapp.com/attachments/1083723388712919182/1089909178266558554/HannaD_A_captivating_digital_artwork_features_a_red-haired_girl_664d73dc-b537-490e-b044-4fbf22733559.png", features: []},
				]
				}),
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
