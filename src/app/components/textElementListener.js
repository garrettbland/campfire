import store from '../redux/store'
import { SET_CURRENT_ELEMENT } from '../redux/constants'

const textElementListener = () => {
    let mainElement = document.getElementById('campfire_main')
    const textEditableElements = ['h1', 'p']

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
        if (textEditableElements.includes(localName)) {
            /**
             * Add contenteditable attribute
             */
            store.dispatch({
                type: SET_CURRENT_ELEMENT,
                payload: {
                    currentElement: localName,
                },
            })
            event.target.setAttribute('contenteditable', true)
        }
    })
}

export default textElementListener
