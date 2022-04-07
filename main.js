import { easyFire } from "./easyfirev0.5.js";
import { createHTML} from "./easyjsv0.0.9.js"

const firebaseConfig = {
  apiKey: "AIzaSyCEdemPQN_mTR607XNl-xyXcUpdgMnTB_Q",
  authDomain: "nouveau-62b29.firebaseapp.com",
  projectId: "nouveau-62b29",
  storageBucket: "nouveau-62b29.appspot.com",
  messagingSenderId: "576198271387",
  appId: "1:576198271387:web:73a5c94a418cf72208413e"
};
 
const { loadContent , getToken} = easyFire (firebaseConfig)




async function displayContent (){
 const data = await loadContent('articles')
 
 

 for (let article of data){
  const li = createHTML('li' )
  li.addTo('ul')
  li.html(`<a href='./article.html?id=${article.id}'>
  <h3>${article.data.title}</h3>
  
  <p>${article.data.content}</p>
  </a>
  `

  )
   
 }


  
}
 
displayContent ()