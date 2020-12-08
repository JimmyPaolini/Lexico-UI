const AWS = require("aws-sdk");
const s3 = new AWS.S3({ region: process.env.AWS_REGION });
const Bucket = "lexico-literature-" + process.env.ENV;

exports.literature = async (event) => {
    // console.log("Event:", JSON.stringify(event, null, 2));
    try {
        if (event.rawPath.match(/.*\.txt$/)) {
            const Key = event.rawPath.split("/").slice(2).filter(x => !!x).join("/");
            console.log("Key", Key);
            const text = (await s3.getObject({ Bucket, Key }).promise()).Body.toString();
            return { statusCode: 200, body: text };
        } else {
            let response = await s3.listObjectsV2({ Bucket }).promise();
            const keys = response.Contents.map(obj => obj.Key);
            while (response.IsTruncated) {
                response = await s3.listObjectsV2({ Bucket, ContinuationToken: response.NextContinuationToken }).promise();
                keys.push(...response.Contents.map(obj => obj.Key));
            }
            return { statusCode: 200, body: JSON.stringify(keys) };
        }
    } catch (e) {
        return logret(404, `Literature not found: ${e.toString()}`);
    }
};

function logret(statusCode, body) {
    if (typeof body !== "string") body = JSON.stringify(body, null, 2);
    console.log(statusCode, body);
    return { statusCode, body };
}