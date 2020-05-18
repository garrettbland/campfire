const elementHoverListener = () => {
    let mainElement = document.getElementById('campfire_main')
    const editableElements = ['h1', 'h2', 'p', 'li']

    /**
     * Set default paragraph separator
     */
    document.execCommand('defaultParagraphSeparator', false, 'p')

    /**
     * Set event listener for mousover
     * If its a text editable element, add content editable
     */
    mainElement.addEventListener('mouseover', (event) => {
        let localName = event.target.localName
        if (editableElements.includes(localName)) {
            if (localName === 'li') {
                /**
                 * Add content editable to parent to let brownser handle
                 * normal new list items
                 */
                event.target.parentElement.setAttribute(
                    'contenteditable',
                    true
                )
            } else {
                event.target.setAttribute('contenteditable', true)
            }
        }
    })
}

export default elementHoverListener
