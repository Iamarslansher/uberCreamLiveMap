import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5kFpt568u8g-djYFozGLmg1TcsuRXGf4",
  authDomain: "compelete-ubercream.firebaseapp.com",
  projectId: "compelete-ubercream",
  storageBucket: "compelete-ubercream.appspot.com",
  messagingSenderId: "783330166176",
  appId: "1:783330166176:web:e9f3dfdf015fd3113290c5",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// USER-SIGNUP
async function userSignUp(userInfo, navigator) {
  try {
    const { userName, userType, email, password } = userInfo;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    delete userInfo.password;
    userInfo.uid = user.uid;
    await setDoc(doc(db, "users/" + user.uid), userInfo);
    // const id = docRef.id;
    // await addDoc(collection(db, "users/" + id), {
    //   userName,
    //   email,
    //   id,
    // });
    // await setDoc(doc(db, "users/", ""), data)
    navigator && navigator("Dashboard");
  } catch (error) {
    console.log(error);
  }
}

// USER-LOGIN
async function userLogin(userInfo, navigator) {
  try {
    const { email, password } = userInfo;
    await signInWithEmailAndPassword(auth, email, password);
    navigator && navigator("Dashboard");
  } catch (e) {
    alert(e.message);
  }
}

// RIDES-REQUEST
async function rideRequest(rideData) {
  const {
    pickUpLat,
    pickUpLong,
    destinationLat,
    destinationLong,
    carType: vehale,
    fare,
    status,
  } = rideData;

  await setDoc(doc(db, "rides/" + "passenger/"), rideData);

  // const docRef = await addDoc(collection(db, "Rides"), userData);
  // const id = docRef.id;
}

//  GETING ALL RIDES
async function getingRides() {
  const querySnapshot = await getDocs(collection(db, "rides"));
  const rides = [];
  querySnapshot.forEach((doc) => {
    rides.push(doc.data());
  });
  return rides;
}

export {
  rideRequest,
  userSignUp,
  userLogin,
  db,
  collection,
  onSnapshot,
  orderBy,
  doc,
  getingRides,
};
