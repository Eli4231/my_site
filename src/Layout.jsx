import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import ChatBot from './ChatBot'
import './Layout.css'

function Layout() {
    
    return (
        <div className="Layout">
            <nav className="navbar">
                <div className="nav-container">
                    <Link to="/" className="logo"><h1>אלי לאנג</h1></Link>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
            </nav>
            <main className='main-content'>
                <Outlet />
            </main>
            <footer className='footer'>
                <p>&copy; {new Date().getFullYear()} My Site. All rights reserved.</p>
                <p>Contact: <a href="elilang92@gmail.com">elilang92@gmail.com</a></p>
                <p>Phone: <a href="tel:0547787136">0547787136</a></p>
            </footer>
            <ChatBot />
        </div>
    )
}export default Layout
        