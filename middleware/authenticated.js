import { auth } from '~/plugins/firebase';

export default function({ store, route, redirect }) {
  if (!store.getters['auth/isAuthenticated']) {
    auth.onAuthStateChanged((user) => {
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

        if (route.name === 'login') {
          redirect('/');
        }
      } else if (route.name && route.name !== 'login') {
        redirect('/login?routeName=' + route.name);
      } else {
        console.log('============＼(^o^)／=============');
        // redirect('/login');
      }
    });
  }
}
