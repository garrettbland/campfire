import showAlert from './showAlert'

const campfire = () => {
    return {
        name: 'garrett',
        showAlert: showAlert,
    }
}

window.campfire = campfire
