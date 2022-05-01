import { FormHelperText } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'

export default function SelectLabels() {
    const [duration, setDuration] = React.useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setDuration(event.target.value)
    }

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={duration}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}>
                    <MenuItem value="">
                        <em>5 minutes</em>
                    </MenuItem>
                    <MenuItem value={10}>10 minutes</MenuItem>
                    <MenuItem value={20}>15 minutes</MenuItem>
                    <MenuItem value={30}>20 minutes</MenuItem>
                </Select>
                <FormHelperText>Choose Roll Call duration</FormHelperText>
            </FormControl>
        </div>
    )
}
