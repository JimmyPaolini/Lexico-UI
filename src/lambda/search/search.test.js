process.env.AWS_REGION = "us-east-1";
process.env.ENV = "dev";
const {search} = require("./search");

async function main() {
    const event = {
        rawPath: "/english",
        queryStringParameters: {
            search: "water"
        }
    }
    const response = await search(event);
    console.log("Response:", JSON.stringify(response, null, 2))
}
main()