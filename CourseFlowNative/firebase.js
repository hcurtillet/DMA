import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import useSWR from "swr";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDFbeJEpIvlP6nwahLgAX6XbpPUgva8SDE",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export default app;

export const database = getFirestore(app);

export async function getCourses() {
  const coursesCol = collection(database, "Courses");
  const coursesSnapshot = await getDocs(coursesCol);
  const coursesList = coursesSnapshot.docs.map((doc) => doc.data());
  return coursesList;
}

export function useCourses() {
  console.log(useSWR("Courses", getCourses));
  return useSWR("Courses", getCourses);
}
