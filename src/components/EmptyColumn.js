import React from 'react'
import { useDispatch } from 'react-redux'

const EmptySection = ({ data: block }) => {
    const dispatch = useDispatch()

    return (
        <div className="flex justify-center items-center">
            <button className="w-24 h-10 bg-purple-600 opacity-50 hover:opacity-100 rounded-full">
                + Content
            </button>
        </div>
    )
}

export default EmptySection
