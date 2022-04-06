import {easyFire} from 'https://cdn.jsdelivr.net/gh/DocteurSEO/easyfire@master/firebase.js'

const firebaseConfig = {
    apiKey: "AIzaSyCEdemPQN_mTR607XNl-xyXcUpdgMnTB_Q",
    authDomain: "nouveau-62b29.firebaseapp.com",
    projectId: "nouveau-62b29",
    storageBucket: "nouveau-62b29.appspot.com",
    messagingSenderId: "576198271387",
    appId: "1:576198271387:web:73a5c94a418cf72208413e"
  };

  const {saveContent} = easyFire(firebaseConfig)


  l saveContent({name:'salut'})