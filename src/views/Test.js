import React, { useState, useEffect } from 'react'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import interact from 'interactjs'
import iFrameResize from 'iframe-resizer/js/iframeResizer'

const Compo = () => (
    <div className='bg-pink-500'>This is a outside thing</div>
)

const Test = () => {
    const [name, setName] = useState('garrett')

    const handleClick = event => {
        // handle click events

        let localName = event.target.localName
        let editableElements = ['h1', 'p']

        if (editableElements.includes(localName)) {
            event.target.setAttribute('contenteditable', true)
        }
    }

    // useEffect(() => {
    //     iFrameResize(
    //         {
    //             log: false,
    //             checkOrigin: false,
    //             resizeFrom: 'child',
    //         },
    //         '#myIframe'
    //     )
    // })

    interact('.resize-drag').resizable({
        // resize from all edges and corners
        edges: { right: true },

        listeners: {
            move (event) {
                var target = event.target
                var x = parseFloat(target.getAttribute('data-x')) || 0
                var y = parseFloat(target.getAttribute('data-y')) || 0

                // update the element's style
                target.style.width = event.rect.width + 'px'
                //target.style.height = event.rect.height + 'px'
                //target.style.height = 'fit-content'

                //target.style.height = document.getElementById('myIframe').style.height

                // translate when resizing from top or left edges
                //x += event.deltaRect.left
                //y += event.deltaRect.top

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)'

                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)

                // update content of div with dimensions
                // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
            },
        },
        modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent',
            }),

            // minimum size
            interact.modifiers.restrictSize({
                min: { width: 320, height: 50 },
            }),
        ],

        inertia: true,
    })

    const changeName = () => {
        setName('Hank the cowdog')
    }

    return (
        <div>
            <div className='bg-gray-800'>
                <div className='bg-gray-200 pr-4 relative resize-drag'>
                    <div className='bg-green-500 w-4 h-full absolute right-0 top-0 hover:cursor-col-resize'></div>
                    <Frame
                        id='myIframe'
                        className='w-full h-screen'
                        head={
                            <>
                                <link
                                    href='https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
                                    rel='stylesheet'
                                />
                            </>
                        }
                    >
                        <FrameContextConsumer>
                            {// Callback is invoked with iframe's window and document instances
                            ({ document, window }) => {
                                document.addEventListener(
                                    'mouseover',
                                    event => {
                                        handleClick(event)
                                    }
                                )

                                // console.log('this is happening ==>')
                                // console.log(
                                //     document.body.scrollHeight
                                // )

                                // console.log(document)
                                // let script = document.createElement(
                                //     'SCRIPT'
                                // )
                                // script.src =
                                //     'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.contentWindow.min.js'
                                // crazy hackey way of getting this to work.
                                // resizer is calculating height before tailwind loads.
                                // this sets a timeout to let css load first
                                // setTimeout(() => {
                                //     document
                                //         .getElementsByTagName(
                                //             'HEAD'
                                //         )[0]
                                //         .appendChild(script)
                                // }, 500)

                                return <IFrameContent />
                            }}
                        </FrameContextConsumer>
                    </Frame>
                </div>
            </div>
        </div>
    )
}

const IFrameContent = () => {
    return (
        <div className='bg-red-600 w-full'>
            this is in a iframe {name}
            <Compo />
            <button onClick={() => changeName()}>
                Click me to do stuff
            </button>
            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/2 bg-orange-300'>
                    <h1
                        onInput={e =>
                            console.log(
                                'Text inside div',
                                e.currentTarget.textContent
                            )
                        }
                    >
                        This is editable text probably
                    </h1>
                </div>
                <div className='w-full md:w-1/2 bg-blue-400'>
                    Second col
                    <img
                        onInput={e =>
                            console.log(
                                'Text inside div',
                                e.currentTarget.src
                            )
                        }
                        src='https://images.unsplash.com/photo-1589083564106-5d0dc94f4e3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'
                    />
                </div>
            </div>
            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/2 bg-orange-300'>
                    First col
                </div>
                <div className='w-full md:w-1/2 bg-blue-400'>
                    Second col
                    <img src='https://images.unsplash.com/photo-1589083564106-5d0dc94f4e3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80' />
                </div>
            </div>
            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/2 bg-orange-300'>
                    First col
                </div>
                <div className='w-full md:w-1/2 bg-blue-400'>
                    Second col
                    <img src='https://images.unsplash.com/photo-1589083564106-5d0dc94f4e3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80' />
                </div>
            </div>
        </div>
    )
}

export default Test
