import { Injectable } from '@angular/core';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { Auth, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { Firestore, getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getMessaging, Messaging } from 'firebase/messaging';
import { FirebasePerformance, getPerformance } from 'firebase/performance';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { environment } from '../../environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class InstanciaFirebase {
  private app: FirebaseApp;
  
  public auth: Auth;
  public firestore: Firestore;
  public storage: FirebaseStorage;
  public messaging: Messaging;
  public analytics: Analytics;
  public performance: FirebasePerformance;

  
    constructor() {
      this.app = initializeApp(environment.firebaseConfig);
  
      this.auth = getAuth(this.app);
      this.firestore = initializeFirestore(this.app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
      this.storage = getStorage(this.app);
      this.messaging = getMessaging(this.app); 
      this.analytics = getAnalytics(this.app);
      this.performance = getPerformance(this.app);
  
      setPersistence(this.auth, browserLocalPersistence).then(() => {}).catch(() => {});
    }
}
