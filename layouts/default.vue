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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />

      <v-spacer />

      <v-btn text to="/help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" text>{{ user.displayName }}</v-btn>
      <v-btn v-if="!isAuthenticated" text to="/login">ログイン</v-btn>
      <v-btn v-if="isAuthenticated" text @click="logout">ログアウト</v-btn>
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
      drawer: true,
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
          icon: 'mdi-help',
          title: 'Help',
          to: '/help'
        }
      ],
      miniVariant: false,
      title: 'Numbers 可視化・分析ツール'
    };
  },
  computed: {
    // ...mapState('auth', ['user']),
    ...mapState('auth', {
      user: (state) => state.user
    }),
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
};
</script>
