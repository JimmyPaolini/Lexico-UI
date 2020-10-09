import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormTabs from "./FormTabs";
import FormTable from "./FormTable";
import Box from "@material-ui/core/Box";

export default function VerbCard({forms}) {
    const classes = useStyles();
    const [topTab, setTopTabState] = useState(0);
    const [midTab, setMidTabState] = useState(0);
    const [bottomTab, setBottomTab] = useState(0);

    const structure = verbFormsRestructure(forms);
    let topTabs = Object.keys(structure);
    let midTabs = Object.keys(structure?.[topTabs[topTab]] || {"-":""});
    let bottomTabs = Object.keys(structure?.[topTabs[topTab]]?.[midTabs[midTab]] || {"-":""});

    const setTopTab = newTopTab => {
        const oldBottomTab = bottomTabs[bottomTab];
        const oldMidTab = midTabs[midTab];

        setTopTabState(newTopTab);

        midTabs = Object.keys(structure?.[topTabs[newTopTab]] || {"-":""});
        const newMidTab = midTabs.indexOf(oldMidTab) !== -1 ? midTabs.indexOf(oldMidTab) : 0;
        setMidTabState(midTabs.indexOf(oldMidTab) !== -1 ? midTabs.indexOf(oldMidTab) : 0);

        bottomTabs = Object.keys(structure?.[topTabs[newTopTab]]?.[midTabs[newMidTab]] || {"-":""});
        setBottomTab(bottomTabs.indexOf(oldBottomTab) !== -1 ? bottomTabs.indexOf(oldBottomTab) : 0);
    }

    const setMidTab = newMidTab => {
        const oldBottomTab = bottomTabs[bottomTab];

        setMidTabState(newMidTab);

        bottomTabs = Object.keys(structure?.[topTabs[topTab]]?.[midTabs[newMidTab]] || {"-":""});
        setBottomTab(bottomTabs.indexOf(oldBottomTab) !== -1 ? bottomTabs.indexOf(oldBottomTab) : 0);
    }

    const formsStructure = structure[topTabs[topTab]][midTabs[midTab]][bottomTabs[bottomTab]]

    return (
        <Paper className={classes.paper} elevation={0}>
            <FormTabs tabs={topTabs} activeTab={topTab} setActiveTab={setTopTab}>
                <FormTabs tabs={midTabs} activeTab={midTab} setActiveTab={setMidTab}>
                    <FormTabs tabs={bottomTabs} activeTab={bottomTab} setActiveTab={setBottomTab}>
                        <Box style={{height: "8px"}}/>
                        <FormTable forms={formsStructure} />
                        <Box style={{height: "4px"}}/>
                    </FormTabs>
                </FormTabs>
            </FormTabs>
        </Paper>
    )
}

