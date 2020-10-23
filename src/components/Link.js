import React, { useEffect, useState, useRef } from 'react'
import { returnFound } from 'find-and'
import { useDispatch, useSelector } from 'react-redux'
import { SET_EDITING } from '../redux/constants'

const Link = ({ block }) => {
    const [showTool, setShowTool] = useState(false)
    const linkRef = useRef()
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

    useEffect(() => {
        const link = linkRef.current

        link.addEventListener('mouseenter', (event) => {
            setShowTool(true)
        })
        link.addEventListener('mouseleave', (event) => {
            setShowTool(false)
        })
        // return () => {
        //   image.removeEventListener("mouseenter", () => {});
        //   image.removeEventListener("mouseleave", () => {});
        // };
    })

    return (
        <div ref={linkRef} className="relative z-10">
            <button
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
                Edit | Add
            </button>
            <a className={block.classList.join(' ')} href={block.data.href}>
                {block.data.title}
            </a>
        </div>
    )
}

export default Link
