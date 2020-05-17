import { removeAllElementsById } from './elementTools'

const addSectionEditButtons = () => {
    /**
     * Get all sections
     */
    let sections = document.getElementsByTagName('SECTION')

    /**
     * Remove current edit buttons
     * Used for when adding new sections so no duplicates
     */
    removeAllElementsById('dragHandle')

    /**
     * Loop through each section and add edit button with alpine event
     */
    for (let id = 0; id < sections.length; id++) {
        let editButton = document.createElement('button')
        editButton.setAttribute(
            'x-on:click',
            'app.section.editBackground(event)'
        )
        editButton.setAttribute(
            'class',
            'bg-green-500 absolute top-0 right-0'
        )
        editButton.setAttribute('id', 'dragHandle')
        editButton.innerText = 'Edit Background'
        sections[id].classList.add('relative')
        sections[id].appendChild(editButton)
    }
}

export default addSectionEditButtons
