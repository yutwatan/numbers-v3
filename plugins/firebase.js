import firebase from 'firebase/app';
import config from '~/firebase.config';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const authProviders = {
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  Twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  Github: firebase.auth.GithubAuthProvider.PROVIDER_ID,
  Phone: firebase.auth.PhoneAuthProvider.PROVIDER_ID
};

export const auth = firebase.auth();
