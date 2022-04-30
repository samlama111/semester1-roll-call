import './App.css'

import React from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
import Login from './components/Login'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
                <Login/>
                <p />
                <Footer />
            </header>

        </div>
    )
}

export default App
