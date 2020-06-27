import { auth } from '~/plugins/firebase';

export const state = () => ({
  user: null
});

export const getters = {
  isAuthenticated: (state) => state.user !== null
};

export const actions = {
  async signOut({ commit }) {
    console.log('ログアウトします');
    await auth.signOut();
    commit('setUser', null);
  },

  setUser({ commit }, user) {
    commit('setUser', user);
  }
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};
