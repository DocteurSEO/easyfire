import { easyFire } from "./easyfirev0.5.1.js";
import { getParam, getHTML, createHTML } from "./easyjsv0.0.9.js"

const firebaseConfig = {
  apiKey: "AIzaSyCEdemPQN_mTR607XNl-xyXcUpdgMnTB_Q",
  authDomain: "nouveau-62b29.firebaseapp.com",
  projectId: "nouveau-62b29",
  storageBucket: "nouveau-62b29.appspot.com",
  messagingSenderId: "576198271387",
  appId: "1:576198271387:web:73a5c94a418cf72208413e"
};
 
const {loadOneDoc} = easyFire (firebaseConfig)

const id = getParam('id')


async function displayContent(){
 const article = await loadOneDoc('articles', id)
  getHTML('h1').innerHTML = article.title
  const p = createHTML('p', {text:article.content})
  p.addTo('body')

}
 
displayContent()
