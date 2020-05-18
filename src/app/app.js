import textElementListener from './components/textElementListener'
import keydownListener from './components/keydownListener'
import addSectionEditButtons from './components/addSectionEditButtons'
import sectionTools from './components/sectionTools'
import stripFormattingOnPaste from './components/stripFormattingOnPaste'
/**
 * Map out tools and utilities, and initialize
 * Accessed from view layer with app.{}.{}
 * For example, x-on:click='app.section.editBackground'
 */
const app = () => {
    console.log('🚀 stating app...')
    return {
        section: sectionTools,
        ...stripFormattingOnPaste(),
        ...textElementListener(),
        ...keydownListener(),
        ...addSectionEditButtons(),
    }
}

export default app
