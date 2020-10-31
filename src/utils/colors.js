export const generateColors = (prefix) => {
    if (!prefix) {
        throw new Error('Prefix (string) must be defined')
    }
    return [
        `${prefix}-red-500`,
        `${prefix}-orange-500`,
        `${prefix}-pink-500`,
        `${prefix}-indigo-500`,
        `${prefix}-green-500`,
        `${prefix}-blue-500`,
        `${prefix}-black`,
        `${prefix}-white`,
    ]
}

export const removeBackgroundClasses = (classList) => {
    return classList.filter((className) => !generateColors('bg').includes(className))
}

export const removeTextColorClasses = (classList) => {
    return classList.filter((className) => !generateColors('text').includes(className))
}
