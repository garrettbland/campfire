import React from 'react'
import BorderRadius from '../shared/BorderRadius'
import BoxShadow from '../shared/BoxShadow'
import BackgroundColor from '../shared/BackgroundColor'
import RemoveBlockButton from '../RemoveBlockButton'
import MaxWidth from './MaxWidth'
import BackgroundOpacity from './BackgroundOpacity'

const RowEdit = () => {
    return (
        <div>
            <BackgroundColor />
            <BackgroundOpacity />
            <MaxWidth />
            <BorderRadius />
            <BoxShadow />
            <RemoveBlockButton />
        </div>
    )
}

export default RowEdit
