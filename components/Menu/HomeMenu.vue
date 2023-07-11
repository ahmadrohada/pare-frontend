<template>
  <div>
    <card class="card-user"
      style="margin-top:-10px !important;height: 90px !important; background: transparent !important;">
      <div class="author">
        <img src="~/static/img/bg_profile.png" alt="..." class="bg_photo" />
      </div>
    </card>
    <el-menu :default-openeds="[]" background-color="transparent" text-color="#fff" active-text-color="#ffd04b"
      :router="true" :default-active="activeLink">

      <el-menu-item @click="bukuPanduan()">

        <i class="el-icon-notebook-1"></i>
        <span>Buku Panduan</span>
      </el-menu-item>
    </el-menu>



    <!-- <sidebar-item
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
    </sidebar-item> -->

  </div>
</template>

<script>
export default {
  name: "HomeMenu",
  data() {
    return {
      isAdminSkpd: false,
      isPersonal: false,
      isAdminBkpsdm: false,
      roles: "",

    }
  },
  methods: {
    functionAdminSkpd(roles) {
      for (var i = 0; i < roles.length; i++) {
        if (roles[i].role_id == 2) {
          return true
        }
      }
      return false
    },
    functionPersonal(roles) {
      for (var i = 0; i < roles.length; i++) {
        if (roles[i].role_id == 1) {
          return true
        }
      }
      return false
    },
    functionAdminBkpsdm(roles) {
      for (var i = 0; i < roles.length; i++) {
        if (roles[i].role_id == 3) {
          return true
        }
      }
      return false
    },
    bukuPanduan() {
        window.open('https://api-pare-v3.bkpsdm.karawangkab.go.id/buku-panduan', '_blank', 'noreferrer');
        //http://localhost:8000
        //https://api-pare-v3.bkpsdm.karawangkab.go.id
      },
  },
  mounted() {

    var roles = this.$auth.$state.user.roles
    this.isPersonal = this.functionPersonal(roles)
    this.isAdminSkpd = this.functionAdminSkpd(roles)
    //this.isAdminBkpsdm = this.functionAdminBkpsdm(roles)

  },
};
</script>

<style lang="scss">
.el-menu {
  border-right: none !important;
}

.el-submenu__title:hover,
.el-menu-item:hover {
  background-color: rgba(5, 117, 93, 0.288) !important;
}

.el-menu-item,
.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
  background-color: transparent !important;
}
</style>
