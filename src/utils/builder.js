/**
 * Takes in campfire data array
 * and returns jsx
 */
import React from 'react'
import { useDispatch } from 'react-redux'

/**
 * Block types
 */
const blocks = ['section', 'div']
const content = ['h1', 'p', 'img']

const BuildSite = ({ data }) => {
    const dispatch = useDispatch()

    /**
     * Loops through data
     */
    return data.map((block) => {
        /**
         * If type is in blocks array
         */
        if (blocks.includes(block.type)) {
            return (
                <div
                    key={block.id}
                    className={
                        block?.classes
                            ? [...block.classes].join(' ')
                            : null
                    }
                >
                    <BuildSite data={block.data} />
                </div>
            )
        } else if (content.includes(block.type)) {
            /**
             * Block type is content
             */
            switch (block.type) {
                case 'p': {
                    return (
                        <p
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
                case 'h1': {
                    return (
                        <h1
                            key={block.id}
                            className={
                                block?.classes
                                    ? [...block.classes].join(' ')
                                    : null
                            }
                            onClick={() =>
                                alert(
                                    `clicked on h1 tag with ${block.data.text}`
                                )
                            }
                        >
                            {block.data.text}
                        </h1>
                    )
                }
                case 'img': {
                    return (
                        <img
                            key={block.id}
                            alt={block.data.alt}
                            className={
                                block?.classes
                                    ? [...block.classes].join(' ')
                                    : null
                            }
                            src={block.data.src}
                            onClick={() =>
                                alert(
                                    `clicked on img tag with src ${block.data.src}`
                                )
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
