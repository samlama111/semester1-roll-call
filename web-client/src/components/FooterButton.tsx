import { Button } from '@material-ui/core'
import * as React from 'react'

type Props = {  
    text: string,
    onPressUrl: string
}

const FooterButton: React.FC<Props> = ({ onPressUrl, text }) => {
    return (
        <Button
            disableElevation
            variant="contained"
            color="primary"
            style={{ textTransform: 'none', fontSize: 18 }}
            href={onPressUrl}>
            {text}
        </Button>
    )
}
export default FooterButton
