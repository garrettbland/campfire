import React, { useEffect, useState, useRef } from 'react'
import './styles.css'
import { returnFound } from 'find-and'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_BLOCK, SET_EDITING } from './constants'
import { ReactTrixRTEInput } from 'react-trix-rte'

const App = () => {
    const blocks = useSelector((state) => state.blocks)
    return (
        <>
            <Modal />
            <div className="z-20 relative">
                <BuildSite data={blocks} />
            </div>
        </>
    )
}

const Modal = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()
    const modalNode = useRef()
    const [textValue, setTextValue] = useState('')

    useEffect(() => {
        if (currentlyEditing !== null) {
            if (currentlyEditing.type === 'image') {
                setTextValue(currentlyEditing.data.src)
            }
            if (currentlyEditing.type === 'link') {
                setTextValue(currentlyEditing.data.title)
            }
        }
    }, [currentlyEditing])

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
        if (modalNode.current && modalNode.current.contains(event.target)) {
            /**
             * Do nothing since click is inside sidbar
             */
            return
        }

        /**
         * Handle outside sideBar node click
         */
        dispatch({
            type: 'SET_EDITING',
        })
    }

    const handleTextChange = (event, newValue) => {
        if (currentlyEditing.type === 'text') {
            setTextValue(newValue)
        }
    }

    const handleSubmit = () => {
        if (currentlyEditing.type === 'text') {
            dispatch({
                type: UPDATE_BLOCK,
                payload: {
                    ...currentlyEditing,
                    data: textValue,
                },
            })
        }

        if (currentlyEditing.type === 'image') {
            dispatch({
                type: UPDATE_BLOCK,
                payload: {
                    ...currentlyEditing,
                    data: {
                        ...currentlyEditing.data,
                        src: textValue,
                    },
                },
            })
        }

        if (currentlyEditing.type === 'link') {
            dispatch({
                type: UPDATE_BLOCK,
                payload: {
                    ...currentlyEditing,
                    data: {
                        ...currentlyEditing.data,
                        title: textValue
                    }
                }
            })
        }

        dispatch({
            type: 'SET_EDITING',
        })
    }

    return (
        <div
            className={`w-full h-full bg-opacity-50 bg-black transform transition duration-150 ease-in-out ${
                currentlyEditing ? 'show z-40 fixed' : 'hide absolute top-0 left-0 z-10'
            }`}
        >
            <div
                ref={modalNode}
                className={`bg-white max-w-4xl mx-auto rounded mt-12 transition duration-150 ease-in-out`}
            >
                {currentlyEditing && currentlyEditing.id && (
                    <>
                        Currently editing: {JSON.stringify(currentlyEditing.id)}
                        <div>
                            {currentlyEditing.type === 'text' && (
                                <div>
                                    <ReactTrixRTEInput
                                        defaultValue={currentlyEditing.data}
                                        onChange={handleTextChange}
                                    />
                                </div>
                            )}
                            {currentlyEditing.type === 'image' && (
                                <div>
                                    <img className="w-64 h-auto" src={currentlyEditing.data.src} />
                                    Alt Text:{' '}
                                    <input
                                        defaultValue={currentlyEditing.data.alt}
                                        className="border-2 px-4 py-2 rounded"
                                    />
                                    <div>
                                        <label>Photo URL</label>
                                        <input
                                            value={textValue}
                                            onChange={(event) => setTextValue(event.target.value)}
                                            className="border-2 px-4 py-2 rounded"
                                        />
                                    </div>
                                </div>
                            )}
                            { currentlyEditing.type === 'link' && (
                                <div className="flex flex-col">
                                    <label>Title</label>
                                    <input
                                            value={textValue}
                                            onChange={(event) => setTextValue(event.target.value)}
                                            className="border-2 px-4 py-2 rounded"
                                        />
                                        <label>Link</label>
                                    <input
                                            defaultValue={currentlyEditing.data.href}
                                            className="border-2 px-4 py-2 rounded"
                                        />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="bg-red-500 text-white px-4 py-2"
                                onClick={() => dispatch({ type: SET_EDITING })}
                            >
                                Close
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2"
                                onClick={() => handleSubmit()}
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

/**
 * Takes in an array and recursivley builds the site
 * and adds in buttons
 * @param {Array} data
 */
const BuildSite = ({ data }) => {
    return data.map((block) => {
        switch (block.type) {
            case 'section': {
                return (
                    <Section block={block} key={block.id}>
                        <BuildSite data={block.data} />
                    </Section>
                )
            }
            case 'row': {
                return (
                    <Row block={block} key={block.id}>
                        <BuildSite data={block.data} />
                    </Row>
                )
            }
            case 'column': {
                return (
                    <Column block={block} key={block.id}>
                        <BuildSite data={block.data} />
                    </Column>
                )
            }
            case 'text': {
                return <Text block={block} key={block.id} />
            }
            case 'image': {
                return <Image block={block} key={block.id} />
            }
            case 'link': {
                return <Link block={block} key={block.id} />
            }
            default: {
                return null
            }
        }
    })
}

const Section = ({ block, children }) => {
    const [showTool, setShowTool] = useState(false)
    const sectionRef = useRef()
    const blocks = useSelector((state) => state.blocks)

    useEffect(() => {
        const section = sectionRef.current

        section.addEventListener('mouseenter', (event) => {
            setShowTool(true)
        })
        section.addEventListener('mouseleave', (event) => {
            setShowTool(false)
        })
        return () => {
            section.removeEventListener('mouseenter', () => {})
            section.removeEventListener('mouseleave', () => {})
        }
    })

    return (
        <div data-type="section" ref={sectionRef} className={block.classList.join(' ')}>
            <button
                onClick={() => console.log(returnFound(blocks, { id: block.id }))}
                className={`absolute top-0 left-0 bg-red-500 ${showTool ? 'block' : 'hidden'}`}
            >
                Section Tools
            </button>
            {children}
            <div
                className={`absolute bottom-0 left-0 w-full h-0 bg-orange-500 flex items-center justify-center ${
                    showTool ? 'block' : 'hidden'
                }`}
            >
                <button className="w-10 h-10 bg-red-500 opacity-50 hover:opacity-100 rounded-full">
                    +
                </button>
            </div>
        </div>
    )
}

const Row = ({ block, children }) => {
    const [showTool, setShowTool] = useState(false)
    const rowRef = useRef()
    const blocks = useSelector((state) => state.blocks)

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

    return (
        <div data-type="row" ref={rowRef} className={[...block.classList, 'relative'].join(' ')}>
            <button
                onClick={() => console.log(returnFound(blocks, { id: block.id }))}
                className={`absolute top-0 left-0 h-6 bg-red-500 ${showTool ? 'block' : 'hidden'}`}
            >
                Row Tools
            </button>
            {children}
            <div
                className={`absolute bottom-0 left-0 w-full h-0 bg-orange-500 flex items-center justify-center ${
                    showTool ? 'block' : 'hidden'
                }`}
            >
                <button className="w-10 h-10 bg-red-500 opacity-50 hover:opacity-100 rounded-full">
                    +
                </button>
            </div>
        </div>
    )
}

const Column = ({ block, children }) => {
    return (
        <div data-type="column" className={block.classList.join(' ')}>
            {children}
        </div>
    )
}

const Text = ({ block }) => {
    const [showTool, setShowTool] = useState(false)
    const textRef = useRef()
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

    useEffect(() => {
        const text = textRef.current

        text.addEventListener('mouseenter', (event) => {
            setShowTool(true)
        })
        text.addEventListener('mouseleave', (event) => {
            setShowTool(false)
        })
        return () => {
            text.removeEventListener('mouseenter', () => {})
            text.removeEventListener('mouseleave', () => {})
        }
    })

    return (
        <p data-type="text" ref={textRef} className={[...block.classList, 'relative'].join(' ')}>
            <button
                onClick={() =>
                    dispatch({
                        type: SET_EDITING,
                        payload: returnFound(blocks, { id: block.id }),
                    })
                }
                className={`absolute top-0 left-0 text-black bg-white p-1 h-full bg-opacity-25 text-lg w-full ${
                    showTool ? 'block' : 'hidden'
                }`}
            >
                Edit | Add
            </button>
            <span dangerouslySetInnerHTML={{ __html: block.data }}></span>
        </p>
    )
}

const Image = ({ block }) => {
    const [showTool, setShowTool] = useState(false)
    const imageRef = useRef()
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

    useEffect(() => {
        const image = imageRef.current

        image.addEventListener('mouseenter', (event) => {
            setShowTool(true)
        })
        image.addEventListener('mouseleave', (event) => {
            setShowTool(false)
        })
        // return () => {
        //   image.removeEventListener("mouseenter", () => {});
        //   image.removeEventListener("mouseleave", () => {});
        // };
    })

    return (
        <div ref={imageRef} className="relative z-10">
            <button
                onClick={() =>
                    dispatch({
                        type: SET_EDITING,
                        payload: returnFound(blocks, { id: block.id }),
                    })
                }
                className={`w-full h-full bg-blue-400 bg-opacity-50 absolute top-0 left-0 z-20 ${
                    showTool ? 'block' : 'hidden'
                }`}
            >
                Edit | Add
            </button>
            <img
                src={block.data.src}
                alt={block.data.alt}
                data-type="image"
                className={[...block.classList, 'relative'].join(' ')}
            />
        </div>
    )
}

const Link = ({ block }) => {
    const [showTool, setShowTool] = useState(false)
    const linkRef = useRef()
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

    useEffect(() => {
        const link = linkRef.current

        link.addEventListener('mouseenter', (event) => {
            setShowTool(true)
        })
        link.addEventListener('mouseleave', (event) => {
            setShowTool(false)
        })
        // return () => {
        //   image.removeEventListener("mouseenter", () => {});
        //   image.removeEventListener("mouseleave", () => {});
        // };
    })

    return (
        <div ref={linkRef} className="relative z-10">
            <button
                onClick={() =>
                    dispatch({
                        type: SET_EDITING,
                        payload: returnFound(blocks, { id: block.id }),
                    })
                }
                className={`w-full h-full bg-blue-400 bg-opacity-50 absolute top-0 left-0 z-20 ${
                    showTool ? 'block' : 'hidden'
                }`}
            >
                Edit | Add
            </button>
            <a className={block.classList.join(' ')} href={block.data.href}>
                {block.data.title}
            </a>
        </div>
    )
}

export default App
