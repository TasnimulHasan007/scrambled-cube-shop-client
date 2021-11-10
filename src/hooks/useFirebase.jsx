import { useEffect, useState } from 'react'
import initializeFirebase from '../Firebase/firebase.init'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  getIdToken,
  signOut,
} from 'firebase/auth'

// initialize firebase
initializeFirebase()

const useFirebase = () => {
  // states
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [admin, setAdmin] = useState(false)
  const [token, setToken] = useState('')

  // auth
  const auth = getAuth()

  // register user
  const registerUser = (email, password, name, location, history) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const newUser = { email, displayName: name }
        setUser(newUser)
        // save user to the database
        /*  saveUser(email, name, 'POST') */
        // send name to firebase after creation
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch(error => setAuthError(error.message))
        const destination = location?.state?.from || '/'
        history.push(destination)
        setAuthError('')
      })
      .catch(error => setAuthError(error.message))
      .finally(() => setIsLoading(false))
  }
  // login user
  const loginUser = (email, password, location, history) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const destination = location?.state?.from || '/'
        history.push(destination)
        setAuthError('')
      })
      .catch(error => {
        setAuthError(error.message)
      })
      .finally(() => setIsLoading(false))
  }

  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        getIdToken(user).then(idToken => {
          setToken(idToken)
        })
      } else {
        setUser({})
      }
      setIsLoading(false)
    })
    return () => unsubscribed
  }, [auth])

  // log out
  const logOut = () => {
    setIsLoading(true)
    signOut(auth)
      .then(() => {
        setAuthError('')
      })
      .catch(error => {
        setAuthError(error.message)
      })
      .finally(() => setIsLoading(false))
  }

  // save user to database
  const saveUser = (email, displayName, method) => {
    const user = { email, displayName }
    fetch('https://stark-caverns-04377.herokuapp.com/users', {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then()
  }

  return {
    user,
    isLoading,
    authError,
    registerUser,
    loginUser,
    logOut,
  }
}

export default useFirebase
