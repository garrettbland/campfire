export const generatePadding = (side) => {
    if (!side) {
        throw new Error('Side ("t" or "b") must be defined')
    }
    return [
        `p${side}-0`,
        `p${side}-1`,
        `p${side}-2`,
        `p${side}-3`,
        `p${side}-4`,
        `p${side}-5`,
        `p${side}-6`,
        `p${side}-8`,
        `p${side}-10`,
        `p${side}-12`,
        `p${side}-16`,
        `p${side}-20`,
        `p${side}-24`,
        `p${side}-32`,
        `p${side}-40`,
        `p${side}-48`,
        `p${side}-56`,
        `p${side}-64`,
    ]
}

export const removeTopPadding = (classList) => {
    return classList.filter((className) => !generatePadding('t').includes(className))
}

export const removeBottomPadding = (classList) => {
    return classList.filter((className) => !generatePadding('b').includes(className))
}
