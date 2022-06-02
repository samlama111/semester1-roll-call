/* eslint-disable no-useless-escape */
import firebaseAdmin from 'firebase-admin'
import { ObjectId } from 'mongodb'

import { Location } from '../shared/models/Location'

export const validateObjectId = (input: ObjectId | string) => {
    return ObjectId.isValid(input)
}
export const validateStringName = (stringInput: string) => {
    return validateNameLength(stringInput) && !hasNumber(stringInput)
}
export const validateStringPersonName = (stringInput: string) => {
    return validateLongNameLength(stringInput) && !hasNumber(stringInput)
}
export const validateNameLength = (stringInput: string) => {
    return stringInput.length > 1 && stringInput.length <= 60
}
export const validateLongNameLength = (stringInput: string) => {
    return stringInput.length > 1 && stringInput.length <= 90
}
function hasNumber(inputString: string) {
    return /\d/.test(inputString)
}
export const isEmailValid = (emailInput: string) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!emailInput) { return false }

    if (emailInput.length > 254) { return false }

    const valid = emailRegex.test(emailInput)
    if (!valid) { return false }

    const parts = emailInput.split('@')
    if (parts[0].length > 64) { return false }

    const domainParts = parts[1].split('.')
    if (domainParts.some((part) => { return part.length > 63 })) { return false }

    return true
}

export const areCoordinatesValid = (inputLocation: Location) => {
    return isLatitudeValid(inputLocation.lat) && isLongitudeValid(inputLocation.long) 
}

export const isLatitudeValid = (latitude: number) => {
    return latitude >= -90 && latitude <= 90
}
export const isLongitudeValid = (longitude: number) => {
    return longitude >= -180 && longitude <= 180
}

export const getUidFromJwt = async (jwtToken: string) => {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(jwtToken)
    return decodedToken.uid
}
export const validateUid = async (uid: string) => {
    const base64regex = /^([0-9a-zA-Z]{4})*(([0-9a-zA-Z]{2}==)|([0-9a-zA-Z]{3}=))?$/
    return base64regex.test(uid)
}
