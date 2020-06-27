<template>
  <v-container>
    <h1>ユーザ情報</h1>
    <v-card class="mx-auto" max-width="400">
      <v-list-item>
        <v-list-item-avatar size="64">
          <v-img :src="user.photoURL" :alt="user.displayName"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{
            user.displayName
          }}</v-list-item-title>
          <v-list-item-subtitle
            >by {{ user.providerData[0].providerId }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-card-text>
        <v-list two-line>
          <v-list-item v-for="(item, index) in userInfo" :key="index">
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.value"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Profile',
  data() {
    return {
      userInfo: []
    };
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  mounted() {
    if (this.user) {
      this.userInfo = [
        {
          title: 'メールアドレス',
          value: this.user.email
        },
        {
          title: '確認済みメールアドレス',
          value: this.user.emailVerified ? 'はい' : 'いいえ'
        },
        {
          title: '電話番号',
          value: this.user.phoneNumber
        },
        {
          title: 'User ID',
          value: this.user.providerData[0].uid
        }
      ];
    }
  }
};
</script>

<style scoped></style>
