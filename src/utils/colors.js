export const backgroundColors = () => {
    return [
        'bg-red-500',
        'bg-orange-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-black',
        'bg-white',
    ]
}

export const removeBackgroundClasses = (classList) => {
    const prefix = 'bg-'
    return classList.filter((item) => {
        if (item.startsWith(prefix)) {
            // dont add class to new array
        } else {
            return item
        }
    })
}
