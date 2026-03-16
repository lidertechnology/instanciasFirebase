import { Injectable }                                                                         from '@angular/core';
import { Analytics, getAnalytics }                                                            from 'firebase/analytics';
import { Auth, browserLocalPersistence, getAuth, setPersistence }                             from 'firebase/auth';
import { Firestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getMessaging, Messaging }                                                            from 'firebase/messaging';
import { FirebasePerformance, getPerformance }                                                from 'firebase/performance';
import { FirebaseStorage, getStorage }                                                        from 'firebase/storage';
import { FirebaseApp, initializeApp }                                                         from 'firebase/app';
import { getAI, getGenerativeModel, AI, GenerativeModel, VertexAIBackend }                    from 'firebase/ai';
import { environment }                                                                        from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstanciaFirebase {

  private app:        FirebaseApp;

  public auth:        Auth;
  public firestore:   Firestore;
  public storage:     FirebaseStorage;
  public messaging:   Messaging;
  public analytics:   Analytics;
  public performance: FirebasePerformance;
  public vertexAI:    AI;
  public modeloIA:    GenerativeModel;

  constructor() {
    const config     = environment.firebaseConfig;
    this.app         = initializeApp(config);

    // ── SERVICIOS BASE ─────────────────────────────────────────────────────────

    this.auth         = getAuth             (this.app); this.firestore   = initializeFirestore(this.app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
    this.storage      = getStorage          (this.app);
    this.messaging    = getMessaging        (this.app);
    this.analytics    = getAnalytics        (this.app);
    this.performance  = getPerformance      (this.app);
    this.vertexAI     = getAI               (this.app, { backend: new VertexAIBackend('us-central1') });
    this.modeloIA     = getGenerativeModel  (this.vertexAI, { model: 'gemini-2.5-flash-lite',  generationConfig: { maxOutputTokens: 400, temperature: 0.7 }  });

    // ── PERSISTENCIA ───────────────────────────────────────────────────────────
    setPersistence(this.auth, browserLocalPersistence).then(() => {}).catch(() => {});
  }

}

