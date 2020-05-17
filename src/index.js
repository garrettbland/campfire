import showAlert from './showAlert'

const campfire = () => {
    return {
        name: 'garrett',
        showAlert: showAlert,
        init: function () {
            console.log(this.name)
        },
    }
}

window.campfire = campfire
