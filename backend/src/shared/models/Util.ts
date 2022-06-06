export function splitNameIntoFirstAndLast(name: string) {
    const splitName = name.split(' ')
    const firstName = splitName[0]
    const lastName = name.substring(splitName[0].length).trim()
    return { 
        firstName, lastName
    }
}
export default { splitNameIntoFirstAndLast }
