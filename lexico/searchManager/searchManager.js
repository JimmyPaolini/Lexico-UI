const AWS = require("aws-sdk");
const s3 = new AWS.S3({region: "us-east-1"});
const Bucket = "lexico-dictionary";

const logret = (statusCode, result) => {
    const body = JSON.stringify(result, null, 2);
    console.log(statusCode, body);
    return {statusCode, body};
};

async function getWord(word) {
    const response = await s3.getObject({Bucket, Key: `${word}.json`}).promise();
    return JSON.parse(response.Body);
}

async function searchRecurse(search, result, remainingRecurses) {
    if (!remainingRecurses) return result;
    console.log(search, result);
    const entry = await getWord(search);
    if (!result.word) result.word = entry.word;
    for (const etymology of entry.etymologies) {
        if (etymology.root) result.etymologies.push(etymology);
        else {
            const root = etymology.principalParts[0].split(": ")[1]
                .normalize("NFD").replace(/[\u0300-\u036f]/g,"");
            result = await searchRecurse(root, result, remainingRecurses - 1);
        }
    }
    return result;
}

exports.manageSearch = async (search) => {
    if (search.body) {
        console.log("Event:", JSON.stringify(search, null, 2));
        search = JSON.parse(search.body);
    } else console.log("Search:", JSON.stringify(search, null, 2));
    
    let result;
    try {
        result = await searchRecurse(search, {etymologies: []}, 2);
    } catch (e) {
        return logret(404, "not found");
    }
    return logret(200, result);
};
