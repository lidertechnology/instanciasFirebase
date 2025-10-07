import { Injectable } from '@angular/core';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getMessaging, Messaging } from "firebase/messaging";
import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebasePerformance, getPerformance } from "firebase/performance"; 

const app = initializeApp(environment.firebaseConfig);

@Injectable({  providedIn: 'root'})

export class Instancias {
  
  public auth: Auth = getAuth(app);
  public firestore: Firestore = getFirestore(app);
  public storage: FirebaseStorage = getStorage(app);
  public messaging: Messaging = getMessaging(app);
  public analytics: Analytics = getAnalytics(app);
  public performance: FirebasePerformance = getPerformance(app);

}
