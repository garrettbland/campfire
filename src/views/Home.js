import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../components/Modal'
import BuildSite from '../components/BuildSite'
import NewSection from '../components/NewSection'
import { Container } from 'react-smooth-dnd'
import { SWAP_BLOCKS } from '../redux/constants'

const Home = () => {
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
        <>
            <Modal />
            <div className="z-20 relative">
                <Container
                    onDrop={(dropResult) => swapSections(dropResult)}
                    dragHandleSelector="#section-drag-handle"
                    dragClass="shadow-2xl opacity-75"
                >
                    <BuildSite data={blocks} />
                </Container>
                <NewSection />
            </div>
        </>
    )
}

export default Home
