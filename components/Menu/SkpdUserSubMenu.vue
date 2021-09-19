<template>
  <div style="padding:0px; margin-bottom:10px;">
     
    <div class="demo-image__lazy">
      <img 
          src="~/static/img/dashboard_bg.png"
          alt="..."
          style="width:100%; height:135px; border-radius:4px 4px 0px 0px;"
        />
    </div>
    <el-menu
      background-color="#fff"
      active-text-color="#069c8f"
      :router="true" 
      :default-active="activeLink"
      mode="horizontal"
    >
      <el-menu-item 
        :index="indexDetail"
        :route="{path: `/skpd/user/${nip}/detail`}"
       >
       
        <i class="el-icon-user"></i>
        <span>Detail</span>
      </el-menu-item>
       <el-menu-item 
        :index="indexHirarki"
        :route="{path: `/skpd/user/${nip}/hirarki` }"
       >
        <i class="fa fa-sitemap"></i>
        
        <span>Hirarki</span>
      </el-menu-item>
      
       
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['nip'],
  name: "personalSubMenu",
  data() {
    return {
      activeLink: null,
      indexDetail:`/skpd/user/${this.nip}/detail`,
      indexHirarki:`/skpd/user/${this.nip}/hirarki`,
    };
  },
  watch: {
    $route(to, from) {
      this.activeLink = to.path;
    },
  },
  mounted() {
    this.activeLink = this.$route.path; 
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
