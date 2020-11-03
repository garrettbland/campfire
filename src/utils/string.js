const formatStringToCamelCase = (str) => {
    const splitted = str.split('-')
    if (splitted.length === 1) return splitted[0]
    return (
        splitted[0] +
        splitted
            .slice(1)
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join('')
    )
}

export const getStyleObjectFromString = (str) => {
    console.log(str)
    const style = {}
    str.split(';').forEach((el) => {
        console.log(el)
        const [property, value] = el.split(':')
        if (!property) return

        const formattedProperty = formatStringToCamelCase(property.trim())
        style[formattedProperty] = value.trim()
    })

    console.log(style)
    return style
}
