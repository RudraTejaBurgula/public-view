import React, { useContext, useEffect, useState } from 'react'
import { auth, signInWithPhoneNumber } from '../firebase';
const AuthContext = React.createContext();
export function useAuth() {
    return (useContext(AuthContext))
}

export function AuthProvider({ children }) {
    /////
    function signNumber(auth, phoneNumber, appVerifier) {
        return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log()
                console.log("OTP sent")
                // ...
            }).catch((error) => {
                console.log(error)
                alert('Messages Exceed to this Number')
                // Error; SMS not sent
                // ...
            });
    }
    ////////////////////////////
    function signUp(email, password) {
        console.log(email, password)
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const [currentUser, setcurrentUser] = useState();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user)
            //console.log(user.email.split('@')[0])
        })
        return unsubscribe
    }, [])
    const value = {
        currentUser,
        signUp,
        logIn,
        signNumber
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
