import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EmptySection = ({ block }) => {
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

    const AddRow = () => {
        // not working yet
        console.log(block)
    }

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={() => AddRow()}
                className="w-24 h-10 bg-red-500 opacity-50 hover:opacity-100 rounded-full"
            >
                Add Row
            </button>
        </div>
    )
}

export default EmptySection
