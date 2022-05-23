export const convertStringToInt = (stringInput: string): number | undefined => {
    // + converts string to number, removes trailing 0s & returns NaN if non-digits are part of string
    const converetedNumber = +(stringInput)
    if (isValidNumber(converetedNumber)) return converetedNumber
    return undefined
}

function isValidNumber(n: number) {
    return typeof n === 'number' && !Number.isNaN(n) && Number.isFinite(n)
}

export const sanitizeString = (stringInput: string) => {
    if (typeof (stringInput) === 'string' && stringInput.trim().length > 0) return stringInput.trim()
    return ''
}
