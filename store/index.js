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
    pegawai(state) {
      return ( state.auth.user ) ? ( state.auth.user.pegawai ) : null 
    },
    photo(state) {
      return ( state.auth.user.pegawai ) ? ( state.auth.user.pegawai.photo ) : '/img/user.png' 
    },
    nama_lengkap(state) {
      return ( state.auth.user.pegawai ) ? ( state.auth.user.pegawai.nama_lengkap ) : 'anonim' 
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


