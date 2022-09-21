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
      
      :default-openeds="open_list"
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
     <!--  <el-menu-item 
        index="/personal/profile"
        :route="{path: '/personal/profile'}"
       >
       
        <i class="el-icon-user"></i>
        <span>Profile</span>
      </el-menu-item> -->

    <!--   <el-badge :value="notifikasi_renja" class="item" type="warning">
        <el-menu-item 
        index="/personal/rencana_skp"
        :route="{path: '/personal/rencana_skp'}"
       >
          <i class="el-icon-office-building"></i>
          <span>Rencana SKP</span>
      </el-menu-item>
       </el-badge> -->
      <el-menu-item 
        index="/personal/sasaran_kinerja_bawahan"
        :route="{path: '/personal/sasaran_kinerja_bawahan'}"
       >
          <i class="el-icon-data-analysis"></i>
          <span>SKP Bawahan List</span>
      </el-menu-item>
      
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["nama_lengkap", "photo_url","nip_pegawai","notifikasi_renja" ],
  name: "PersonalMenu",
  data() {
    return {
      sasaranKinerjaId:null,
      activeLink: null,
      open_list:null,
    };
  },
  watch: {
    $route (to, from) {
      this.activeLink = to.name;
    }
  },
  mounted() {
    this.activeLink = this.$route.name; 
    this.sasaranKinerjaId = this.$route.params.id;
  },
};
</script>

<style lang="scss">
 
</style>
