<template>
  <div>
      {{roles}}
       <sidebar-item 
          :link="{
            name: $t('sidebar.home'),
            icon: 'tim-icons icon-app',
            path: '/home'
          }"
        >
        </sidebar-item>

        <sidebar-item 
          v-if = "isPersonal === true "
          :link="{
            name: $t('sidebar.personalDashboard'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/personal/dashboard'
          }"
        >
        </sidebar-item>
        <sidebar-item 
        
          v-if = "isAdminBkpsdm"
          :link="{
            name: $t('sidebar.adminBkpsdm'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/admin_bkpsdm/dashboard'
          }"
        >
        </sidebar-item>
         <sidebar-item 
          v-if = "isAdminSkpd"
          :link="{
            name: $t('sidebar.adminSkpd'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/admin_skpd/dashboard'
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
