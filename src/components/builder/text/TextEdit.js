import React from 'react'
import TextContent from './TextContent'
import TextColor from './TextColor'
import TextAlignment from './TextAlignment'
import FontSize from './FontSize'
import LineHeight from './LineHeight'
import RemoveBlockButton from '../RemoveBlockButton'

const TextEdit = () => {
    return (
        <div>
            <TextContent />
            <TextColor />
            <TextAlignment />
            <FontSize />
            <LineHeight />
            <RemoveBlockButton title="Remove Text" />
        </div>
    )
}

export default TextEdit
