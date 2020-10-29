export const extractClass = (classList, searchValue) => {
    /**
     * Will return first class that matches searchValue
     * If searchValue is array, it will loop through and look
     * through those class names
     */

    if (Array.isArray(searchValue)) {
        const foundClasses = searchValue.map((searchItem) =>
            classList.find((item) => item.startsWith(searchItem))
        )
        return foundClasses.filter((foundClass) => foundClass !== undefined)[0]
    }

    return classList.find((item) => item.startsWith(searchValue))
}
