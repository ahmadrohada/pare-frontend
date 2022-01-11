<template>
  <div>
   
    <card class="card-user" style="margin-top:-10px !important;height: 90px !important; background: transparent !important;">
      <div class="author">
         
        <img
          class="sidemenu-avatar"
          src="~/static/img/logo_pare.png"
          alt="..."
        />
        <div>
          
        </div>
      </div>
    </card>


    <sidebar-item
      v-if="isPersonal === true"
      :link="{
        name: $t('sidebar.personalDashboard'),
        icon: 'fa fa-user-cog',
        path: '/personal',
      }"
    >
    </sidebar-item>
    <sidebar-item
      v-if="isAdminBkpsdm"
      :link="{
        name: $t('sidebar.adminBkpsdm'),
        icon: 'fa fa-user-shield',
        path: '/bkpsdm',
      }"
    >
    </sidebar-item>
    <sidebar-item
      v-if="isAdminSkpd"
      :link="{
        name: $t('sidebar.adminSkpd'),
        icon: 'fa fa-users-cog',
        path: '/skpd',
      }"
      
    >
    </sidebar-item>
   
  </div>
</template>

<script>
export default {
  name: "HomeMenu",
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
    //this.isAdminBkpsdm = this.functionAdminBkpsdm(roles)

  },
};
</script>

<style lang="scss">
</style>
