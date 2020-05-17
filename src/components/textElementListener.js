const textElementListener = () => {
    let mainElement = document.getElementById('campfire_main')
    const textEditableElements = ['h1', 'p']

    mainElement.addEventListener('mouseover', (event) => {
        let localName = event.target.localName
        if (textEditableElements.includes(localName)) {
            /**
             * Add contenteditable attribute
             */
            event.target.setAttribute('contenteditable', true)
        }
    })
}

export default textElementListener
