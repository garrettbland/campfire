import React from 'react'
import { useDispatch } from 'react-redux'
import { ADD_ROW } from '../redux/constants'

const EmptySection = ({ data: block }) => {
    const dispatch = useDispatch()

    const AddRow = () => {
        const columns = window.prompt('How many columns?')
        const availableColumns = [1, 2, 3, 4, 5, 6]
        if (availableColumns.includes(parseInt(columns))) {
            dispatch({
                type: ADD_ROW,
                payload: {
                    id: block.id,
                    columns: parseInt(columns),
                },
            })
        } else {
            alert('Number not allowed')
        }
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
