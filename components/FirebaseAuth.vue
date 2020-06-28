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
            authProviders.Google,
            authProviders.Facebook,
            authProviders.Twitter,
            authProviders.Github,
            'yahoo.com',
            authProviders.Email
            /*
            {
              provider: authProviders.Phone,
              defaultCountry: 'JP'
            },
            */
            // 'apple.com',
            // 'microsoft.com'
          ],
          callbacks: {},
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
