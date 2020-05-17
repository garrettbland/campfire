const keydownListener = () => {
    let mainElement = document.getElementById('campfire_main')
    let returnEnabledElements = ['p', 'ol']

    mainElement.addEventListener('keydown', (event) => {
        let localName = event.target.localName
        let keyCode = event.keyCode

        /**
         * Handle return key
         */
        if (keyCode === 13) {
            if (returnEnabledElements.includes(localName)) {
                console.log('return allowed...')
            } else {
                event.preventDefault()
            }
        }
    })
}

export default keydownListener
