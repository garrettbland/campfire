export const generateMargins = (side) => {
    if (!side) {
        throw new Error('Side ("t" or "b") must be defined')
    }
    return [
        `m${side}-0`,
        `m${side}-1`,
        `m${side}-2`,
        `m${side}-3`,
        `m${side}-4`,
        `m${side}-5`,
        `m${side}-6`,
        `m${side}-8`,
        `m${side}-10`,
        `m${side}-12`,
        `m${side}-16`,
        `m${side}-20`,
        `m${side}-24`,
        `m${side}-32`,
        `m${side}-40`,
        `m${side}-48`,
        `m${side}-56`,
        `m${side}-64`,
    ]
}

export const autoMargins = () => {
    return ['mx-auto', 'ml-auto', 'mr-auto']
}

export const removeAutoMargins = (classList) => {
    return classList.filter((className) => !autoMargins().includes(className))
}

export const removeTopMargins = (classList) => {
    return classList.filter((className) => !generateMargins('t').includes(className))
}

export const removeBottomMargins = (classList) => {
    return classList.filter((className) => !generateMargins('b').includes(className))
}
