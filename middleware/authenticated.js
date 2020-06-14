import { auth } from '~/plugins/firebase';

export default function({ store, route, redirect }) {
  auth.onAuthStateChanged((user) => {
    console.log('isLogin = ' + store.getters['auth/isAuthenticated']);
    console.log(user);

    if (user) {
      console.log(user);

      const {
        uid,
        email,
        emailVerified,
        isAnonymous,
        phoneNumber,
        photoURL,
        refreshToken,
        displayName
      } = user;

      store.dispatch('auth/setUser', {
        uid,
        email,
        emailVerified,
        isAnonymous,
        phoneNumber,
        photoURL,
        refreshToken,
        displayName
      });

      console.log(route.name);
      if (route.name === 'login') {
        redirect('/');
      }
    } else {
      redirect('/login');
    }
  });
}
