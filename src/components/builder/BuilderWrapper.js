import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-smooth-dnd'
import { SWAP_BLOCKS } from '../../redux/constants'
import Builder from './Builder'
import NewSection from './section/NewSection'
import Modal from './Modal'

const BuilderWrapper = () => {
    const blocks = useSelector((state) => state.blocks)
    const dispatch = useDispatch()

    const swapSections = ({ removedIndex, addedIndex }) => {
        dispatch({
            type: SWAP_BLOCKS,
            payload: {
                removedIndex,
                addedIndex,
            },
        })
    }

    return (
        <div>
            <Modal />
            <div className="z-20 relative">
                <Container
                    onDrop={(dropResult) => swapSections(dropResult)}
                    dragHandleSelector="#section-drag-handle"
                    dragClass="shadow-2xl opacity-75"
                >
                    <Builder data={blocks} />
                </Container>
                <NewSection />
            </div>
        </div>
    )
}

export default BuilderWrapper
