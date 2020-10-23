export const extractClass = (classList, startValue) => {
    /**
     * Will return first class that matches startValue
     */
    const foundClassName = classList.find((item) => item.startsWith(startValue))
    return foundClassName
}
