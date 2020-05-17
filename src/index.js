import dataObject from './data'
import textElementListener from './components/textElementListener'

/**
 * Base alpine function for x-data
 */
const campfire = () => {
    return {
        ...dataObject,
        init: function () {
            console.log('🔥 campfire has initialized...')
            /**
             * Start listening for hover and mouseover events
             */
            textElementListener()
        },
    }
}

/**
 * Attach campfire function to global window object to use alpine
 */
window.campfire = campfire
