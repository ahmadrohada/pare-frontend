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
      <el-button type="success" size="small"icon="fa fa-home" @click="goToHome"></el-button>
      <el-button type="success"size="small"icon="fa fa-user" @click="goToPersonal"></el-button>
      <el-button type="success" size="small" icon="fa fa-users" @click="goToSkpd"></el-button>
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
    })
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
    };
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
   /*    this.$swal.fire({
        title: 'Keluar dari aplikasi', 
        text: "",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$auth.logout();
        }
      }) */
     
    }
  },
  mounted() {
    //this.photoUrl = this.$auth.user.profile.photo
    //this.nama_lengkap = this.$auth.user.profile.pegawai.nama_lengkap
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

</style>
