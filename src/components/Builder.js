import React from 'react'
import buildSite from '../utils/builder'
import { useSelector } from 'react-redux'

const Builder = () => {
    const website = useSelector((state) => state.website)
    return <>{buildSite(website?.data)}</>
}

export default Builder
