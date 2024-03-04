import * as firebase from 'firebase'
const firebaseConfig = {
        apiKey: "AIzaSyBbDPYtkeXrGdvSEbWq9rjMSKBqRu6e2Jw",
        authDomain: "easyprepai.firebaseapp.com",
        projectId: "easyprepai",
        storageBucket: "easyprepai.appspot.com",
        messagingSenderId: "412431130469",
        appId: "1:412431130469:web:0f2d0156db899411500b8c",
        measurementId: "G-80HZG2RSCL"     
     };
      // Initialize Firebase
if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
}
     export{firebase} 