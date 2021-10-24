<template>
  <div>
    <card class="card-user" style="margin-top:10px !important;height: 150px !important; background: transparent !important;">
      <div class="author">
         <img 
          src="~/static/img/bg_profile.png"
          alt="..."
          class="bg_photo"
        />
        <img
          class="sidemenu-avatar"
          :src="photo_url"
          alt="..."
        />
        <div>
          <h4 style="font-size: 13px; color: rgb(252, 252, 252) !important;">{{nama_lengkap}}</h4>
          <h5 style="font-size: 10px; margin-top: -13px; color: rgb(252, 252, 252) !important;">
            NIP. {{nip_pegawai}}
          </h5>
        </div>
      </div>
    </card>
    <el-menu
      :default-openeds="[]"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true" 
      :default-active="activeLink"
    >
      <!-- <el-menu-item 
        index="/personal"
        :route="{path: '/personal'}"
       >
       
        <i class="el-icon-data-board"></i>
        <span>Dashboard</span>
      </el-menu-item> -->
      <el-menu-item 
        index="/personal/profile"
        :route="{path: '/personal/profile'}"
       >
       
        <i class="el-icon-user"></i>
        <span>Profile</span>
      </el-menu-item>

      <el-badge :value="notifikasi_renja" class="item" type="warning">
        <el-menu-item 
        index="/personal/rencana_skp"
        :route="{path: '/personal/rencana_skp'}"
       >
          <i class="el-icon-office-building"></i>
          <span>Rencana SKP</span>
      </el-menu-item>
       </el-badge>
       
      <el-submenu index="1" disabled>
        <template slot="title"
          ><i class="el-icon-document-copy"></i>SKP</template
        >
          <el-menu-item index="1-1">Tahunan</el-menu-item>
          <el-menu-item index="1-2">Bulanan</el-menu-item>
      </el-submenu>
      <el-submenu index="2" disabled>
        <template slot="title"
          ><i class="el-icon-notebook-2"></i>Capaian</template
        >
          <el-menu-item index="2-1">Tahunan</el-menu-item>
          <el-menu-item index="2-2">Bulanan</el-menu-item>
      </el-submenu>
      <el-submenu index="3" disabled>
        <template slot="title"
          ><i class="el-icon-money"></i>TPP</template
        >
          <el-menu-item index="3-1">Report</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["nama_lengkap", "photo_url","nip_pegawai","notifikasi_renja" ],
  name: "PersonalMenu",
  data() {
    return {
      activeLink: null,
    };
  },
  watch: {
    $route (to, from) {
      this.activeLink = to.path;
    }
  },
  methods: {
    
  },
  mounted() {
    this.activeLink = this.$route.path; 
  },
};
</script>

<style lang="scss">
 
  .el-menu{
    border-right: none !important;
  }
  .el-submenu__title:hover , .el-menu-item:hover  {
      background-color: rgba(5, 117, 93, 0.288) !important;
  }

  .el-menu-item, .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
  }

  .bg_photo{
    max-width: 200px;
    width: 98%;
    margin: auto;
    position: absolute;
    margin-top:3px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 30;
  }

  .el-badge__content.is-fixed {
    top: 10px !important;
    right: 13px;
    height: 20px;
  }

</style>
