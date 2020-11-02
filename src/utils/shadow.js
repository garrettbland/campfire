export const boxShadows = () => {
    return [
        'shadow-none',
        'shadow-xs',
        'shadow-sm',
        'shadow',
        'shadow-md',
        'shadow-lg',
        'shadow-xl',
        'shadow-2xl',
    ]
}

export const removeBoxShadows = (classList) => {
    return classList.filter((className) => !boxShadows().includes(className))
}
