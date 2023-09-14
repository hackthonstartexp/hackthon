class TitleGenerator {
	static ID = "clfjbasiy000ola09946i7xv8";
	static UserKey = "0D89F37D-E002-4CA3-9BB4-2C672D0082EE";


	static extract(rawResp) {
		const raws = rawResp.split("\n");
		const validRaws = raws.filter(s => s);

		const results = [];
		console.log("validRaws", validRaws, rawResp);
		validRaws.forEach(raw => {
			const parts = raw.split("#");
			const title = parts[0];
			const validTags = parts.slice(1, -1);
			const ret = {
				title: title.trim().replace(/^\d\./, "").trim(),
				tags: validTags
			}
			results.push(ret);
		});

		return results.filter(ret => ret.tags.length >0);
	}
}

class DescriptionGenerator {
	static ID = "clf2awmv0001mjt08hjtcpe90";
	static UserKey = "0D89F37D-E002-4CA3-9BB4-2C672D0082EE";

	static extract(response) {
		return response;
	}
}

module.exports = {
	TitleGenerator,
	DescriptionGenerator
}
