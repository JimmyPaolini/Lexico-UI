export const SEARCH_URL = "https://i9ic4m487l.execute-api.us-east-1.amazonaws.com/search?search=";
export const searchLexico = async (search, args) => {
    return await fetch(SEARCH_URL + search, args).then(r => r.json());
}

export function getId(etymology) {
    return etymology.principalParts.map(pp => pp.split(": ")[1].replace(" or ", "/")).join(", ");
}

export function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

export function pascalCase(str) {
    return str.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
}

export function romanToDecimal(roman)  {
    let decimal = 0;
    const value = c => ({
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }[c]);

    for (let i = 0; i < roman.length; i++) {
        let v1 = value(roman[i]);
        if (i + 1 < roman.length && v1 < value(roman[i + 1])) decimal -= v1;
        else decimal += v1;
    }
    return decimal;
}

export function decimalToRoman(decimal)  {
    let roman = "";
    const digits = decimal.toString().split().map(digit => parseInt(digit))
    const [ones, tens, hundreds, thousands] = [digits.pop(), digits.pop(), digits.pop(), digits.pop()];
    
    const value = [
        {
            low: "I",
            mid: "V",
            top: "X",
        },
        {
            low: "X",
            mid: "L",
            top: "C",
        },
        {
            low: "C",
            mid: "D",
            top: "M",
        },
        {
            low: "M",
        },
    ];

    const val = [
        
    ]
    
}