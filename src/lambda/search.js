const AWS = require("aws-sdk");
const s3 = new AWS.S3({region: process.env.AWS_REGION});
const Bucket = "lexico-dictionary-" + process.env.ENV;

exports.search = async (event) => {
    console.log("Event:", JSON.stringify(event, null, 2));
    const word = normalize(event.queryStringParameters.search.toLowerCase());
    
    const results = [];
    let entry1;
    try {
        entry1 = await getEntry(word);
    } catch (e) {
        return logret(404, `word not found in dictionary: ${e}`);
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
                else logret(404, `root etymology not found in entry: ${entry2}`);
            } catch (e) {
                logret(404, `root word "${etymology1Root}" not found in dictionary: ${e}`);
            }
        }
    } 
    
    return logret(200, results);
};

async function getEntry(word) {
    const response = await s3.getObject({Bucket, Key: `${word}.json`}).promise();
    const entry = JSON.parse(response.Body);
    console.log("Got entry:", JSON.stringify(entry, null, 2));
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