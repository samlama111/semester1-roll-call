import './styles/index.css'

import { createTheme, ThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom/client'

import Router from './content/Router'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            contrastText: '#fff' // button text white instead of black
        }
    }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    </React.StrictMode>
)
