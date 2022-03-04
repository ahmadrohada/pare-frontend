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
          :src="skpdLogo"
          alt="..."
        />
        <div>
          <h4 style="font-size: 13px; color: rgb(252, 252, 252) !important;">{{skpdSingkatan}}</h4>
          <h5 style="font-size: 10px; margin-top: -13px; color: rgb(252, 252, 252) !important;">
             
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
      <el-menu-item 
        index="/skpd/user"
        :route="{path: '/skpd/user'}"
       >
       
        <i class="el-icon-user"></i>
        <span>User</span>
      </el-menu-item>
      <el-menu-item 
        index="/skpd/manajemen_kinerja"
        :route="{path: '/skpd/manajemen_kinerja'}"
       >
        <i class="el-icon-data-analysis"></i>
        <span>Manajemen Kinerja</span>
      </el-menu-item>
      <!-- <el-menu-item 
        index="/skpd/perjanjian_kinerja"
        :route="{path: '/skpd/perjanjian_kinerja'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Perjanjian Kinerja</span>
      </el-menu-item>
      <el-menu-item 
        index="/skpd/sasaran_kinerja"
        :route="{path: '/skpd/sasaran_kinerja'}"
       >
        <i class="el-icon-data-analysis"></i>
        <span>Sasaran Kinerja</span>
      </el-menu-item>
      <el-submenu index="3" disabled>
        <template slot="title"
          ><i class="el-icon-money"></i>TPP</template
        >
          <el-menu-item index="3-1">Report</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["skpdLogo","skpdSingkatan" ],
  name: "skpdMenu",
  data() {
    return {
      activeLink: null,
    };
  },
  methods: {
    
  },
  watch: {
    $route (to, from) {
      this.activeLink = to.path;
    }
  },
  mounted() {
    this.$axios
        .$get("/skpd/"+this.id_skpd)
        .then((resp) => {
          this.logo = resp.logo;
        })
        .catch((err) => {
          console.log(err);
        });
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
    background-color: transparent !important;
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
</style>
