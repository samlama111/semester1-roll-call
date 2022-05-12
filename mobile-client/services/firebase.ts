// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut
} from 'firebase/auth'
import * as credentials from '../google-services.json';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: credentials.client[0].api_key[0].current_key,
    projectId: credentials.project_info.project_id,
    // TODO: is needed?
    storageBucket: credentials.project_info.storage_bucket,
    appId: credentials.client[0].client_info.mobilesdk_app_id
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.error(err)
        // alert(err.message)
    }
}

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        console.log(res)
    } catch (err) {
        console.error(err)
        // alert(err.message)
    }
}

const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert('Password reset link sent!')
    } catch (err) {
        console.error(err)
        // alert(err.message)
    }
}

const logout = () => {
    signOut(auth)
}

export {
    auth,
    logInWithEmailAndPassword,
    logout,
    registerWithEmailAndPassword,
    sendPasswordReset,
}
