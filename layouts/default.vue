<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pa-2">
          <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon
              >mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon
            >
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" color="teal darken-1" fixed app dark>
      <v-app-bar-nav-icon class="mr-1" @click.stop="drawer = !drawer" />
      <v-divider vertical></v-divider>
      <v-toolbar-title class="pl-3" v-text="title" />

      <v-spacer />

      <v-btn text fab height="48" width="48" class="mx-2" to="/help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
      <v-menu v-if="isAuthenticated" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-if="isAuthenticated && user.photoURL">
            <v-img
              :src="user.photoURL"
              :alt="user.displayName"
              v-bind="attrs"
              v-on="on"
            />
          </v-avatar>
          <v-btn
            v-if="isAuthenticated && !user.photoURL"
            text
            v-bind="attrs"
            v-on="on"
            >{{ user.displayName }}</v-btn
          >
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in profileItems"
            :key="index"
            @click="triggerClick(item.clickAction)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-if="!isAuthenticated" text to="/login">ログイン</v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" color="primary" app dark>
      <span>&copy; {{ new Date().getFullYear() }} yutwatan</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-numeric-3-box-multiple',
          title: 'Numbers 3',
          to: '/numbers3'
        },
        {
          icon: 'mdi-numeric-4-box-multiple',
          title: 'Numbers 4',
          to: '/numbers4'
        },
        {
          icon: 'mdi-calendar-month',
          title: 'Calendar',
          to: '/calendar'
        },
        {
          icon: 'mdi-help',
          title: 'Help',
          to: '/help'
        }
      ],
      profileItems: [
        { title: 'ユーザ情報', clickAction: 'userInfo' },
        { title: 'ログアウト', clickAction: 'logout' }
      ],
      miniVariant: false,
      title: 'Numbers 可視化・分析ツール'
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', {
      logout: async (dispatch) => {
        await dispatch('signOut');
        console.log('ログアウト完了');
      }
    }),
    triggerClick(action) {
      if (action === 'userInfo') {
        this.moveUserInfo();
      } else if (action === 'logout') {
        this.logout();
      }
    },
    moveUserInfo() {
      this.$router.push('/profile');
    }
  }
};
</script>
