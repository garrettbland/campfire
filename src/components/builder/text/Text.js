import React, { useEffect, useState, useRef } from 'react'
import { returnFound } from 'find-and'
import { useDispatch, useSelector } from 'react-redux'
import { SET_EDITING } from '../../../redux/constants'
import AddContentButton from '../AddContentButton'

const Text = ({ block }) => {
    const [showTool, setShowTool] = useState(false)
    const textRef = useRef()
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

    useEffect(() => {
        const text = textRef.current

        text.addEventListener('mouseenter', (event) => {
            setShowTool(true)
        })
        text.addEventListener('mouseleave', (event) => {
            setShowTool(false)
        })
        return () => {
            text.removeEventListener('mouseenter', () => {})
            text.removeEventListener('mouseleave', () => {})
        }
    })

    return (
        <div data-type="text" ref={textRef} className={[...block.classList, 'relative'].join(' ')}>
            <div
                onClick={() =>
                    dispatch({
                        type: SET_EDITING,
                        payload: returnFound(blocks, { id: block.id }),
                    })
                }
                className={`absolute top-0 left-0 text-black bg-white p-1 h-full bg-opacity-25 text-lg w-full ${
                    showTool ? 'block' : 'hidden'
                }`}
            >
                <div className="flex items-center justify-center h-full w-full">
                    Edit | <AddContentButton block={block} />
                </div>
            </div>
            <p dangerouslySetInnerHTML={{ __html: block.data }}></p>
        </div>
    )
}

export default Text
