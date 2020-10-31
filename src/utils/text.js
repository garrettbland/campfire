export const fontSizes = () => {
    return [
        'text-xs',
        'text-sm',
        'text-base',
        'text-lg',
        'text-xl',
        'text-2xl',
        'text-3xl',
        'text-4xl',
        'text-5xl',
        'text-6xl',
    ]
}

export const removeFontSizes = (classList) => {
    return classList.filter((className) => !fontSizes().includes(className))
}
