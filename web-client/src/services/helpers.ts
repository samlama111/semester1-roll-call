export function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000)
}
export function splitNameIntoFirstAndLast(name: string) {
    const splitName = name.split(' ')
    const firstName = splitName[0]
    const lastName = name.substring(splitName[0].length).trim()
    return { 
        firstName, lastName
    }
}
