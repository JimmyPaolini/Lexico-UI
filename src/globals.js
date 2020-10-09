export const API_URL = "https://ls8eaut3di.execute-api.us-east-1.amazonaws.com";

export const searchLexico = (search, args) => {
    return fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(search),
        ...args
    }).then(r => r.json());
}