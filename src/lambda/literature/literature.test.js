process.env.AWS_REGION = "us-east-1";
process.env.ENV = "dev";
const { literature } = require("./literature");

async function main() {
    const event = {
        rawPath: '/literature/ovid/metamorphoses/book 7.txt'
    }
    const response = await literature(event);
    console.log("Response:", JSON.stringify(response, null, 2));
}
main();