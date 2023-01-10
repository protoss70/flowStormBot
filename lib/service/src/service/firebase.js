import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { setDoc } from "firebase/firestore";

var fire = {}

var auth = undefined;
var firestore = undefined;
var analytics = undefined;

fire.initApp = () => {

    const firebaseConfig = {
      apiKey: "AIzaSyDoCAwkF2PUX8ZW2eMbbjEeRFSGZAw1i_I",
      authDomain: "sop-generator.firebaseapp.com",
      projectId: "sop-generator",
      storageBucket: "sop-generator.appspot.com",
      messagingSenderId: "960257251812",
      appId: "1:960257251812:web:bd9053e7eaea74ad9c0ff1",
      measurementId: "G-P1HCJ2KTVM"
    };
    
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    // const analytics = firebase.getAnalytics(app);

    auth = firebase.auth();
    firestore = firebase.firestore();
    analytics = firebase.analytics();
    return {app};
}

fire.currentUser = () => {
    return auth.currentUser;
}

fire.SignIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const res = await auth.signInWithPopup(provider);
  console.log(res);
  return res;
}

fire.SignOut = () => {
  auth.signOut();
}

fire.checkExistingUser = async (ref) => {
  const doc = await ref.get()
  .catch((error) => {
    console.log("Error getting document:", error);
    return undefined;
  });
  if (doc.exists) {
      console.log("Document data:", doc.data());
      return true;
  } else {
      // doc.data() will be undefined in this case
      return false;
  }
}

fire.newUser = async () => {
  const user = auth.currentUser;
  const usersRef = firestore.collection('Users');
  const passing = await fire.checkExistingUser(usersRef.doc(user.uid));
  console.log("passing: ", passing);
  if (!passing){
    fire.SignOut();
    return false;
  }else{
    return true
  }
}

export default fire;