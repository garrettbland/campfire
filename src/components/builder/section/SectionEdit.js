import React from 'react'
import RemoveBlockButton from '../RemoveBlockButton'
import BackgroundColor from '../shared/BackgroundColor'
import BackgroundStyle from './BackgroundStyle'
import Divider from './Divider'

const SectionEdit = () => {
    return (
        <div>
            <BackgroundColor />
            <Divider />
            <BackgroundStyle />
            <RemoveBlockButton />
        </div>
    )
}

export default SectionEdit
