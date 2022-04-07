import { easyFire } from "../easyfirev0.5.js";
import {getHTML, addClick} from '../easyjsv0.0.9.js'
const firebaseConfig = {
    apiKey: "AIzaSyCEdemPQN_mTR607XNl-xyXcUpdgMnTB_Q",
    authDomain: "nouveau-62b29.firebaseapp.com",
    projectId: "nouveau-62b29",
    storageBucket: "nouveau-62b29.appspot.com",
    messagingSenderId: "576198271387",
    appId: "1:576198271387:web:73a5c94a418cf72208413e"
  };


  const {isLogin, saveContent, getToken} = easyFire(firebaseConfig)

  isLogin('./login.html')
  getToken.then((token) =>{console.log(token)})

  const title = getHTML('#title')
  const content = getHTML('#content')
  const btn = getHTML('#btn')

  addClick('#btn', function (e) {

   const article = {
       title : title.value, 
       content : content.value
   }

    const id = saveContent('articles',article )
    console.log('Id de mon article',id)
  })

 