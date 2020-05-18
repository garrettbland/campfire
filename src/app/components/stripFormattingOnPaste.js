const stripFormattingOnPaste = () => {
    document.addEventListener('paste', (event) => {
        /**
         * cancels paste
         */
        event.preventDefault()

        /**
         * get text from clipboard
         */
        let text = (
            event.originalEvent || event
        ).clipboardData.getData('text/plain')

        /**
         * insert text manaully
         */
        document.execCommand('insertText', false, text)
    })
}

export default stripFormattingOnPaste
