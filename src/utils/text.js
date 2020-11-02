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

export const textAlignments = () => {
    return ['text-left', 'text-center', 'text-right', 'text-justify']
}

export const lineHeights = () => {
    return [
        'leading-none',
        'leading-tight',
        'leading-snug',
        'leading-normal',
        'leading-relaxed',
        'leading-loose',
    ]
}

export const fontWeights = () => {
    return [
        'font-hairline',
        'font-thin',
        'font-light',
        'font-normal',
        'font-medium',
        'font-semibold',
        'font-bold',
        'font-extrabold',
        'font-black',
    ]
}

export const removeFontSizes = (classList) => {
    return classList.filter((className) => !fontSizes().includes(className))
}

export const removeTextAlignments = (classList) => {
    return classList.filter((className) => !textAlignments().includes(className))
}

export const removeLineHeights = (classList) => {
    return classList.filter((className) => !lineHeights().includes(className))
}

export const removeFontWeights = (classList) => {
    return classList.filter((className) => !fontWeights().includes(className))
}
