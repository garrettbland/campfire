import React from 'react'
import { useSelector } from 'react-redux'
import Modal from '../components/Modal'
import BuildSite from '../components/BuildSite'
import NewSection from '../components/NewSection'

const Home = () => {
    const blocks = useSelector((state) => state.blocks)
    return (
        <>
            <Modal />
            <div className="z-20 relative">
                <BuildSite data={blocks} />
                <NewSection />
            </div>
        </>
    )
}

export default Home
