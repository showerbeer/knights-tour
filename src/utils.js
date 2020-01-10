export const arrayIncludes = (arr, val) => {
    return arr.indexOf(val) >= 0;
};

export const isLight = (num) => {
    return 0 === (((num >> 3) ^ num) & 1);
}

export const squareDist = (a, b) => {
    let x1 = a & 7,
        x2 = b & 7;
    let y1 = a >> 3,
        y2 = b >> 3;

    return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
}

export const getLegalMoves = (s) => {
    return [s - 17, s - 15, s - 10, s - 6, s + 6, s + 10, s + 15, s + 17].filter(x => x >= 0 && x < 64 && squareDist(s, x) <= 2);
}