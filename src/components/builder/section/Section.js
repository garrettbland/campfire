import React, { useEffect, useState, useRef } from 'react'
import { Draggable } from 'react-smooth-dnd'
import { returnFound } from 'find-and'
import { useSelector, useDispatch } from 'react-redux'
import { SET_EDITING, ADD_SECTION } from '../../../redux/constants'

const Section = ({ block, children }) => {
    const [showTool, setShowTool] = useState(false)
    const sectionRef = useRef()
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

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
    }, [])

    const AddSection = () => {
        dispatch({
            type: ADD_SECTION,
            payload: {
                id: block.id,
            },
        })
    }

    return (
        <Draggable>
            <div
                data-type="section"
                ref={sectionRef}
                className={[...block.classList, 'relative'].join(' ')}
                style={block.styles ? block.styles : null}
            >
                <div
                    className={`absolute top-0 left-0 flex flex-row z-20 ${
                        showTool ? 'block' : 'hidden'
                    }`}
                >
                    <button
                        onClick={() =>
                            dispatch({
                                type: SET_EDITING,
                                payload: returnFound(blocks, { id: block.id }),
                            })
                        }
                        className={`bg-red-500`}
                    >
                        Section Tools
                    </button>
                    <div className="bg-gray-600 text-white cursor-pointer" id="section-drag-handle">
                        Drag
                    </div>
                </div>
                {children}
                <div
                    className={`absolute bottom-0 left-0 w-full h-0 flex items-center justify-center ${
                        showTool ? 'block' : 'hidden'
                    }`}
                >
                    <button
                        onClick={() => AddSection()}
                        className="w-10 h-10 bg-red-500 opacity-50 hover:opacity-100 rounded-full"
                    >
                        +
                    </button>
                </div>
            </div>
        </Draggable>
    )
}

export default Section
