import textElementListener from './components/textElementListener'
import addSectionEditButtons from './components/addSectionEditButtons'
import sectionTools from './components/sectionTools'
const app = () => {
    console.log('🚀 stating app...')
    return {
        section: {
            ...sectionTools,
        },
        ...textElementListener(),
        ...addSectionEditButtons(),
    }
}

export default app
