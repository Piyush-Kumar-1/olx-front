import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA-Y4x8t4XzIw0LGJXAjUpQ4hv3YvKwQVI",
  authDomain: "olxx-61454.firebaseapp.com",
  projectId: "olxx-61454",
  storageBucket: "olxx-61454.appspot.com",
  messagingSenderId: "560410032644",
  appId: "1:560410032644:web:ed7f0e3ab8af80f6c6d351",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
export { auth, storage };
