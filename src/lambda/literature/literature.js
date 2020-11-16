const AWS = require("aws-sdk");
const s3 = new AWS.S3({region: process.env.AWS_REGION});
const Bucket = "lexico-literature-" + process.env.ENV;

exports.literature = async (event) => {
    // console.log("Event:", JSON.stringify(event, null, 2));
    try {
        const pathArray = event.rawPath.split("/").slice(2).filter(x => !!x);
        if (!event.rawPath.match(/\.txt/)) pathArray.push("info.json");
        const Key = pathArray.join("/");
        console.log("Key", Key);
        const object = await s3.getObject({Bucket, Key}).promise();
        const body = object.Body.toString();
        return {statusCode: 200, body};
    } catch (e) {
        return logret(400, `Invalid request path: ${e.toString()}`);
    }
};

function logret(statusCode, body) {
    if (typeof body !== "string") body = JSON.stringify(body, null, 2);
    console.log(statusCode, body);
    return {statusCode, body};
}