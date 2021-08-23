<template>
  <div style="padding:0px; margin-bottom:10px;">
     
    <div class="demo-image__lazy">
      <img 
          src="~/static/img/dashboard_bg.jpg"
          alt="..."
          style="width:100%; height:125px; border-radius:4px 4px 0px 0px;"
        />
        <h4 style="font-size: 13px; color: rgb(252, 252, 252) !important; margin-top:-40px; margin-left:20px;">
 
        </h4>
    </div>
          
    <el-menu
      background-color="#fff"
      active-text-color="#069c8f"
      :router="true" 
      :default-active="activeLink"
      mode="horizontal"
    >
       <el-menu-item 
        index="/dashboard"
        :route="{path: `/bkpsdm/skpd/${id_skpd}/dashboard` }"
       >
        <i class="el-icon-data-board"></i>
        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item 
        index="/bkpsdm/skpd/:id_skpd/user"
        :route="{path: `/bkpsdm/skpd/${id_skpd}/user`}"
       >
       
        <i class="el-icon-user"></i>
        <span>User</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>SKP</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
 
  name: "bkpsdmSubMenu",
  data() {
    return {
      activeLink: null,
      id_skpd:null,
    };
  },
  methods: {},
  watch: {
    $route(to, from) {
      this.activeLink = to.path;
    },
  },
  mounted() {
    this.activeLink = this.$route.path;
    console.log(this.activeLink)
    this.id_skpd = this.$route.params.id;
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

.bg_photo {
  max-width: 200px;
  width: 98%;
  margin: auto;
  position: absolute;
  margin-top: 3px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 30;
}
</style>
