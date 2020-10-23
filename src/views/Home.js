import React from 'react'
import { useSelector } from 'react-redux'
import Modal from '../components/Modal'
import BuildSite from '../components/BuildSite'

const Home = () => {
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

export default Home
