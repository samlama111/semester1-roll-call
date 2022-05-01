import '../App.css'

import React from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'

function Dashboard() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
                <p>Hello world!!!!</p>
                <p />
                <Footer />
            </header>

        </div>
    )
}

export default Dashboard
