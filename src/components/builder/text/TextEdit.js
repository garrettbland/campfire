import React from 'react'
import TextContent from './TextContent'
import TextColor from './TextColor'
import TextAlignment from './TextAlignment'
import FontWeight from './FontWeight'
import FontSize from '../shared/FontSize'
import LineHeight from './LineHeight'
import RemoveBlockButton from '../RemoveBlockButton'

const TextEdit = () => {
    return (
        <div>
            <TextContent />
            <TextColor />
            <TextAlignment />
            <FontWeight />
            <FontSize />
            <LineHeight />
            <RemoveBlockButton title="Remove Text" />
        </div>
    )
}

export default TextEdit
