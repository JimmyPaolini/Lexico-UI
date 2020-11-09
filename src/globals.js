export const SEARCH_URL = "https://i9ic4m487l.execute-api.us-east-1.amazonaws.com?search=";
export const searchLexico = async (search, args) => {
    return await fetch(SEARCH_URL + search, args).then(r => r.json());
}

export function getId(etymology) {
    return etymology.principalParts.map(pp => pp.split(": ")[1].replace(" or ", "/")).join(", ");
}