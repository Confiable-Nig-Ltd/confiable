// import { auth, db } from "./firebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { signInWithEmailAndPassword } from "firebase/auth";

// const registerUser = async (email, password, role) => {
//   try {
//     // Create user in Firebase Authentication
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Store role in Firestore
//     await setDoc(doc(db, "users", user.uid), {
//       email: user.email,
//       role: role
//     });

//     console.log("User registered successfully:", user);
//     return { success: true, user };
//   } catch (error) {
//     console.error("Error registering user:", error.message);
//     return { success: false, error: error.message };
//   }
// };


// const loginUser = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Fetch user role from Firestore
//     const userDoc = await getDoc(doc(db, "users", user.uid));
//     const userData = userDoc.data();

//     console.log("User logged in:", userData.role);
//     return { success: true, user, role: userData.role };
//   } catch (error) {
//     console.error("Login error:", error.message);
//     return { success: false, error: error.message };
//   }
// };

// export { registerUser, loginUser };

// // export default registerUser;



import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 


const registerUser = async (email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user role in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};


const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    return { success: true, user, role: userData.role };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { registerUser, loginUser };
