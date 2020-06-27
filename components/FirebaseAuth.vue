<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import { auth, authProviders } from '~/plugins/firebase';

export default {
  name: 'FirebaseAuth',
  mounted() {
    const firebaseui = require('firebaseui');
    auth.onAuthStateChanged((user) => {
      if (!user) {
        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(auth);

        const uiConfig = {
          signInOptions: [
            authProviders.Email,
            authProviders.Google,
            authProviders.Facebook,
            authProviders.Github,
            {
              provider: authProviders.Phone,
              defaultCountry: 'JP'
            },
            'apple.com',
            'yahoo.com',
            'microsoft.com'
          ],
          callbacks: {
            /*
            // for CORS error at Nuxt local server (production では不要)
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              // window.location.href = '/';
              return true;
              // return false; // false で signInSuccessUrl にリダイレクトしない
            }
            uiShown: () => {
              document.getElementById('loader').style.display = 'none';
            }
             */
          },
          // signInFlow: 'popup',
          signInSuccessUrl: '/'
        };

        ui.start('#firebaseui-auth-container', uiConfig);
      } else {
        const routeName = this.$route.query.routeName;
        if (routeName) {
          const path = routeName === 'index' ? '' : routeName;
          this.$router.push('/' + path);
        }
      }
    });
  }
};
</script>

<style scoped></style>