const verbFormsRestructure = conjugations => {
    const structure = {...structureTemplate};
    function toFormTable(conj, struc) {
        struc[0].center = conj?.singular?.first?.join(",\n")
        struc[1].center = conj?.singular?.second?.join(",\n")
        struc[2].center = conj?.singular?.third?.join(",\n")
        struc[3].center = conj?.plural?.first?.join(",\n")
        struc[4].center = conj?.plural?.second?.join(",\n")
        struc[5].center = conj?.plural?.third?.join(",\n")
    }

    toFormTable(conjugations?.indicative?.active?.present, structure.IND.PRES.ACT)
    toFormTable(conjugations?.indicative?.passive?.present, structure.IND.PRES.PAS)
    toFormTable(conjugations?.indicative?.active?.imperfect, structure.IND.IMP.ACT)
    toFormTable(conjugations?.indicative?.passive?.imperfect, structure.IND.IMP.PAS)
    toFormTable(conjugations?.indicative?.active?.future, structure.IND.FUT.ACT)
    toFormTable(conjugations?.indicative?.passive?.future, structure.IND.FUT.PAS)
    toFormTable(conjugations?.indicative?.active?.perfect, structure.IND.PERF.ACT)
    toFormTable(conjugations?.indicative?.passive?.perfect, structure.IND.PERF.PAS)
    toFormTable(conjugations?.indicative?.active?.pluperfect, structure.IND.PLUP.ACT)
    toFormTable(conjugations?.indicative?.passive?.pluperfect, structure.IND.PLUP.PAS)
    toFormTable(conjugations?.indicative?.active?.["future perfect"], structure.IND.FUTP.ACT)
    toFormTable(conjugations?.indicative?.passive?.["future perfect"], structure.IND.FUTP.PAS)

    toFormTable(conjugations?.subjunctive?.active?.present, structure.SUB.PRES.ACT)
    toFormTable(conjugations?.subjunctive?.passive?.present, structure.SUB.PRES.PAS)
    toFormTable(conjugations?.subjunctive?.active?.imperfect, structure.SUB.IMP.ACT)
    toFormTable(conjugations?.subjunctive?.passive?.imperfect, structure.SUB.IMP.PAS)
    toFormTable(conjugations?.subjunctive?.active?.perfect, structure.SUB.PERF.ACT)
    toFormTable(conjugations?.subjunctive?.passive?.perfect, structure.SUB.PERF.PAS)
    toFormTable(conjugations?.subjunctive?.active?.pluperfect, structure.SUB.PLUP.ACT)
    toFormTable(conjugations?.subjunctive?.passive?.pluperfect, structure.SUB.PLUP.PAS)

    structure.IMP["-"].ACT[0].center = conjugations?.imperative?.active?.present?.singular?.second?.join(",\n")
    structure.IMP["-"].ACT[2].center = conjugations?.imperative?.active?.future?.singular?.second?.join(",\n")
    structure.IMP["-"].ACT[4].center = conjugations?.imperative?.active?.future?.singular?.third?.join(",\n")
    structure.IMP["-"].ACT[1].center = conjugations?.imperative?.active?.present?.plural?.second?.join(",\n")
    structure.IMP["-"].ACT[3].center = conjugations?.imperative?.active?.future?.plural?.second?.join(",\n")
    structure.IMP["-"].ACT[5].center = conjugations?.imperative?.active?.future?.plural?.third?.join(",\n")
    structure.IMP["-"].PAS[0].center = conjugations?.imperative?.passive?.present?.singular?.second?.join(",\n")
    structure.IMP["-"].PAS[2].center = conjugations?.imperative?.passive?.future?.singular?.second?.join(",\n")
    structure.IMP["-"].PAS[4].center = conjugations?.imperative?.passive?.future?.singular?.third?.join(",\n")
    structure.IMP["-"].PAS[1].center = conjugations?.imperative?.passive?.present?.plural?.second?.join(",\n")
    // structure.IMP["-"].PAS[3].center = conjugations?.imperative?.passive?.future?.plural?.second?.join(",\n")
    structure.IMP["-"].PAS[5].center = conjugations?.imperative?.passive?.future?.plural?.third?.join(",\n")

    structure.INF["-"]["-"][0].center = conjugations?.["non-finite"]?.infinitive?.active?.present?.join(",\n")
    structure.INF["-"]["-"][2].center = conjugations?.["non-finite"]?.infinitive?.passive?.present?.join(",\n")
    structure.INF["-"]["-"][4].center = conjugations?.["non-finite"]?.infinitive?.active?.perfect?.join(",\n")
    structure.INF["-"]["-"][1].center = conjugations?.["non-finite"]?.infinitive?.passive?.perfect?.join(",\n")
    structure.INF["-"]["-"][3].center = conjugations?.["non-finite"]?.infinitive?.active?.future?.join(",\n")
    structure.INF["-"]["-"][5].center = conjugations?.["non-finite"]?.infinitive?.passive?.future?.join(",\n")

    structure.NONF.PARTICIPLE["-"][0].center = conjugations?.["non-finite"]?.participle?.active?.present?.join(",\n")
    structure.NONF.PARTICIPLE["-"][1].center = conjugations?.["non-finite"]?.participle?.passive?.perfect?.join(",\n")
    structure.NONF.PARTICIPLE["-"][2].center = conjugations?.["non-finite"]?.participle?.active?.future?.join(",\n")
    structure.NONF.PARTICIPLE["-"][3].center = conjugations?.["non-finite"]?.participle?.passive?.future?.join(",\n")
    structure.NONF["GERUND/SUPINE"]["-"][0].center = conjugations?.["verbal-noun"]?.gerund?.genitive?.join(",\n")
    structure.NONF["GERUND/SUPINE"]["-"][1].center = conjugations?.["verbal-noun"]?.gerund?.dative?.join(",\n")
    structure.NONF["GERUND/SUPINE"]["-"][2].center = conjugations?.["verbal-noun"]?.gerund?.accusative?.join(",\n")
    structure.NONF["GERUND/SUPINE"]["-"][3].center = conjugations?.["verbal-noun"]?.gerund?.ablative?.join(",\n")
    structure.NONF["GERUND/SUPINE"]["-"][4].center = conjugations?.["verbal-noun"]?.supine?.accusative?.join(",\n")
    structure.NONF["GERUND/SUPINE"]["-"][5].center = conjugations?.["verbal-noun"]?.supine?.ablative?.join(",\n")

    return structure;
}

