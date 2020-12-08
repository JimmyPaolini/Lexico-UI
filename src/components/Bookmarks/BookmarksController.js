import { getId } from "../../globals";

if (!window.localStorage.bookmarks) window.localStorage.bookmarks = JSON.stringify({});

try {
    JSON.parse(window.localStorage.bookmarks);
} catch (e) {
    console.error("Malformed bookmarks object in local storage. Clearing bookmarks to fix the issue");
    window.localStorage.bookmarks = JSON.stringify({});
}

export function getBookmarks() {
    return JSON.parse(window.localStorage.bookmarks);
}

export function setBookmarks(bookmarks) {
    window.localStorage.bookmarks = JSON.stringify(bookmarks);
}

export function isBookmarked(etymology) {
    const bookmarks = getBookmarks();
    return !!bookmarks[getId(etymology)];
}

export function createBookmark(etymology) {
    const bookmarks = getBookmarks();
    bookmarks[getId(etymology)] = etymology;
    setBookmarks(bookmarks);
}

export function deleteBookmark(etymology) {
    const bookmarks = getBookmarks();
    delete bookmarks[getId(etymology)]
    setBookmarks(bookmarks);
}