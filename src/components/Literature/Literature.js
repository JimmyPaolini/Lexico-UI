import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import LiteratureCard from "./LiteratureCard";
import SearchBar from "../Search/SearchBar";
import caesar from "../../data/Literature/caesar.json";
import virgil from "../../data/Literature/virgil.json";
import ovid from "../../data/Literature/ovid.json";
const authorsOriginal = [caesar, virgil, ovid];

export default function Literature() {
    const classes = useStyles();
    const [authors, setAuthors] = useState(authorsOriginal);
    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState("");

    useEffect(() => {
        setAuthors(filterAuthors(authorsOriginal, searched))
    }, [searched]);

    const handleSearchChange = e => {
        setSearch(e.target.value);
        if (!e.target.value) setSearched(e.target.value);
    }
    
    return (
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <SearchBar 
                search={search} 
                handleSearchChange={handleSearchChange} 
                handleSearchExecute={() => setSearched(search)} 
                target="literature"/>
            <Grid item container justify="center">
                {authors.map((author, i) => (
                    <Grow in={true} {...(i ? {timeout: 800*Math.pow(i,1/8)} : {})} key={author.author}>
                        <Grid item className={classes.card}>
                            <LiteratureCard author={author.author} work={author.work}/>
                        </Grid>
                    </Grow>
                ))}
            </Grid>
        </Grid>
    );
}

function filterAuthors(authors, search) {
    const re = new RegExp(search, "i");
    return authors.filter((author) => {
        if (author.author.match(re)) return true;
        return filterWork(author.work);
    });

    function filterWork(work) {
        if (work.title.match(re)) return true;
        if (!work.subworks) return false;
        return work.subworks.some(subwork => filterWork(subwork));
    }
}

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(2),
    }
}));