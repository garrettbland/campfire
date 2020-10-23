import React, { useEffect, useState, useRef } from 'react'
import { returnFound } from 'find-and'
import { useSelector } from 'react-redux'

const Section = ({ block, children }) => {
    const [showTool, setShowTool] = useState(false)
    const sectionRef = useRef()
    const blocks = useSelector((state) => state.blocks)

    useEffect(() => {
        const section = sectionRef.current

        section.addEventListener('mouseenter', (event) => {
            setShowTool(true)
        })
        section.addEventListener('mouseleave', (event) => {
            setShowTool(false)
        })
        return () => {
            section.removeEventListener('mouseenter', () => {})
            section.removeEventListener('mouseleave', () => {})
        }
    })

    return (
        <div data-type="section" ref={sectionRef} className={block.classList.join(' ')}>
            <button
                onClick={() => console.log(returnFound(blocks, { id: block.id }))}
                className={`absolute top-0 left-0 bg-red-500 ${showTool ? 'block' : 'hidden'}`}
            >
                Section Tools
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

export default Section
