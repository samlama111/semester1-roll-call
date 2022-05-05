import { Button, Grid } from '@mui/material'
import React from 'react'

import DropdownRollCallDuration from '../components/DropdownRollCallDuration'
import ScreenTemplate from '../components/ScreenTemplate'

function Dashboard() {
    // TODO: Sebrat lesson z DB
    // TODO: Check if the current lesson has roll-call going on, display the appropriate <div>

    // const [dateState, setDateState] = useState(new Date())
    // useEffect(() => {
    //     setInterval(() => setDateState(new Date()), 60000)
    // }, [])
    return (
        <ScreenTemplate>
            <Grid container direction="column">
                {/* <p>
                    {' '}
                    {dateState.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                </p>
                <p>
                    {dateState.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })}
                </p> */}
                <h2>Current lesson</h2>
                <Grid item>
                    <DropdownRollCallDuration/>
                </Grid>
                <Button style={{ maxWidth: '50%', margin: '0 auto' }} variant="contained">Start Roll Call</Button>

                {/* Another div when Start Roll call is selected
                <h2>Roll call started at 17:19</h2>
                <h2>Roll call will end at 17:34</h2>
                <Button id="endrollcall" variant="contained">End Roll Call</Button> */}
            </Grid>
        </ScreenTemplate>
    )
}

export default Dashboard
