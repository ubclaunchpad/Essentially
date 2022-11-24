const keywordExtractor = require("../process/keyword");

exports.getKeyword = async (req, res) => {
    res.send(await keywordExtractor.getKeywordsFromText(req.body.text, req.body.numOfKeywords));
};