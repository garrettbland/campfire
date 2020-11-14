import React from 'react'
import RemoveBlockButton from '../RemoveBlockButton'
import BackgroundColor from '../shared/BackgroundColor'
import BackgroundStyle from './BackgroundStyle'
import SectionDivider from './SectionDivider'

const SectionEdit = () => {
    return (
        <div>
            <BackgroundColor />
            <SectionDivider />
            <BackgroundStyle />
            <RemoveBlockButton />
        </div>
    )
}

export default SectionEdit
