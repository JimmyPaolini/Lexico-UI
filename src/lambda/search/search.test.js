process.env.AWS_REGION = "us-east-1";
process.env.ENV = "dev";
const {search} = require("./search");

const word = "amo"

async function main() {
    const event = {
        queryStringParameters: {
            search: word
        }
    }
    const response = await search(event);
    console.log("Response:", response)
}
main()