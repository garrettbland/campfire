import React from 'react'
import { useSelector } from 'react-redux'
import RemoveBlockButton from '../RemoveBlockButton'
import ImageUrl from './ImageUrl'
import ImageAlt from './ImageAlt'
import BorderRadius from '../shared/BorderRadius'
import BoxShadow from '../shared/BoxShadow'
import PaddingTop from '../shared/PaddingTop'
import PaddingBottom from '../shared/PaddingBottom'

const ImageEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    return (
        <div>
            <img className="w-64 h-auto" src={currentlyEditing.data.src} />
            <ImageUrl />
            <ImageAlt />
            <BorderRadius />
            <BoxShadow />
            <PaddingTop />
            <PaddingBottom />
            <RemoveBlockButton />
        </div>
    )
}

export default ImageEdit
