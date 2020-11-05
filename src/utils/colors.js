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
        `${prefix}-transparent`,
    ]
}

export const colors = () => {
    return [
        'red-500',
        'orange-500',
        'pink-500',
        'indigo-500',
        'green-500',
        'blue-500',
        'black',
        'white',
        'transparent',
    ]
}

export const removeBackgroundColors = (classList) => {
    return classList.filter((className) => !generateColors('bg').includes(className))
}

export const removeTextColors = (classList) => {
    return classList.filter((className) => !generateColors('text').includes(className))
}
