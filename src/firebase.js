// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, setDoc} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxpo2Zqx1TK-_sRSebOSdghdG8cyLkEo8",
  authDomain: "remote-home-control-1d01c.firebaseapp.com",
  projectId: "remote-home-control-1d01c",
  storageBucket: "remote-home-control-1d01c.appspot.com",
  messagingSenderId: "64872750435",
  appId: "1:64872750435:web:bf64301957b6022cc08756",
  measurementId: "G-9KMGD17R27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

// get the switch boards
export async function getLayout() {
  const layoutCol = collection(db, "app_layout");
  const layoutSnapshot = await getDocs(layoutCol);
  const layouts = layoutSnapshot.docs.map(doc => {
    return {
      ...doc.data(),
      id: doc.id
    }
  })

  return layouts;
}


export async function getSwitches(board_id) {
  const switchDocRef = collection(db, "app_layout/"+board_id+"/switches");
  const switchSnap = await getDocs(switchDocRef);

  let switchList = []
  switchList = switchSnap.docs.map(doc => doc.data())
  
  return switchList;
}

export async function getServerStatus(server_id) {
  const serverDocRef = doc(db, server_id, "meta-data")
  const serverDocSnap = await getDoc(serverDocRef)

  const stats = serverDocSnap.data()
  return stats.status
}

export async function addSwitch(board_id, switchLabel, pinNumber, isDigital, mappedBoard, icon) {
  // using setDoc add a new document or use the existing document of switch for editing the
    // switch for which doc is used. USAGE: doc(db, "app_layout/roomId", "switchId")
    /**
     * Parameters are
     * - icon - none
     * - label
     * - mappedBoard - board01
     * - mappedPin - PIN_NUMBER
     * - type BINARY / ANALOG
     */
    const ref = collection(db, "app_layout/"+board_id+"/switches")
    await addDoc(ref, {
      icon: icon,
      label: switchLabel,
      mappedBoard: mappedBoard,
      mappedPin: pinNumber,
      type: isDigital ? "BINARY" : "ANALOG",
    })
}

export async function markAsUsed(board_id, pin_number) {
  const ref = doc(db, board_id+"/"+pin_number)
  await setDoc(ref, {
    
  })
}