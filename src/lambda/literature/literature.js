const AWS = require("aws-sdk");
const s3 = new AWS.S3({region: process.env.AWS_REGION});
const Bucket = "lexico-literature-" + process.env.ENV;

exports.literature = async (event) => {
    console.log("Event:", JSON.stringify(event, null, 2));
    const qsp = event.queryStringParameters;
    if (!qsp) {
        const literature = await getLiterature();
        return logret(200, literature);
    } 
    if (qsp.author && qsp.work && qsp.subwork) {
        const subwork = await getSubwork(qsp.author, qsp.work, qsp.subwork);
        return logret(200, subwork);
    } 
    if (qsp.author && qsp.work) {
        const work = await getWork(qsp.author, qsp.work);
        return logret(200, work);
    } 
    if (qsp.author) {
        const author = await getAuthor(qsp.author);
        return logret(200, author);
    } 
    return logret(400, "Invalid request");
};

async function listAllObjects(Prefix) {
    console.log("Prefx:", Prefix);
    const literature = [];
    let response = await s3.listObjectsV2({Bucket, Prefix}).promise();
    literature.push(...response.Contents.map(object => object.Key));
    while (response.IsTruncated) {
        response = await s3.listObjectsV2({Bucket, Prefix, ContinuationToken: response.NextContinuationToken}).promise();
        literature.push(...response.Contents.map(object => object.Key));
    }
    return literature;
}

async function getLiterature() {
    return await listAllObjects("");
}

async function getAuthor(author) {
    return await listAllObjects(author);
}

async function getWork(author, work) {
    return await listAllObjects(author + "/" + work);
}

async function getSubwork(author, work, subwork) {
    return await listAllObjects(author + "/" + work + "/" + subwork);
}

function logret(statusCode, body) {
    if (typeof body !== "string") body = JSON.stringify(body, null, 2);
    console.log(statusCode, body);
    return {statusCode, body};
}