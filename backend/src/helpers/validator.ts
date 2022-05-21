/* eslint-disable no-useless-escape */
import firebaseAdmin from 'firebase-admin'
import { ObjectId } from 'mongodb'

import { Location } from '../shared/models/Location'
import { sanitizeString } from './stringHandler'

export const validateObjectId = (input: ObjectId | string) => {
    return ObjectId.isValid(input)
}
export const validateStringName = (stringInput: string) => {
    return validateName(stringInput) && !hasNumber(stringInput)
}
export const validateName = (stringInput: string) => {
    const sanitizedInput = sanitizeString(stringInput)
    return sanitizedInput.length > 1 && sanitizedInput.length < 99
}
function hasNumber(inputString: string) {
    return /\d/.test(inputString)
}
export const isEmailValid = (emailInput: string) => {
    // eslint-disable-next-line max-len
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

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

export const isLocationValid = (inputLocation: Location) => {
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
