const {manageSearch} = require("../searchManager");
const search = "amo";

main()
async function main() {
    const response = await manageSearch(search);
    console.log("Response", response);
}