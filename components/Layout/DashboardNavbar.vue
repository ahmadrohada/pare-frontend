<template>
  <base-nav
    v-model="showMenu"
    class="navbar-fixed top-navbar"
    type="vue"
    :transparent="true"
  >
    <div slot="brand" class="navbar-wrapper">
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>

    <div style="width:100%; text-align:center;margin-left:25px;">
      
      <el-badge is-dot class="item" hidden>
        <el-button type="success" size="small" icon="fa fa-home" @click="goToHome"></el-button>
      </el-badge>

      <el-badge is-dot class="item" :hidden="hidePersonalBadge">
        <el-button type="success" size="small"icon="fa fa-user" @click="goToPersonal"></el-button>
      </el-badge>

      <el-badge is-dot class="item" hidden>
        <el-button v-if = "isAdminSkpd" type="success" size="small" icon="fa fa-users" @click="goToSkpd"></el-button>
      </el-badge>
      
      
    </div>

      
    </div>

    <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
      
      
      
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template
          slot="title"
        >
          <div class="photo"><img :src="photoUrl" /></div>
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p class="d-lg-none">{{namaLengkap}}</p>
        </template>
        <!-- <div class="dropdown-divider"></div> -->
        <li class="nav-link">
          <a href="#" @click.prevent="signOut" class="nav-item dropdown-item">Log out</a>
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
import { mapGetters } from 'vuex'

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      hidePersonalBadge:true,
      badge:"",
      isAdminSkpd: false,
      isPersonal : false,
      isAdminBkpsdm : false,
      
    };
  },
  watch: {
    badge: function (val) {
      this.fullName = val + ' ' + this.lastName
    }
  },
  computed: {
    routeName() {
      const { path } = this.$route;
      let parts = path.split('/')
      if(parts == ','){
        return 'Home';
      }
      return parts.map(p => this.capitalizeFirstLetter(p)).join(' ');
    },
    ...mapGetters({
      photoUrl: 'photo',
      namaLengkap:'nama_lengkap',
      roles:'roles'
    })
  },
  methods: {
    goToHome(){
      this.$router.push("/");
    },
    goToPersonal(){
      this.$router.push("/personal");
    },
    goToSkpd(){
      this.$router.push("/skpd");
    },
    capitalizeFirstLetter(string) {
      if (!string || typeof string !== 'string') {
        return ''
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    signOut() {
        this.$confirm('keluar dari aplikasi', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          //console.log(this.$route.path)
          this.$auth.logout();
          if ( this.$route.path == "/"){
            this.$router.go("/login")
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Batal'
          });          
        });     
    },
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
    //this.photoUrl = this.$auth.user.profile.photo
    //this.nama_lengkap = this.$auth.user.profile.pegawai.nama_lengkap
    var roles = this.$auth.state.user.roles
    this.isPersonal = this.functionPersonal(roles)
    this.isAdminSkpd = this.functionAdminSkpd(roles)
    this.isAdminBkpsdm = this.functionAdminBkpsdm(roles)
  },
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}

.el-button {
  cursor: pointer;
  background: hsla(167, 61%, 25%, 0.692) !important;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 13px;
}

.item {
  margin-top: 0px;
  margin-right: 8px;
}

</style>
