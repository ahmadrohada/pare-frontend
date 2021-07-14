export const getters = {
    user(state) {
      return state.auth.user.pegawai
    },
    nip(state) {
      return state.auth.user.pegawai.nip
    },
    
    isLoggedIn(state) {
      return state.auth.loggedIn
    },
    authenticated(state){
      return state.loggedIn;
    },

}

export const mutations = {
  SET_LOGIN(state, data) {
    state.auth.loggedIn = data
  },
  GET_DATA(state,payload){
    //state.singleView =false
    state.auth.user = payload
  },
}
