import React from 'react';
import firebase from 'firebase/app';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {
  firebaseReducer,
  ReactReduxFirebaseProvider
} from 'react-redux-firebase';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux';
import {
  createFirestoreInstance,
  firestoreReducer
} from 'redux-firestore';
import thunk from 'redux-thunk';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import App from './App';
import authReducer from './state/reducers/authReducer';
import messageReducer from './state/reducers/msgReducer';
import taskReducer from './state/reducers/taskReducer';
import todoReducer from './state/reducers/todoReducer';
const middleware = [thunk];

// reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  authentication: authReducer,
  tasks: taskReducer,
  todos: todoReducer,
  messages: messageReducer
});

// store
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
        traceLimit: 25
      })
  )
);

// firebase
const fbConfig = {
  apiKey: 'AIzaSyBIh6niG-zICAKI5OpZwdfMxZcz85OJGME',
  authDomain: 'todo-app-rct-7c07e.firebaseapp.com',
  databaseURL:
    'https://todo-app-rct-7c07e-default-rtdb.firebaseio.com',
  projectId: 'todo-app-rct-7c07e',
  storageBucket: 'todo-app-rct-7c07e.appspot.com',
  messagingSenderId: '310894741066',
  appId: '1:310894741066:web:1459ba9034c095e26408b3',
  measurementId: 'G-6YHDNZD1EL'
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);
// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

export const onAuthStateChange = () => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log(user);
    } else {
      console.log('The user is not logged in');
    }
  });
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
