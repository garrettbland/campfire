import React from 'react'
import BorderRadius from '../shared/BorderRadius'
import BoxShadow from '../shared/BoxShadow'
import BackgroundColor from '../shared/BackgroundColor'
import RemoveBlockButton from '../RemoveBlockButton'
import MaxWidth from './MaxWidth'
import BackgroundOpacity from './BackgroundOpacity'
import MarginTop from '../shared/MarginTop'
import MarginBottom from '../shared/MarginBottom'

const RowEdit = () => {
    return (
        <div>
            <BackgroundColor />
            <BackgroundOpacity />
            <MaxWidth />
            <BorderRadius />
            <BoxShadow />
            <MarginTop />
            <MarginBottom />
            <RemoveBlockButton />
        </div>
    )
}

export default RowEdit
