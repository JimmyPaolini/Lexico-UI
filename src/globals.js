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

export function sentenceCase(str) {
    return str.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase() + " ");
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

    const thousands = Math.floor(decimal / 1000);
    if (thousands >= 4) throw new Error("Decimal number too large (>3999) for roman numerals");
    roman += new Array(thousands).fill("M").join("");

    const hundreds = Math.floor(decimal / 100);
    convertDigit(hundreds, "C", "D", "M");

    const tens = Math.floor(decimal / 10);
    convertDigit(tens, "X", "L", "C");

    const ones = decimal % 10;
    convertDigit(ones, "I", "V", "X");

    return roman;

    function convertDigit(digit, low, mid, top) {
        if (digit < 4) roman += new Array(digit).fill(low).join("");
        else if (digit === 4) roman += low + mid;
        else if (digit < 9) roman += mid + new Array(digit - 5).fill(low).join("");
        else if (digit === 9) roman += low + top;
    }
}

export function romanNumeralize(str) {
    return str.replace(/\d+/g, d => decimalToRoman(d));
}