export const getters = {
    user(state) {
      return state.auth.user
    },
    nip(state) {
      return ( state.auth.user ) ? ( state.auth.user.nip ) : null  
    },
    roles(state) {
      return  ( state.auth.user ) ? ( state.auth.user.roles ) : null  
    },
    profile(state) {
      return ( state.auth.user ) ? ( state.auth.user.profile ) : null 
    },
    photo(state) {
      return ( state.auth.user.profile ) ? ( state.auth.user.profile.photo ) : '/img/user.png' 
    },
    nama_lengkap(state) {
      return ( state.auth.user.profile ) ? ( state.auth.user.profile.pegawai ) : 'anonim' 
    },
    isLoggedIn(state) {
      return state.auth.loggedIn
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
