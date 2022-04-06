
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged,createUserWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { addDoc, collection, getFirestore, getDocs, getDoc , doc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"; 

export function easyFire (firebaseConfig){
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore(app);


/**
 * It logs in a user with an email and password.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 */
function login (email, password) {
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('firebase ok : ',user.uid)
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error')
  });


}

/**
 * It creates a new user with the email and password.
 * @param {string} email - The email address of the user.
 * @param  {string} password - The password for the new user.
 */
function createUser (email, password){

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('new user : ', user.uid)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log('ooops ! ')
    });

}





async function saveContent(nameCollection,content){

  
        const docRef = await addDoc(collection(db, nameCollection),content);
          console.log("Document written with ID: ", docRef.id)
    
          localStorage.setItem( docRef.id, JSON.stringify(content))
    
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
 function isLogin(url){
       
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid)
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
 * @returns An array of objects. Each object has an id and data property. The data
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
 * @returns The document data.
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
      
  async function deleteContent (nameCollection,id){
        await deleteDoc(doc(db, nameCollection, id));
      }
      
  async function updateContent (nameCollection,id, content){
      
        await setDoc(doc(db, nameCollection, id),content);
        
      
      }
       





    

    return {
        login,
        createUser, 
        saveContent, 
        deleteContent, 
        loadOneDoc, 
        loadContent, 
        updateContent, 
        isLogin



    }

}
// Initialize Firebase

// const db = getFirestore(app);





// const auth = getAuth();

// export function login (email, password) {
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user.uid)
//     window.location.href='../back-office/admin.html'
    
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log('error')
//   });


// }




 

// export function isLogin(){
 
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     console.log(uid)
//     // ...
//   } else {
//     // User is signed out
//     // ...
//     console.log('voleur ! ')
//     window.location.href = './login.html'
//   }
// });

// }
 

// export async function saveContent(content){




//     const docRef = await addDoc(collection(db, "articles"),content);
//       console.log("Document written with ID: ", docRef.id)

//       localStorage.setItem( docRef.id, JSON.stringify(content))

// }

// export async function loadContent(){
//     const querySnapshot = await getDocs(collection(db, "articles"));
//     const articles = []
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       const article= {
//           id:  doc.id, 
//           data : doc.data(), 
         
//       }
//       articles.push(article)
      
      


//     });

//     return  articles
// }



// export async function loadOneDoc(id){


//   const docRef = doc(db, "articles", id);
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   return docSnap.data()
// } else {
//   // doc.data() will be undefined in this case
//   return "No such document!"
// }
// }

// export async function deleteContent (id){
//   await deleteDoc(doc(db, "articles", id));
// }

// export async function updateContent (id, content){

//   await setDoc(doc(db, "articles", id),content);
  

// }
 