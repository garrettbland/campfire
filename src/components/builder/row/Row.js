import React, { useEffect, useState, useRef } from 'react'
import { returnFound } from 'find-and'
import { useDispatch, useSelector } from 'react-redux'
import { SET_EDITING, APPEND_ROW, DUPLICATE_BLOCK } from '../../../redux/constants'

const Row = ({ block, children }) => {
    const [showTool, setShowTool] = useState(false)
    const rowRef = useRef()
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

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

    const AddRow = () => {
        const columns = window.prompt('How many columns?')
        const availableColumns = [1, 2, 3, 4, 5, 6]
        if (availableColumns.includes(parseInt(columns))) {
            dispatch({
                type: APPEND_ROW,
                payload: {
                    id: block.id,
                    columns: parseInt(columns),
                },
            })
        } else {
            alert('Number not allowed')
        }
    }

    const DuplicateBlock = () => {
        dispatch({
            type: DUPLICATE_BLOCK,
            payload: block,
        })
    }

    return (
        <div data-type="row" ref={rowRef} className={[...block.classList, 'relative'].join(' ')}>
            <div className={`absolute top-0 left-0 flex flex-row ${showTool ? 'block' : 'hidden'}`}>
                <button
                    onClick={() =>
                        dispatch({
                            type: SET_EDITING,
                            payload: returnFound(blocks, { id: block.id }),
                        })
                    }
                    className={` bg-red-500 ${showTool ? 'block' : 'hidden'}`}
                >
                    Row Tools
                </button>
                <button
                    onClick={() => DuplicateBlock()}
                    className="bg-pink-500 text-white cursor-pointer"
                >
                    Duplicate
                </button>
            </div>
            {children}
            <div
                className={`absolute bottom-0 left-0 w-full h-0 bg-orange-500 flex items-center justify-center ${
                    showTool ? 'block' : 'hidden'
                }`}
            >
                <button
                    onClick={() => AddRow()}
                    className="w-10 h-10 bg-red-500 opacity-50 hover:opacity-100 rounded-full"
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default Row
