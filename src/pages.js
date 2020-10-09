import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import Search from "./components/Search"
import Bookmarks from "./components/Bookmarks"
import Literature from "./components/Literature"
import Grammar from "./components/Grammar"
import Dictionary from "./components/Dictionary"
import Settings from "./components/Settings"
import Suggestions from "./components/Suggestions"
import About from "./components/About"

export default [
    {
        Name: "Search",
        name: "search",
        icon: <SearchIcon/>,
        component: <Search/>
    },
    {
        Name: "Bookmarks",
        name: "bookmarks",
        icon: <BookmarkIcon/>,
        component: <Bookmarks/>
    },
    {
        Name: "Literature",
        name: "literature",
        icon: <VisibilityIcon/>,
        component: <Literature/>
    },
    {
        Name: "Grammar",
        name: "grammar",
        icon: <CreateIcon/>,
        component: <Grammar/>
    },
    {
        Name: "Dictionary",
        name: "dictionary",
        icon: <MenuBookIcon/>,
        component: <Dictionary/>
    },
    {
        Name: "Settings",
        name: "settings",
        icon: <SettingsIcon/>,
        component: <Settings/>
    },
    {
        Name: "Suggestions",
        name: "suggestions",
        icon: <InboxIcon/>,
        component: <Suggestions/>
    },
    {
        Name: "About",
        name: "about",
        icon: <AccountBalanceIcon/>,
        component: <About/>
    }
]
