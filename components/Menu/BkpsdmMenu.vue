<template>
  <div>
       <sidebar-item 
          :link="{
            name: $t('sidebar.adminBkpsdm'),
            icon: 'fa fa-columns',
            path: '/dashboard'
          }"
        >
      </sidebar-item>
        <div class="dropdown-divider"></div>
        <sidebar-item 
          :link="{
            name: $t('sidebar.pegawai'),
            icon: 'fa fa-users',
            path: '/bkpsdm/pegawai'
          }"
        >
        </sidebar-item>
        

        
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "DashboardMenu",
  data(){
    return{
      isAdminSkpd: false,
      isPersonal : false,
      isAdminBkpsdm : false,
      roles:"",

    } 
  },
  methods: {
    functionAdminSkpd(roles) {
     for(var i=0; i < roles.length; i++){
        if( roles[i].role_id == 2){
          return true
        }
      }
      return false
    },
    functionPersonal(roles) {
     for(var i=0; i < roles.length; i++){
        if( roles[i].role_id == 1){
          return true
        }
      }
      return false
    },
    functionAdminBkpsdm(roles) {
     for(var i=0; i < roles.length; i++){
        if( roles[i].role_id == 3){
          return true
        }
      }
      return false
    }
  },
  mounted() {
    
    var roles = this.$auth.state.user.roles
    this.isPersonal = this.functionPersonal(roles)
    this.isAdminSkpd = this.functionAdminSkpd(roles)
    this.isAdminBkpsdm = this.functionAdminBkpsdm(roles)

  },
  


};
</script>

<style lang="scss">
</style>
