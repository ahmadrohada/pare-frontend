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
    authenticated(state){
      return state.loggedIn;
    },

}