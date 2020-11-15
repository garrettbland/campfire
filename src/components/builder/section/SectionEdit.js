import React from 'react'
import RemoveBlockButton from '../RemoveBlockButton'
import BackgroundColor from '../shared/BackgroundColor'
import BackgroundStyle from './BackgroundStyle'
import Divider from './Divider'
import PaddingTop from '../shared/PaddingTop'
import PaddingBottom from '../shared/PaddingBottom'

const SectionEdit = () => {
    return (
        <div>
            <BackgroundColor />
            <PaddingTop />
            <PaddingBottom />
            <Divider />
            <BackgroundStyle />
            <RemoveBlockButton />
        </div>
    )
}

export default SectionEdit
