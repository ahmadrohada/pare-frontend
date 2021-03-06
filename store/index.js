export const getters = {
    user(state) {
      return state.auth.user
    },
    user_id(state) {
      return state.auth.user.id
    },
    nip(state) {
      return ( state.auth.user ) ? ( state.auth.user.nip ) : null  
    },
    roles(state) {
      return  ( state.auth.user ) ? ( state.auth.user.roles ) : null  
    },
    pegawai(state) {
      return ( state.auth.user ) ? ( state.auth.user ) : null 
    },
    id_skpd(state) {
      return ( state.auth.user.skpd ) ? ( state.auth.user.skpd.id ) : null  
    },
    photo(state) {
      return ( state.auth.user.photo ) ? ( state.auth.user.photo ) : '/img/user.png' 
    },
    nama_lengkap(state) {
      return ( state.auth.user.nama_lengkap ) ? ( state.auth.user.nama_lengkap ) : 'anonim' 
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


