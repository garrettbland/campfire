/**
 * Takes in campfire data array
 * and returns jsx
 */
import React from 'react'
import { useDispatch } from 'react-redux'

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
                    <div
                        key={block.id}
                        className={
                            block?.classes
                                ? [...block.classes, 'relative'].join(
                                      ' '
                                  )
                                : null
                        }
                    >
                        <div
                            className="absolute top-0 left-0"
                            onClick={() =>
                                dispatch({
                                    type: 'SET_EDITING',
                                    payload: block,
                                })
                            }
                        >
                            Edit Section
                        </div>
                        <BuildSite
                            data={block.data}
                            addContent={addContent}
                        />
                    </div>
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

                        <div className="w-full bg-orange-500 h-0 -my-4">
                            <button
                                onClick={() => addContent(block.id)}
                                className={
                                    'rounded-full w-8 h-8 bg-blue-500 text-white mx-auto block'
                                }
                            >
                                +
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
