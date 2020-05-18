const stripFormattingOnPaste = () => {
    let mainElement = document.getElementById('campfire_main')
    mainElement.addEventListener('paste', (event) => {
        /**
         * cancels paste
         */
        event.preventDefault()

        /**
         * get text from clipboard
         */
        var text = (
            event.originalEvent || event
        ).clipboardData.getData('text/plain')

        /**
         * insert text manaully
         */
        document.execCommand('insertHTML', false, text)
    })
}

export default stripFormattingOnPaste
