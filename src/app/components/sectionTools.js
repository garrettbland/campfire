const editBackground = (event) => {
    //window.alert("edit the background" + event.target.localName)
    //event.target.parentElement.style.backgroundColor = 'red'

    let backgroundimage = window.prompt('new background image url')
    event.target.parentElement.classList.add('bg-cover')
    event.target.parentElement.classList.add('bg-center')
    event.target.parentElement.style.backgroundImage =
        'url(' + backgroundimage + ')'
}

export default {
    editBackground,
}
