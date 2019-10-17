import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
    // Project Settings => Add Firebase to your web app
    messagingSenderId: "345561780700"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
    // Project Settings => Cloud Messaging => Web Push certificates
    "BEEO-sYoFUH7FYyczaPPdK6ZX-FQb6YvcCMgaCFVcbcTQ4Uz8udeD7ahuKlX68OBU8w5TSW7naWuWM0me1qBQGw"
);
export { messaging };