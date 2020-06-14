<template>
  <v-container>
    <h1>ログイン</h1>
    <firebase-auth></firebase-auth>
  </v-container>
</template>

<script>
import FirebaseAuth from '~/components/FirebaseAuth';

export default {
  name: 'Login',
  components: {
    FirebaseAuth
  }
};
</script>

<style scoped></style>
