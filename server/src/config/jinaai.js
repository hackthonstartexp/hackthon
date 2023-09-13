const { Configuration, OpenAIApi } = require('openai')
require("dotenv").config()

module.exports = class openai{

	static configuration(){
		const configuration = new Configuration({
			apiKey: process.env.OPEN_AI_KEY,
		})

		return new OpenAIApi(configuration)
	}
}
