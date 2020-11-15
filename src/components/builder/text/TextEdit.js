import React from 'react'
import TextContent from './TextContent'
import TextColor from '../shared/TextColor'
import TextAlignment from './TextAlignment'
import FontWeight from '../shared/FontWeight'
import FontSize from '../shared/FontSize'
import LineHeight from './LineHeight'
import PaddingTop from '../shared/PaddingTop'
import PaddingBottom from '../shared/PaddingBottom'
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
            <PaddingTop />
            <PaddingBottom />
            <RemoveBlockButton title="Remove Text" />
        </div>
    )
}

export default TextEdit
