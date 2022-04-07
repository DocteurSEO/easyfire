import { easyFire } from "../easyfirev0.5.js";
import {getHTML, addClick, createHTML} from '../easyjsv0.0.9.js'
const firebaseConfig = {
    apiKey: "AIzaSyCEdemPQN_mTR607XNl-xyXcUpdgMnTB_Q",
    authDomain: "nouveau-62b29.firebaseapp.com",
    projectId: "nouveau-62b29",
    storageBucket: "nouveau-62b29.appspot.com",
    messagingSenderId: "576198271387",
    appId: "1:576198271387:web:73a5c94a418cf72208413e"
  };
let mode = 'ajouter'
let id = null
  const {isLogin, saveContent, loadContent, deleteContent, updateContent} = easyFire(firebaseConfig)

  isLogin('./login.html')
   

  const title = getHTML('#title')
  const content = getHTML('#content')
  const btn = getHTML('#btn')

  addClick('#btn', function (e) {


    const article = {
           title : title.value, 
           content : content.value
       }

    console.log(mode)

    if(mode ==='modif'){

      updateContent('articles', id,article)

      btn.textContent = 'Ajouter un Article'
      btn.classList.remove('modif')
      id = ''
      
      
      mode = 'ajouter'
     

    }
    else{
      

      saveContent('articles',article )
     
    }

    displayContent ()

  //  const article = {
  //      title : title.value, 
  //      content : content.value
  //  }

    
  })

 getHTML('body').addEventListener('dblclick', function(e){
   e.target.closest('li').remove()
   deleteContent('articles',e.target.closest('li').id)
 })


 getHTML('body').addEventListener('click', function(e){
 
 
 if(e.target.closest('li')){
 getHTML('h2').textContent = 'Mode Modification'

 title.value = e.target.closest('li').querySelector('h3').textContent 
 content.value = e.target.closest('li').querySelector('p').textContent  
 btn.textContent = 'Modifier'
 btn.className = 'modif'
 id = e.target.closest('li').id
 console.log(id)
 
 mode = 'modif'
}
})





  async function displayContent (){
    const data = await loadContent('articles')
    getHTML('ul').innerHTML = ''
    
   
    for (let article of data){
     const li = createHTML('li' )
     li.addTo('ul')
     li.html(` 

     <h3>${article.data.title}</h3>
     
     <p>${article.data.content}</p>
      
     `
   
     )

     li.id(article.id)
      
    }
   
   
     
   }
    
   displayContent ()