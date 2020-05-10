import React from 'react'
import interact from 'interactjs'
import IframeResizer from 'iframe-resizer-react'

const Home = () => {
    interact('.resize-drag').resizable({
        // resize from all edges and corners
        edges: { right: true },

        listeners: {
            move(event) {
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

    const getCode = () => {
        var iframething = document
            .getElementById('myIframe')
            .contentWindow.document.getElementById('testId').outerHTML

        console.log(iframething)
    }

    return (
        <div>
            <div className="bg-gray-800">
                <div className="bg-gray-200 pl-4 pt-4 pb-4 pr-8 relative resize-drag">
                    <div className="bg-green-500 w-4 h-full absolute right-0 top-0 hover:cursor-col-resize"></div>
                    <IframeResizer
                        id="myIframe"
                        resizeFrom="child"
                        checkOrigin={false}
                        src="./public/iframe.html"
                        style={{ width: '1px', minWidth: '100%' }}
                    />
                    <button
                        onClick={() => getCode()}
                        className="bg-gray-500"
                    >
                        Get Source Code
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
