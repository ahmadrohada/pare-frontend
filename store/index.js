export const getters = {
    user(state) {
      return state.auth.user.user
    },
    nip(state) {
      return state.auth.user.user.nip
    },
    
    isLoggedIn(state) {
      return state.auth.loggedIn
    },

    userRole(state) {
      return state.auth.user.role
    },

    authenticated(state){
      return state.loggedIn;
    },
    user(state){
        return state.user;
    },
    userRole(state) {
        return state.user.role
    }

}

export const state = () => ({
  busy: false,
  loggedIn: false,
  strategy: 'local',
  user:false
});