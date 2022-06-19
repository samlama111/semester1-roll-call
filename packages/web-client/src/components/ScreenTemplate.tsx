import { Box } from '@mui/material'
import React from 'react'

import Footer from './Footer'
import Header, { drawerWidth } from './Header'

type Props = {  
    children?: React.ReactNode | React.ReactNode[]
}

const ScreenTemplate: React.FC<Props> = ({ children }) => {   
    return (
        <div style={{
            textAlign: 'center',
            position: 'relative',
            minHeight: '100vh', 
        }}>
            <Header/> 
            <Box sx={{
                paddingBottom: '9rem',
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` }
            }}>
                {children}
            </Box>
            <Footer />
        </div>
    )
}

export default ScreenTemplate
