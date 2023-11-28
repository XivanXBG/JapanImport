import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    doc,
    getDoc,
    setDoc,

    updateDoc,
    DocumentData
} from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    updateMetadata,
    uploadBytes
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUNhoi4OMYsxKDH9gjC7xa2oSv7_zBcpI",
    authDomain: "j-import.firebaseapp.com",
    databaseURL: "https://j-import-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "j-import",
    storageBucket: "j-import.appspot.com",
    messagingSenderId: "237641535107",
    appId: "1:237641535107:web:9978e176e2b70fb43e55b6",
    measurementId: "G-FPS8R06VC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Initialize Firestore Database
const db = getFirestore(app);

export const loadCars = async () => {
    const carsCollection = await collection(db, 'cars')
    const snapshot = await getDocs(carsCollection);

    // Extract the data from the documents
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    
    return data
}



// export const uploadDataToFirestore = async (dataArray) => {
//     const carsCollection = collection(db, "cars");

//     try {
//         // Loop through the array and upload each item to Firestore with a specific ID
//         for (const dataItem of dataArray) {
//             const { specificID, ...restOfData } = dataItem;

//             // Reference to a specific document using the specific ID
//             const docRef = doc(carsCollection, specificID);

//             // Set data for the specific document
//             await setDoc(docRef, restOfData);
//         }

//         console.log("Data uploaded successfully!");
//     } catch (error) {
//         console.error("Error uploading data:", error);
//         throw error;
//     }
// };

// // Example usage:
// const dataArray = [
   
//     { specificID: "Mitsubishi", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/2381px-Mitsubishi_logo.svg.png', models: ['Lancer', 'Outlander', 'Pajero', 'Galant', 'Mirage'] },
//     { specificID: "Nissan", image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_logo.png', models: ['Altima', 'Maxima', 'Rogue', 'GT-R', '370Z'] },
//     { specificID: "Toyota", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Toyota_EU.svg/2560px-Toyota_EU.svg.png', models: ['Camry', 'Corolla', 'Rav4', 'Prius', 'Highlander'] },
//     { specificID: "Honda", image: 'https://purepng.com/public/uploads/large/purepng.com-honda-car-logologocar-brand-logoscarshonda-car-logo-1701527428101lhn2z.png', models: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Fit'] },
//     { specificID: "Mazda", image: 'https://1000logos.net/wp-content/uploads/2019/12/Mazda_Logo.png', models: ['Mazda3', 'Mazda6', 'RX-7', 'MX-5 Miata', 'CX-9'] },
//     { specificID: "Subaru", image: 'https://1000logos.net/wp-content/uploads/2018/03/Subaru-Logo-1999.jpg', models: ['Outback', 'Forester', 'Impreza', 'Legacy', 'BRZ'] },
//     { specificID: "Suzuki", image: 'https://e7.pngegg.com/pngimages/1012/147/png-clipart-suzuki-car-logo-subaru-suzuki-angle-logo.png', models: ['Swift', 'Vitara', 'Jimny', 'Ciaz', 'Baleno'] },
//     { specificID: "Lexus", image: 'https://tmna.aemassets.toyota.com/is/image/toyota/lexus/images/brand/Lexus_logo_4E4ABD922583A135140CD1AC3C6CAFF83B074DF4-864x600.jpg?wid=680&hei=452', models: ['ES', 'RX', 'IS', 'LS', 'NX'] },
//     // Add more items as needed
// ];

// uploadDataToFirestore(dataArray);