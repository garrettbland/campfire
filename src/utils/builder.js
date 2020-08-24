/**
 * Takes in campfire data array
 * and returns jsx
 */
import React from 'react'
import { useDispatch } from 'react-redux'
import { Draggable } from 'react-smooth-dnd'

/**
 * Block types
 */
const blocks = ['section', 'container', 'content-container']
const content = ['text', 'image']

const BuildSite = ({ data, addContent }) => {
    const dispatch = useDispatch()
    /**
     * Loops through data
     */
    return data.map((block) => {
        /**
         * If type is in blocks array
         */

        if (blocks.includes(block.type)) {
            if (block.type === 'section') {
                return (
                    <Draggable key={block.id}>
                        <div
                            key={block.id}
                            className={
                                block?.classes
                                    ? [
                                          ...block.classes,
                                          'relative',
                                      ].join(' ')
                                    : null
                            }
                        >
                            <div className="absolute top-0 left-0">
                                <div className="flex">
                                    <button
                                        onClick={() =>
                                            dispatch({
                                                type: 'SET_EDITING',
                                                payload: block,
                                            })
                                        }
                                    >
                                        Edit Section
                                    </button>
                                    <div id="section-drag-handle">
                                        Drag Handle
                                    </div>
                                </div>
                            </div>
                            <BuildSite
                                data={block.data}
                                addContent={addContent}
                            />
                        </div>
                    </Draggable>
                )
            } else if (block.type === 'content-container') {
                /**
                 * If content container, add 'add content' button
                 * with content-container id to concat to data array
                 */
                return (
                    <div
                        key={block.id}
                        className={
                            block?.classes
                                ? [...block.classes].join(' ')
                                : null
                        }
                    >
                        <BuildSite
                            data={block.data}
                            addContent={addContent}
                        />

                        <div className="w-full h-0">
                            <button
                                onClick={() => addContent(block.id)}
                                className={
                                    'mx-auto flex justify-center items-center bg-blue-700 text-sm h-8 w-8 hover:bg-blue-600 rounded-full text-blue-100'
                                }
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="css-i6dzq1"
                                >
                                    <line
                                        x1="12"
                                        y1="5"
                                        x2="12"
                                        y2="19"
                                    ></line>
                                    <line
                                        x1="5"
                                        y1="12"
                                        x2="19"
                                        y2="12"
                                    ></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div
                        key={block.id}
                        className={
                            block?.classes
                                ? [...block.classes].join(' ')
                                : null
                        }
                    >
                        <BuildSite
                            data={block.data}
                            addContent={addContent}
                        />
                    </div>
                )
            }
        } else if (content.includes(block.type)) {
            /**
             * Block type is content
             */
            switch (block.type) {
                case 'text': {
                    return (
                        <p
                            id="campfire-content"
                            key={block.id}
                            className={
                                block?.classes
                                    ? [...block.classes].join(' ')
                                    : null
                            }
                            onClick={() =>
                                dispatch({
                                    type: 'SET_EDITING',
                                    payload: block,
                                })
                            }
                        >
                            {block.data.text}
                        </p>
                    )
                }
                case 'image': {
                    return (
                        <img
                            id="campfire-content"
                            key={block.id}
                            alt={block.data.alt}
                            className={
                                block?.classes
                                    ? [...block.classes].join(' ')
                                    : null
                            }
                            src={block.data.src}
                            onClick={() =>
                                dispatch({
                                    type: 'SET_EDITING',
                                    payload: block,
                                })
                            }
                        />
                    )
                }
                default: {
                    return null
                }
            }
        } else {
            return null
        }
    })
}

export default BuildSite
