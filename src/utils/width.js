export const maxWidths = () => {
    return [
        'max-w-xs',
        'max-w-sm',
        'max-w-md',
        'max-w-lg',
        'max-w-xl',
        'max-w-2xl',
        'max-w-3xl',
        'max-w-4xl',
        'max-w-5xl',
        'max-w-6xl',
        'container',
        'max-w-full',
    ]
}

export const removeMaxWidthClasses = (classList) => {
    return classList.filter((className) => !maxWidths().includes(className))
}
