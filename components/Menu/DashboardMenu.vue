<template>
  <div>
       <sidebar-item 
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'fa fa-columns',
            path: '/home'
          }"
        >
      </sidebar-item>
        <div class="dropdown-divider"></div>
        <sidebar-item 
          v-if = "isPersonal === true "
          :link="{
            name: $t('sidebar.personalDashboard'),
            icon: 'fa fa-user-cog',
            path: '/personal/dashboard'
          }"
        >
        </sidebar-item>
        <sidebar-item 
        
          v-if = "isAdminBkpsdm"
          :link="{
            name: $t('sidebar.adminBkpsdm'),
            icon: 'fa fa-user-shield',
            path: '/admin_bkpsdm/dashboard'
          }"
        >
        </sidebar-item>
        <sidebar-item 
          v-if = "isAdminSkpd"
          :link="{
            name: $t('sidebar.adminSkpd'),
            icon: 'fa fa-users-cog',
            path: '/admin_skpd/dashboard'
          }"
        >
        </sidebar-item>
        <sidebar-item 
          v-if = "isAdminSkpd"
          :link="{
            name: $t('sidebar.pegawai'),
            icon: 'fa fa-users',
            path: '/admin_skpd/pegawai'
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
