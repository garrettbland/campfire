import React, { useEffect, useState, useRef } from 'react'
import { returnFound } from 'find-and'
import { useSelector } from 'react-redux'

const Row = ({ block, children }) => {
    const [showTool, setShowTool] = useState(false)
    const rowRef = useRef()
    const blocks = useSelector((state) => state.blocks)

    useEffect(() => {
        const row = rowRef.current

        row.addEventListener('mouseenter', (event) => {
            setShowTool(true)
        })
        row.addEventListener('mouseleave', (event) => {
            setShowTool(false)
        })
        return () => {
            row.removeEventListener('mouseenter', () => {})
            row.removeEventListener('mouseleave', () => {})
        }
    })

    return (
        <div data-type="row" ref={rowRef} className={[...block.classList, 'relative'].join(' ')}>
            <button
                onClick={() => console.log(returnFound(blocks, { id: block.id }))}
                className={`absolute top-0 left-0 h-6 bg-red-500 ${showTool ? 'block' : 'hidden'}`}
            >
                Row Tools
            </button>
            {children}
            <div
                className={`absolute bottom-0 left-0 w-full h-0 bg-orange-500 flex items-center justify-center ${
                    showTool ? 'block' : 'hidden'
                }`}
            >
                <button className="w-10 h-10 bg-red-500 opacity-50 hover:opacity-100 rounded-full">
                    +
                </button>
            </div>
        </div>
    )
}

export default Row
