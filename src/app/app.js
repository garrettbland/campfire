import textElementListener from './components/textElementListener'
import addSectionEditButtons from './components/addSectionEditButtons'
import sectionTools from './components/sectionTools'
const app = () => {
    console.log('🚀 stating app...')

    /**
     * Map out tools and utilities, and initialize
     * Accessed from view layer with app.{}.{}
     * For example, 'app.section.editBackground'
     */
    return {
        section: {
            ...sectionTools,
        },
        ...textElementListener(),
        ...addSectionEditButtons(),
    }
}

export default app
