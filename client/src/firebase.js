import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAiFs-Al871y9Yqi7ToMp0wCVnzBTRVrVI",
    authDomain: "hacktivoverflow-214704.firebaseapp.com",
    databaseURL: "https://hacktivoverflow-214704.firebaseio.com",
    projectId: "hacktivoverflow-214704",
    storageBucket: "hacktivoverflow-214704.appspot.com",
    messagingSenderId: "134021174289"
  };

  let provider = new firebase.auth.FacebookAuthProvider();
  firebase.initializeApp(config)


export {
    provider,
    firebase
}