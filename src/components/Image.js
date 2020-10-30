import React, { useEffect, useState, useRef } from 'react'
import { returnFound } from 'find-and'
import { useDispatch, useSelector } from 'react-redux'
import { SET_EDITING } from '../redux/constants'
import AddContentButton from '../components/AddContentButton'

const Image = ({ block }) => {
    const [showTool, setShowTool] = useState(false)
    const imageRef = useRef()
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

    useEffect(() => {
        const image = imageRef.current

        image.addEventListener('mouseenter', (event) => {
            setShowTool(true)
        })
        image.addEventListener('mouseleave', (event) => {
            setShowTool(false)
        })
    })

    return (
        <div ref={imageRef} className="relative z-10">
            <div
                onClick={() =>
                    dispatch({
                        type: SET_EDITING,
                        payload: returnFound(blocks, { id: block.id }),
                    })
                }
                className={`w-full h-full bg-blue-400 bg-opacity-50 absolute top-0 left-0 z-20 ${
                    showTool ? 'block' : 'hidden'
                }`}
            >
                <div className="flex items-center justify-center h-full w-full">
                    Edit | <AddContentButton block={block} />
                </div>
            </div>
            <img
                src={block.data.src}
                alt={block.data.alt}
                data-type="image"
                className={[...block.classList, 'relative'].join(' ')}
            />
        </div>
    )
}

export default Image
