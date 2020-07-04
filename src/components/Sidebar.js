import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = () => {
    const dispatch = useDispatch()
    const sidebarNode = useRef()
    const currentlyEditing = useSelector(
        (state) => state.currentlyEditing
    )

    useEffect(() => {
        /**
         * Event listener when mounted to listen for mousedown
         * for overlay
         */
        document.addEventListener('mousedown', handleClick)

        /**
         * Return function to be called on component unmount
         */
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

    const handleClick = (event) => {
        if (sidebarNode.current.contains(event.target)) {
            console.log('inside click')
            // inside click
            return
        }
        // outside click
        dispatch({
            type: 'SET_EDITING',
            payload: {},
        })
    }

    /**
     * Nothing is being edited, don't show sidebar
     */

    return (
        <div>
            {currentlyEditing.id && (
                <div className="absolute top-0 left-0 w-screen h-screen flex justify-end bg-gray-900 bg-opacity-50">
                    <div
                        ref={sidebarNode}
                        className="bg-gray-100 w-1/3 h-full shadow-2xl"
                    >
                        ID: {currentlyEditing.id}
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'SET_EDITING',
                                    payload: {},
                                })
                            }
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sidebar
