import dataObject from './data'
import textElementListener from './components/textElementListener'
import store from './redux/store'

/**
 * Base alpine function for x-data
 */
const campfire = () => {
    return {
        store: store,
        state: store.getState(),
        init: function () {
            console.log('🔥 campfire has initialized...')

            /**
             * Subscribe to redux store and update this.state object when store changes
             */
            store.subscribe(() => {
                this.state = store.getState()
            })

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
