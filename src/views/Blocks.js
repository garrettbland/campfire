import React, { useEffect } from 'react'
import { Block1 } from '../blocks/block1'
import { Block3 } from '../blocks/block3'

const Blocks = () => {
    return (
        <div>
            <div>
                <Block1 />
                <Block3 />
            </div>
            <div>
                <button>Add Block</button>
            </div>
        </div>
    )
}

export default Blocks
