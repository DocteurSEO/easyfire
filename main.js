//@ts-check
import {easyFire} from './easyfirev0.5.js'

const firebaseConfig = {
    apiKey: "AIzaSyCEdemPQN_mTR607XNl-xyXcUpdgMnTB_Q",
    authDomain: "nouveau-62b29.firebaseapp.com",
    projectId: "nouveau-62b29",
    storageBucket: "nouveau-62b29.appspot.com",
    messagingSenderId: "576198271387",
    appId: "1:576198271387:web:73a5c94a418cf72208413e"
  };

  const {login,saveContent, updateContent, isLogin, loadContent, loadOneDoc,deleteContent  } = easyFire(firebaseConfig)

  //saveContent('Formation', {name: 'Formation', price:'15155€'})

  //updateContent('Formation','xzoBYhvUxuD1ttJxKyEO', {price: '150€'})

  //isLogin('https:google.com')


  
  //deleteContent ('Formation', 'V7gQB312LTMPjyA8JAoN')
 