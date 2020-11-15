import Search from "./components/Search/Search"
import Bookmarks from "./components/Bookmarks/Bookmarks"
import Literature from "./components/Literature/Literature"
import Grammar from "./components/Grammar"
// import Dictionary from "./components/Dictionary"
import Settings from "./components/Settings"
import Suggestions from "./components/Suggestions"
import About from "./components/About"

import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkIcon from "@material-ui/icons/Bookmark";
// import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const pages = [
    {
        Name: "Search",
        name: "search",
        icon: <SearchIcon/>,
        component: <Search/>,
        keybind: " "
    },
    {
        Name: "Bookmarks",
        name: "bookmarks",
        icon: <BookmarkIcon/>,
        component: <Bookmarks/>,
        keybind: "b"
    },
    {
        Name: "Literature",
        name: "literature",
        icon: <MenuBookIcon/>,
        component: <Literature/>,
        keybind: "l"
    },
    {
        Name: "Grammar",
        name: "grammar",
        icon: <CreateIcon/>,
        component: <Grammar/>,
        keybind: "g"
    },
    // {
    //     Name: "Dictionary",
    //     name: "dictionary",
    //     icon: <VisibilityIcon/>,
    //     component: <Dictionary/>,
    //     keybind: "d"
    // },
    {
        Name: "Settings",
        name: "settings",
        icon: <SettingsIcon/>,
        component: <Settings/>,
        keybind: "s"
    },
    {
        Name: "Suggestions",
        name: "suggestions",
        icon: <InboxIcon/>,
        component: <Suggestions/>,
        keybind: ""
    },
    {
        Name: "About",
        name: "about",
        icon: <AccountBalanceIcon/>,
        component: <About/>,
        keybind: ""
    }
];

export default pages;