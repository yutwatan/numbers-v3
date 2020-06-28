<template>
  <v-container>
    <h1>ユーザ情報</h1>
    <v-card class="mx-auto" max-width="400">
      <v-list-item>
        <v-list-item-avatar size="64" color="accent">
          <v-img
            v-if="user.photoURL"
            :src="user.photoURL"
            :alt="user.displayName"
          ></v-img>
          <span
            v-if="!user.photoURL"
            class="white--text headline"
            v-text="avatarText"
          ></span>
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
      userInfo: [],
      avatarText: ''
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
          value: this.user.providerData[0].email
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

      if (!this.user?.phoneNumber) {
        this.avatarText = this.getAvatarText(this.user?.displayName);
      }
    }
  },
  methods: {
    getAvatarText: (displayName) => {
      if (displayName.includes(' ')) {
        const names = displayName.split(' ');
        const firstNameChars = names[0].split('');
        const lastNameChars = names[1].split('');
        return firstNameChars[0] + lastNameChars[0];
      } else {
        const nameChars = displayName.split('');
        return nameChars[0] + nameChars[0];
      }
    }
  }
};
</script>

<style scoped></style>
