import React from 'react'
import { useDispatch } from 'react-redux'
import { ADD_SECTION } from '../../../redux/constants'

const NewSection = () => {
    const dispatch = useDispatch()

    const AddSection = () => {
        dispatch({
            type: ADD_SECTION,
        })
    }

    return (
        <div className="flex justify-center items-center py-12">
            <button
                onClick={() => AddSection()}
                className="w-24 h-10 bg-red-500 opacity-50 hover:opacity-100 rounded-full"
            >
                Add Section
            </button>
        </div>
    )
}

export default NewSection
