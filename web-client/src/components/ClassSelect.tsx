/* eslint-disable no-underscore-dangle */
import {
    FormHelperText, MenuItem, Typography 
} from '@material-ui/core'
import { Select, SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import * as React from 'react'

import { DbClass } from '../shared/db/DbClass'
import { DbCourse } from '../shared/db/DbCourse'

type Props = {  
    items: DbClass[] | DbCourse[],
    selectedItemId: string,
    setSelectedItemId: (selectedClass: string) => void,
    helperText: string
}

const ClassCourseSelect: React.FC<Props> = ({
    items, selectedItemId, setSelectedItemId, helperText 
}) => {
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedItemId(event.target.value as string)
    }
    return (
        <FormControl sx={{ p: 1 }}>
            <Select
                value={selectedItemId}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}>
                {items.map((value) => (
                    <MenuItem key={value._id} value={value._id}>
                        <Typography> {value.name} </Typography>
                    </MenuItem>   
                ))}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}
export default ClassCourseSelect
