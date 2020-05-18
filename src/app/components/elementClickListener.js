const elementClickListener = () => {
    let mainElement = document.getElementById('campfire_main')

    mainElement.addEventListener('click', (event) => {
        let localName = event.target.localName
        if (localName === 'img') {
            let newURL = window.prompt('New image url')
            event.target.src = newURL
        }
    })
}

export default elementClickListener
