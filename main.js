import {easyFire} from './firebase.js'



const firebaseConfig = {
    apiKey: "AIzaSyBxRQQY2DyBYIdeRoqvWKEVsS1xbLWtqwY",
    authDomain: "questionapp-6a0dd.firebaseapp.com",
    projectId: "questionapp-6a0dd",
    storageBucket: "questionapp-6a0dd.appspot.com",
    messagingSenderId: "357758807991",
    appId: "1:357758807991:web:d8d29097f02ed437dec232"
  };

const {saveContent}  = easyFire(firebaseConfig)
 
saveContent({name:'super'})
