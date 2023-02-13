import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD5Ofgzi7XBvVIeoSfyatjECrW1JshupGE",
  authDomain: "gabboevents-23267.firebaseapp.com",
  databaseURL: "https://gabboevents-23267-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gabboevents-23267",
  storageBucket: "gabboevents-23267.appspot.com",
  messagingSenderId: "360316325997",
  appId: "1:360316325997:web:657c6008f12f5d1d7e6f64"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
  db
}
