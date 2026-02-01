import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
// Importaciones modernas para Firestore con persistencia y configuración de cache
import { Firestore, initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { Messaging, getMessaging } from 'firebase/messaging';
import { FirebasePerformance, getPerformance } from 'firebase/performance';

import { FIREBASE_CONFIG } from '../../firebase.config';

@Injectable({ providedIn: 'root' })
export class InstanciaFirebase {
  public readonly app: FirebaseApp;
  public readonly firestore: Firestore;
  public readonly auth: Auth;
  public readonly storage: FirebaseStorage;
  public readonly analytics: Analytics | null = null;
  public readonly messaging: Messaging | null = null;
  public readonly performance: FirebasePerformance | null = null;

  constructor() {
    this.app = initializeApp(FIREBASE_CONFIG);
    this.auth = getAuth(this.app);
    this.storage = getStorage(this.app);

    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      // --- MÉTODO MODERNO PARA ACTIVAR PERSISTENCIA CON CACHE CONFIGURABLE ---
      this.firestore = initializeFirestore(this.app, {
        localCache: persistentLocalCache({
          /**
           * Establece el tamaño de la caché en disco. 
           * - Valor por defecto: 100 MB (100 * 1024 * 1024)
           * - Valor mínimo: 1 MB (1 * 1024 * 1024)
           * - Para "ilimitado": CACHE_SIZE_UNLIMITED
           * Aquí lo configuramos a 150 MB como ejemplo.
           */
          cacheSizeBytes: 150 * 1024 * 1024, 
        })
      });
      console.log('Firestore initialized with a 150MB offline persistence cache.');
      
      this.analytics = getAnalytics(this.app);
      this.messaging = getMessaging(this.app);
      this.performance = getPerformance(this.app);

    } else {
      // Para entornos de servidor (SSR), inicializamos sin persistencia.
      this.firestore = initializeFirestore(this.app, {});
      console.log('Firestore initialized for server (no persistence).');
    }
  }
}
