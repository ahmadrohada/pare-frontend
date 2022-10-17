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
      
      :default-openeds="open_list"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true" 
      :default-active="activeLink"
      
    >
      <el-menu-item 
        index="/bkpsdm/sasaran_kinerja"
        :route="{path: '/bkpsdm/sasaran_kinerja'}"
       >
          <i class="el-icon-data-analysis"></i>
          <span>Sasaran Kinerja List</span>
      </el-menu-item>
      
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["skpdLogo","skpdSingkatan" ],
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
