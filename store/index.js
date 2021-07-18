export const getters = {
    pegawai(state) {
      return state.auth.user.pegawai
    },
    user(state) {
      return state.auth.user
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
    roles(state) {
      return state.auth.user.roles
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
