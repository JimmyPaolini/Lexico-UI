const {search} = require("../lambda/search");

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