import { createStyles, makeStyles, Theme } from '@material-ui/core'

const defaultMarginSpacing = 3

export const useFooterWrapperStyles = makeStyles((theme: Theme) => createStyles({
    topMargin: {
        marginTop: theme.spacing(defaultMarginSpacing)
    }
}))

export const useHeaderWrapperStyles = makeStyles((theme: Theme) => createStyles({
    bottomMargin: {
        marginBottom: theme.spacing(defaultMarginSpacing)
    }
}))
