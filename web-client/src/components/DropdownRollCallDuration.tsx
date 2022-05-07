import { Typography } from '@material-ui/core'
import { FormHelperText } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'

type Props = {  
    duration: number,
    setDuration: (duration: number) => void,
    possibleDurationValues: number[]
}

const DropdownRollCallDuration: React.FC<Props> = ({
    duration, setDuration, possibleDurationValues 
}) => {

    const handleChange = (event: SelectChangeEvent) => {
        setDuration(Number(event.target.value))
    }

    return (
        <FormControl sx={{ p: 1 }}>
            <Select
                value={duration.toString()}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}>
                {possibleDurationValues.map((value) => (
                    <MenuItem key={value} value={value}>
                        <Typography style={{ fontStyle: value === duration ? 'italic' : 'normal' }}>
                            {value} minutes
                        </Typography>
                    </MenuItem>   
                ))}
            </Select>
            <FormHelperText>Choose Roll Call duration</FormHelperText>
        </FormControl>
    )
}
export default DropdownRollCallDuration
