import { easyFire } from "../easyfirev0.5.1.js";
import {getHTML, addClick, redictUser, } from "../easyjsv0.0.9.js";
const firebaseConfig = {
    apiKey: "AIzaSyCEdemPQN_mTR607XNl-xyXcUpdgMnTB_Q",
    authDomain: "nouveau-62b29.firebaseapp.com",
    projectId: "nouveau-62b29",
    storageBucket: "nouveau-62b29.appspot.com",
    messagingSenderId: "576198271387",
    appId: "1:576198271387:web:73a5c94a418cf72208413e"
  };

const {login, getToken} = easyFire(firebaseConfig)
   
  const email = getHTML('#email')
  const password = getHTML('#password')
  const btn = getHTML('#btn')

 btn.addEventListener('click',async function(e){
    const uid = await login(email.value, password.value)

     if(uid){

      getToken.then(function(token){
        console.log(token)
      
        
        let myHeaders = new Headers();
        myHeaders.append("authorization",token); 
        myHeaders.append("Content-Type", "application/json");
        
        let raw = JSON.stringify({
          "name": "fin",
          "price": "71500",
          "level": " super service"
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };
        
        fetch("http://localhost:3002/formations", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))








      })
        //redictUser('./admin.html')
     }
 })






 