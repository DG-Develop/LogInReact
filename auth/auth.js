import firebase from "../firebase-config"

const socialMediaAuth = (provider) => {
    return firebase
    .auth()
    .signInWithPopup(provider)
    .then(res => res.user)
    .catch((e) =>  e)
}

export default socialMediaAuth