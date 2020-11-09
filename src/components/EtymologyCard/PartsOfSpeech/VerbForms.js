import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import FormTabs from "../FormsTable/FormTabs";
import FormsTable from "../FormsTable/FormsTable";

export default function VerbForms({forms}) {
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
                        <FormsTable forms={formsStructure} />
                    </FormTabs>
                </FormTabs>
            </FormTabs>
        </Paper>
    )
}

const verbFormsRestructure = conjugations => {
    const structure = {...structureTemplate};
    function toFormsTable(conj, struc) {
        struc[0].center = conj?.singular?.first?.join?.(",\n");
        struc[1].center = conj?.singular?.second?.join?.(",\n");
        struc[2].center = conj?.singular?.third?.join?.(",\n");
        struc[3].center = conj?.plural?.first?.join?.(",\n");
        struc[4].center = conj?.plural?.second?.join?.(",\n");
        struc[5].center = conj?.plural?.third?.join?.(",\n");
    }

    toFormsTable(conjugations?.indicative?.active?.present, structure.IND.PRES.ACT)
    toFormsTable(conjugations?.indicative?.passive?.present, structure.IND.PRES.PAS)
    toFormsTable(conjugations?.indicative?.active?.imperfect, structure.IND.IMP.ACT)
    toFormsTable(conjugations?.indicative?.passive?.imperfect, structure.IND.IMP.PAS)
    toFormsTable(conjugations?.indicative?.active?.future, structure.IND.FUT.ACT)
    toFormsTable(conjugations?.indicative?.passive?.future, structure.IND.FUT.PAS)
    toFormsTable(conjugations?.indicative?.active?.perfect, structure.IND.PERF.ACT)
    toFormsTable(conjugations?.indicative?.passive?.perfect, structure.IND.PERF.PAS)
    toFormsTable(conjugations?.indicative?.active?.pluperfect, structure.IND.PLUP.ACT)
    toFormsTable(conjugations?.indicative?.passive?.pluperfect, structure.IND.PLUP.PAS)
    toFormsTable(conjugations?.indicative?.active?.["future perfect"], structure.IND.FUTP.ACT)
    toFormsTable(conjugations?.indicative?.passive?.["future perfect"], structure.IND.FUTP.PAS)

    toFormsTable(conjugations?.subjunctive?.active?.present, structure.SUB.PRES.ACT)
    toFormsTable(conjugations?.subjunctive?.passive?.present, structure.SUB.PRES.PAS)
    toFormsTable(conjugations?.subjunctive?.active?.imperfect, structure.SUB.IMP.ACT)
    toFormsTable(conjugations?.subjunctive?.passive?.imperfect, structure.SUB.IMP.PAS)
    toFormsTable(conjugations?.subjunctive?.active?.perfect, structure.SUB.PERF.ACT)
    toFormsTable(conjugations?.subjunctive?.passive?.perfect, structure.SUB.PERF.PAS)
    toFormsTable(conjugations?.subjunctive?.active?.pluperfect, structure.SUB.PLUP.ACT)
    toFormsTable(conjugations?.subjunctive?.passive?.pluperfect, structure.SUB.PLUP.PAS)

    structure.IMP["IMPERATIVE"].ACT[0].center = conjugations?.imperative?.active?.present?.singular?.second?.join?.(",\n");
    structure.IMP["IMPERATIVE"].ACT[2].center = conjugations?.imperative?.active?.future?.singular?.second?.join?.(",\n");
    structure.IMP["IMPERATIVE"].ACT[4].center = conjugations?.imperative?.active?.future?.singular?.third?.join?.(",\n");
    structure.IMP["IMPERATIVE"].ACT[1].center = conjugations?.imperative?.active?.present?.plural?.second?.join?.(",\n");
    structure.IMP["IMPERATIVE"].ACT[3].center = conjugations?.imperative?.active?.future?.plural?.second?.join?.(",\n");
    structure.IMP["IMPERATIVE"].ACT[5].center = conjugations?.imperative?.active?.future?.plural?.third?.join?.(",\n");
    structure.IMP["IMPERATIVE"].PAS[0].center = conjugations?.imperative?.passive?.present?.singular?.second?.join?.(",\n");
    structure.IMP["IMPERATIVE"].PAS[2].center = conjugations?.imperative?.passive?.future?.singular?.second?.join?.(",\n");
    structure.IMP["IMPERATIVE"].PAS[4].center = conjugations?.imperative?.passive?.future?.singular?.third?.join?.(",\n");
    structure.IMP["IMPERATIVE"].PAS[1].center = conjugations?.imperative?.passive?.present?.plural?.second?.join?.(",\n");
    // structure.IMP["-"].PAS[3].center = conjugations?.imperative?.passive?.future?.plural?.second?.join?.(",\n");
    structure.IMP["IMPERATIVE"].PAS[5].center = conjugations?.imperative?.passive?.future?.plural?.third?.join?.(",\n");

    structure.INF["INFINITIVE"]["-"][0].center = conjugations?.["non-finite"]?.infinitive?.active?.present?.join?.(",\n");
    structure.INF["INFINITIVE"]["-"][2].center = conjugations?.["non-finite"]?.infinitive?.passive?.present?.join?.(",\n");
    structure.INF["INFINITIVE"]["-"][4].center = conjugations?.["non-finite"]?.infinitive?.active?.perfect?.join?.(",\n");
    structure.INF["INFINITIVE"]["-"][1].center = conjugations?.["non-finite"]?.infinitive?.passive?.perfect?.join?.(",\n");
    structure.INF["INFINITIVE"]["-"][3].center = conjugations?.["non-finite"]?.infinitive?.active?.future?.join?.(",\n");
    structure.INF["INFINITIVE"]["-"][5].center = conjugations?.["non-finite"]?.infinitive?.passive?.future?.join?.(",\n");

    structure.NONF["NON FINITE"].PARTICIPLE[0].center = conjugations?.["non-finite"]?.participle?.active?.present?.join?.(",\n");
    structure.NONF["NON FINITE"].PARTICIPLE[1].center = conjugations?.["non-finite"]?.participle?.passive?.perfect?.join?.(",\n");
    structure.NONF["NON FINITE"].PARTICIPLE[2].center = conjugations?.["non-finite"]?.participle?.active?.future?.join?.(",\n");
    structure.NONF["NON FINITE"].PARTICIPLE[3].center = conjugations?.["non-finite"]?.participle?.passive?.future?.join?.(",\n");
    structure.NONF["NON FINITE"]["GERUND/SUPINE"][0].center = conjugations?.["verbal-noun"]?.gerund?.genitive?.join?.(",\n");
    structure.NONF["NON FINITE"]["GERUND/SUPINE"][1].center = conjugations?.["verbal-noun"]?.gerund?.dative?.join?.(",\n");
    structure.NONF["NON FINITE"]["GERUND/SUPINE"][2].center = conjugations?.["verbal-noun"]?.gerund?.accusative?.join?.(",\n");
    structure.NONF["NON FINITE"]["GERUND/SUPINE"][3].center = conjugations?.["verbal-noun"]?.gerund?.ablative?.join?.(",\n");
    structure.NONF["NON FINITE"]["GERUND/SUPINE"][4].center = conjugations?.["verbal-noun"]?.supine?.accusative?.join?.(",\n");
    structure.NONF["NON FINITE"]["GERUND/SUPINE"][5].center = conjugations?.["verbal-noun"]?.supine?.ablative?.join?.(",\n");

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
        "IMPERATIVE": {
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
        "INFINITIVE": {
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
        "NON FINITE": {
            "PARTICIPLE": [
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
            "GERUND/SUPINE": [
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