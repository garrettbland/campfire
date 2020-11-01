import React from 'react'

const Column = ({ block, children }) => {
    return (
        <div data-type="column" className={block.classList.join(' ')}>
            {children}
        </div>
    )
}

export default Column
