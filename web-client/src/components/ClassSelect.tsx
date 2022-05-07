/* eslint-disable no-underscore-dangle */
import {
    FormHelperText, MenuItem, Typography 
} from '@material-ui/core'
import { Select, SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import * as React from 'react'

import { DbClass } from '../shared/db/DbClass'

type Props = {  
    classes: DbClass[],
    selectedClass: string,
    setSelectedClass: (selectedClass: string) => void
}

const ClassSelect: React.FC<Props> = ({ classes, selectedClass, setSelectedClass }) => {
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedClass(event.target.value as string)
    }
    return (
        <FormControl sx={{ p: 1 }}>
            <Select
                value={selectedClass}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}>
                {classes.map((value) => (
                    <MenuItem key={value._id} value={value._id}>
                        <Typography> {value.name} </Typography>
                    </MenuItem>   
                ))}
            </Select>
            <FormHelperText>Select class to Roll Call</FormHelperText>
        </FormControl>
    )
}
export default ClassSelect
