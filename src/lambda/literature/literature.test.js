process.env.AWS_REGION = "us-east-1";
process.env.ENV = "dev";
const {literature} = require("./literature");

async function main() {
    const event = {
        queryStringParameters: {
            author: "virgil",
            work: "georgicon"
        }
    }
    const response = await literature(event);
    console.log("Response:", response)
}
main()