const expect = require("chai").expect;
const keyword = require("../main/process/keyword");

describe("Keyword Extraction", function () {
    describe("Extract keyword from text", function () {
        it("extract words that occur most frequent", function () {
            const testString = "Hello, my name is X, what is your name?";

            expect(keyword.getKeywordsFromText(testString, 1)[0]).to.equal("name");
        });

        it("find expected number of keyword", function () {
            const testString = "I am trying to test my firebase security rules, using Typescript and Mocha, but I can't even run my test";
            expect(keyword.getKeywordsFromText(testString, 3).length).to.equal(3);
        })

        it("not influenced by special character", function () {
            const testString = "I feel so bored. . . . ., too bored!";
            expect(keyword.getKeywordsFromText(testString, 1)[0]).to.equal("bored");
        })

        it("word in the same semantic meaning but different form will be considered one", function () {
            const testString = "These classes are not following class convention, class, classes";
            expect(keyword.getKeywordsFromText(testString, 1)[1]).to.not.equal("classes");
        })
    });
});