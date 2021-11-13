import React from 'react'
import Navbar from './navbar'

export default function Layout({children}) {
    return (
        <div className="container">
            <Navbar/>
            {children}
        </div>
    )
}
