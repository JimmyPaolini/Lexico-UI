import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { searchLexico } from "../globals";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Home from "./Home";

let controller = new AbortController();
let signal = controller.signal;

export default function Search() {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const handleSearchChange = e => setSearch(e.target.value);

    const [results, setResults] = useState(null);
    const handleSearch = e => {
        if (e.keyCode !== 13) return;
        if (!search) {
            setResults(null);
            return;
        }
        setLoading(true);
        controller.abort()
        controller = new AbortController();
        signal = controller.signal;
        searchLexico(search, {signal}).then(entry => {
            console.log(entry);
            if (entry === "not found") setResults("not found");
            else setResults(entry);
            setLoading(false);
        });
    }

    const [loading, setLoading] = useState(false);

    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <SearchBar search={search} handleSearch={handleSearch} handleSearchChange={handleSearchChange}/>
            </Box>
            <Box display="flex" justifyContent="center" flexWrap="wrap" flexDirection="row">
                {results
                    ? results === "not found"
                        ? <Typography variant="h4" color="textPrimary">Not found</Typography>
                        : <SearchResults results={results} search={search}/>
                    : loading
                        ? <CircularProgress color="secondary" />
                        : <Home in={!results}/>
                }
            </Box>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({

}));