import React from 'react'
import { useSelector } from 'react-redux'
import RemoveBlockButton from '../RemoveBlockButton'
import ImageUrl from './ImageUrl'
import ImageAlt from './ImageAlt'
import BorderRadius from '../shared/BorderRadius'
import BoxShadow from '../shared/BoxShadow'

const ImageEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    return (
        <div>
            <img className="w-64 h-auto" src={currentlyEditing.data.src} />
            <ImageUrl />
            <ImageAlt />
            <BorderRadius />
            <BoxShadow />
            <RemoveBlockButton />
        </div>
    )
}

export default ImageEdit
