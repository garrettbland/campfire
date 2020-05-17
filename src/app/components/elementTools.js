export const removeAllElementsById = (id) => {
    let allElements = document.querySelectorAll(`#${id}`)
    for (let i = 0; i < allElements.length; i++) {
        allElements[i].remove()
    }
}