const structureTemplate = {
    "IND": {
        "PRES": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
        "IMP": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
        "FUT": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
        "PERF": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
        "PLUP": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
        "FUTP": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
    },
    "SUB": {
        "PRES": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
        "IMP": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
        "PERF": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
        "PLUP": {
            "ACT": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
            "PAS": [
                {
                    topLeft: "1",
                    topRight: "SG",
                },
                {
                    topRight: "PL",
                },
                {
                    topLeft: "2",
                },
                {
                },
                {
                    topLeft: "3",
                },
                {
                },
            ],
        },
    },
    "IMP": {
        "-": {
            "ACT": [
                {
                    topLeft: "2ND",
                    topRight: "SG",
                    bottomLeft: "PRES",
                },
                {
                    topRight: "PL",
                    topLeft: "2ND",
                    bottomLeft: "PRES",
                },
                {
                    topLeft: "2ND",
                    bottomLeft: "FUT",
                },
                {
                    topLeft: "2ND",
                    bottomLeft: "FUT",
                },
                {
                    topLeft: "3RD",
                    bottomLeft: "FUT",
                },
                {
                    topLeft: "3RD",
                    bottomLeft: "FUT",
                },
            ],
            "PAS": [
                {
                    topLeft: "2ND",
                    topRight: "SG",
                    bottomLeft: "PRES",
                },
                {
                    topRight: "PL",
                    topLeft: "2ND",
                    bottomLeft: "PRES",
                },
                {
                    topLeft: "2ND",
                    bottomLeft: "FUT",
                },
                {
                    topLeft: "2ND",
                    bottomLeft: "FUT",
                },
                {
                    topLeft: "3RD",
                    bottomLeft: "FUT",
                },
                {
                    topLeft: "3RD",
                    bottomLeft: "FUT",
                },
            ],
        },
    },
    "INF": {
        "-": {
            "-": [
                {
                    topLeft: "PRES",
                    topRight: "ACT",
                },
                {
                    topRight: "PAS",
                },
                {
                    topLeft: "PERF",
                },
                {
                },
                {
                    topLeft: "FUT",
                },
                {
                },
            ],
        }
    },
    "NONF": {
        "PARTICIPLE": {
            "-": [
                {
                    topLeft: "ACT",
                    topRight: "PRES",
                },
                {
                    topLeft: "PAS",
                    topRight: "PERF",
                },
                {
                    topLeft: "ACT",
                    topRight: "FUT",
                },
                {
                    topLeft: "PAS",
                    topRight: "FUT",
                },
                {
                },
                {
                },
            ],
        },
        "GERUND/SUPINE": {
            "-": [
                {
                    topLeft: "GER",
                    topRight: "GEN",
                },
                {
                    topLeft: "GER",
                    topRight: "DAT",
                },
                {
                    topLeft: "GER",
                    topRight: "ACC",
                },
                {
                    topLeft: "GER",
                    topRight: "ABL",
                },
                {
                    topLeft: "SUP",
                    topRight: "ACC",
                },
                {
                    topLeft: "SUP",
                    topRight: "ABL",
                },
            ],
        },
    },
}

const width = 382;
const useStyles = makeStyles(theme => ({
    paper: {
        width: `${width}px`,
        borderRadius: 0,
    }
}));