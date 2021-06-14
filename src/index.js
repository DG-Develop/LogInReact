import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
//import { Router } from 'react-router-dom'
import App from './routes/App'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from '../firebase-config'

ReactDOM.render((
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Suspense fallback={'Conectado la app...'}>
            <App />
        </Suspense>
    </FirebaseAppProvider>
), document.getElementById('app'))