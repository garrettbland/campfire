export const autoMargins = () => {
    return ['mx-auto', 'ml-auto', 'mr-auto']
}

export const removeAutoMargins = (classList) => {
    return classList.filter((className) => !autoMargins().includes(className))
}
