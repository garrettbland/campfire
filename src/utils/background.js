export const backgroundOpacities = () => {
    return ['bg-opacity-0', 'bg-opacity-25', 'bg-opacity-50', 'bg-opacity-75', 'bg-opacity-100']
}

export const backgroundAttachments = () => {
    return ['bg-fixed', 'bg-local']
}

export const removeBackgroundOpacities = (classList) => {
    return classList.filter((className) => !backgroundOpacities().includes(className))
}

export const removeBackgroundAttachments = (classList) => {
    return classList.filter((className) => !backgroundAttachments().includes(className))
}
