import store from '../redux/store'
import { SET_CURRENT_ELEMENT } from '../redux/constants'

const textElementListener = () => {
    let mainElement = document.getElementById('campfire_main')
    const textEditableElements = ['h1', 'p']

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
