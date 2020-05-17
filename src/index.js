/**
 * Base alpine function for x-data
 */
const campfire = () => {
    return {
        name: 'garrett',
        showAlert: showAlert,
        init: function () {
            console.log(this.name)
        },
    }
}

/**
 * Attach campfire function to global window object to use alpine
 */
window.campfire = campfire
