
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged,  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { addDoc, collection, getFirestore, getDocs, getDoc , doc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"; 

export function  easyFire (firebaseConfig){

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





const auth = getAuth();

 function login (email, password) {
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.uid)
    window.location.href='../back-office/admin.html'
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error')
  });


}




 

 function isLogin(){
 
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
    window.location.href = './login.html'
  }
});

}
 

 async function saveContent(content){




    const docRef = await addDoc(collection(db, "articles"),content);
      console.log("Document written with ID: ", docRef.id)

      localStorage.setItem( docRef.id, JSON.stringify(content))

}

 async function loadContent(){
    const querySnapshot = await getDocs(collection(db, "articles"));
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



 async function loadOneDoc(id){


  const docRef = doc(db, "articles", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  return docSnap.data()
} else {
  // doc.data() will be undefined in this case
  return "No such document!"
}
}

 async function deleteContent (id){
  await deleteDoc(doc(db, "articles", id));
}

 async function updateContent (id, content){

  await setDoc(doc(db, "articles", id),content);
  

}
 
  return {
    updateContent, 
    deleteContent, 
    loadOneDoc,
    loadContent,
    saveContent,
    isLogin, 
    login

  }


}