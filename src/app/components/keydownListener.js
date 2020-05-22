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

        /**
         * Handle delete key
         */
        if (keyCode === 8) {
            /**
             * Handle delete in lists. Make sure user
             * cant delete last <li></li>
             */
            if (localName === 'ol' || localName === 'ul') {
                if (
                    event.target.children.length === 1 &&
                    event.target.children[0].innerText === `\n`
                ) {
                    /**
                     * Prevent delete
                     * Adding -> event.target.remove() will enable
                     * removing ol all together
                     */
                    event.preventDefault()
                }
            }
        }
    })
}

export default keydownListener
