import React from 'react'

import Footer from './Footer'
import Header from './Header'

type Props = {  
    children?: React.ReactNode
}

const ScreenTemplate: React.FC<Props> = ({ children }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Header/>               
            {children}
            <Footer />
        </div>
    )
}

export default ScreenTemplate
