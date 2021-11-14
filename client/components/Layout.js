import React from 'react'
import Navbar from './navbar'
import Notify from './Notify'

export default function Layout({children}) {
    return (
        <div className="container">
            <Navbar/>
            <Notify />
            {children}
        </div>
    )
}
