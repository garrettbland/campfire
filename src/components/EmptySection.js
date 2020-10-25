import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_ROW } from '../redux/constants'

const EmptySection = ({ data: block }) => {
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

    const AddRow = () => {
        dispatch({
            type: ADD_ROW,
            payload: {
                id: block.id,
            },
        })
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
