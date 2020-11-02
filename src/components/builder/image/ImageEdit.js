import React from 'react'
import { useSelector } from 'react-redux'
import RemoveBlockButton from '../RemoveBlockButton'
import BorderRadius from './BorderRadius'
import ImageUrl from './ImageUrl'
import ImageAlt from './ImageAlt'

const ImageEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    return (
        <div>
            <img className="w-64 h-auto" src={currentlyEditing.data.src} />
            <ImageUrl />
            <ImageAlt />
            <BorderRadius />
            <RemoveBlockButton />
        </div>
    )
}

export default ImageEdit
