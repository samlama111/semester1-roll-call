// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut
} from 'firebase/auth'
import {
    addDoc, collection, getFirestore
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAzrCarYIEIoNhIXzgTB9DDFMpmEJjners',
    authDomain: 'lsd-auth.firebaseapp.com',
    projectId: 'lsd-auth',
    storageBucket: 'lsd-auth.appspot.com',
    messagingSenderId: '709428374082',
    appId: '1:709428374082:web:1e076acc8d082d22481bdb'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

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
        const { user } = res
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
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
    db,
    logInWithEmailAndPassword,
    logout,
    registerWithEmailAndPassword,
    sendPasswordReset,
}
