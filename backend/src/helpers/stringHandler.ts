export const convertStringToInt = (stringInput: string): number => {
    // + converts string to number, removes trailing 0s & returns NaN if non-digits are part of string
    return +(stringInput)
}

export const sanitizeString = (stringInput: string) => {
    if (typeof (stringInput) === 'string' && stringInput.trim().length > 0) return stringInput.trim()
    return ''
}
