export const borderRadiuses = () => {
    return [
        'rounded-none',
        'rounded-sm',
        'rounded',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-2xl',
        'rounded-3xl',
        'rounded-full',
    ]
}

export const removeBorderRadiuses = (classList) => {
    return classList.filter((className) => !borderRadiuses().includes(className))
}
