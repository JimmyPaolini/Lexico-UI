const AWS = require("aws-sdk");
const cheerio = require("cheerio");
const axios = require("axios");
const s3 = new AWS.S3({region: process.env.AWS_REGION});
const Bucket = "lexico-dictionary-" + process.env.ENV;
const englishUrl = word => `http://archives.nd.edu/cgi-bin/wordz.pl?english=${word}`;

exports.search = async (event) => {
    // console.log("Event:", JSON.stringify(event, null, 2));
    const word = normalize(event.queryStringParameters.search.toLowerCase().trim());
    if (event.rawPath.match(/latin/)) {
        const results = await getWord(word);
        if (results.statusCode > 399) return results;
        return {statusCode: 200, body: JSON.stringify(results)};    
    } else if (event.rawPath.match(/english/)) {
        let words = [];
        try {
            const { data: html } = await axios.get(englishUrl(word));
            const $ = cheerio.load(html);
            const text = $("pre").text();
            words  = text.split("\n")
                .filter(line => line.match(/\[[A-Z]+\]/))
                .map(line => line.split(",")[0]);
        } catch (e) {
            return logret(404, `Error: unable to fetch latin words: ${e}`);
        }
        const results = [];
        for (const word of words) {
            const entry = await getWord(word);
            if (!entry.statusCode || entry.statusCode <= 399) results.push(...entry);
        }
        if (!results.length) return logret(404, "Error: no results found");
        return results;
    }
};

async function getWord(word) {
    const results = [];
    let entry1;
    try {
        entry1 = await getEntry(word);
    } catch (e) {
        return logret(404, `Error: word not found in dictionary: ${e}`);
    }
    for (const etymology1 of entry1.etymologies) {
        if (etymology1.root) {
            results.push(etymology1);
        } else {
            const etymology1Root = getRoot(etymology1);
            try {
                const entry2 = await getEntry(etymology1Root);
                const etymology2 = entry2.etymologies.find(etymology2 => 
                    etymology2.principalParts.every((principalPart, i) => 
                        principalPart === etymology1.principalParts[i]
                    )
                );
                if (etymology2) results.push(etymology2);
                else logret(404, `Error: root etymology not found in entry: ${entry2}`);
            } catch (e) {
                logret(404, `Error: root word "${etymology1Root}" not found in dictionary: ${e}`);
            }
        }
    }

    return results;
}

async function getEntry(word) {
    console.log("Getting entry:", word);
    const response = await s3.getObject({Bucket, Key: `${word}.json`}).promise();
    const entry = JSON.parse(response.Body);
    return entry;
}

function getRoot(etymology) {
    return normalize(etymology.principalParts[0].split(": ")[1]);
}

function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

function logret(statusCode, body) {
    if (typeof body !== "string") body = JSON.stringify(body, null, 2);
    console.log(statusCode, body);
    return {statusCode, body};
}