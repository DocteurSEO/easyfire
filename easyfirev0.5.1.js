
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getIdToken ,getAuth, signInWithEmailAndPassword , onAuthStateChanged,createUserWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {updateDoc ,addDoc, collection, getFirestore, getDocs, getDoc , doc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"; 



function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


function validatePassword(password){
 const pass = String(password).length
 if(pass < 6){
   return false
 }
  return true 
}  


 

function logAndReturnError(text){
  console.log(text)
  return text
}



 
 
 
export function easyFire (firebaseConfig){
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore(app);
    


/**
 * logs in a user with an email and password.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 */
function login (email, password) {

  if(!validateEmail(email)){
    console.log('Please enter a valid email !')
    return 'Please enter a valid email ! '
  }

  if(!validatePassword(password)){
    console.log('invalid password must be at least 6 characters')
    return ' invalid password must be at least 6 characters'
  }
   
  
return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('firebase ok : ',user.uid)
    
    return user.uid
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log('Error Firebase : ', errorCode)
    return 'Error Firebase : ', errorCode
  });


}

/**
 * It creates a new user with the email and password.
 * @param {string} email - The email address of the user.
 * @param  {string} password - The password for the new user.
 */
function createUser (email, password){
  if(!validateEmail(email)){
    console.log('Please enter a valid email !')
    return 'Please enter a valid email ! '
  }

  if(!validatePassword(password)){
    console.log('invalid password must be at least 6 characters')
    return ' invalid password must be at least 6 characters'
  }
   return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
     
      console.log('new user UID : ', user.uid)
      return user.uid
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode)
      return errorCode
    });

}





/**
 * This function saves the content in the Firestore database.
 * @param {string} nameCollection - The name of the collection you want to save 
 * @param {Object}[content] - The object you want to save.
 * @returns {string} The id of the document that was created.
 */
async function saveContent(nameCollection,content={}){

  if (!nameCollection) {
   console.log("invalid name collection")
   return "invalid name collection"
  }

  if(typeof content != 'object'){
    console.log('Please enter an object !')
    return 'Please enter an object !'
  }
  const collectionName = String(nameCollection)

        const docRef = await addDoc(collection(db, collectionName),content);
          console.log("Document written with ID: ", docRef.id)
          return docRef.id 
    
    }
    

 
/**
 * The function isLogin(url) is a function that takes a url as an argument. 
 * It then calls the onAuthStateChanged function, which is a function that takes a
 * function as an argument. 
 * The function passed to onAuthStateChanged is a callback function that is called
 * when the user is logged in or out. 
 * If the user is logged in, the function will return the user's uid. 
 * If the user is logged out, the function will redirect the user to the url passed
 * as an argument to the isLogin function
 * @param {string} url - The URL to redirect to when the user is not signed in.
 */
 async function isLogin(url){
       
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          

          
          return  uid 
          // ...
        } else {
          // User is signed out
          // ...
          console.log('voleur ! ')
          window.location.href = url
        }
      });
      
      }
       
/**
 * This function takes in a collection name and returns a list of articles
 * @param {string} nameCollection - The name of the collection you want to query.
 * @returns {{Array.<{id: string, data: Array}>}} An array of objects. Each object has an id and data property. The data
 * property is an object with the data for the article.
 */
 async function loadContent(nameCollection){
          const querySnapshot = await getDocs(collection(db, nameCollection));
          const articles = []
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const article= {
                id:  doc.id, 
                data : doc.data(), 
               
            }
            articles.push(article)
            
            
      
      
          });
      
          return  articles
      }
      
      
      
/**
 * Given a collection name and an id, return the document data
 * @param {string} nameCollection - The name of the collection you want to query.
 * @param {string} id - The document ID.
 * @returns {Object}The document data.
 */
async function loadOneDoc(nameCollection,id){
      
      
      const docRef = doc(db, nameCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        // doc.data() will be undefined in this case
        return "No such document!"
      }
      }
      
 /**
  * Delete a document from a collection
  * @param {string} nameCollection - The name of the collection you want to delete from.
  * @param {string} id - The id of the document you want to delete.
  */
  async function deleteContent (nameCollection,id){
        await deleteDoc(doc(db, nameCollection, id));
      }
      
 /**
  * It updates the content of a document in a collection.
  * @param {string}  nameCollection - the name of the collection you want to update
  * @param {string}  id - The id of the document you want to update.
  * @param {Object} content - The content of the document you want to update.
  */
  async function updateContent (nameCollection,id, content){
      
        await updateDoc(doc(db, nameCollection, id),content);
        
      
      }
       

/* get firebase user Token */
  const getToken = new Promise((resolve, reject) => {
   
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { currentUser } = auth
        const token = await getIdToken(currentUser, true)
      
        resolve(token) 
      }})
   
  });



 
 

    

    return {
        login,
        createUser, 
        saveContent, 
        deleteContent, 
        loadOneDoc, 
        loadContent, 
        updateContent, 
        isLogin, 
        getToken



    }

}