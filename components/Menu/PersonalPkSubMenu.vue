<template>
  <div style="padding:0px; margin-bottom:10px;">
     
    <div class="demo-image__lazy">
      <img 
          src="~/static/img/dashboard_bg.jpg"
          alt="..."
          style="width:100%; height:135px; border-radius:4px 4px 0px 0px;"
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
        :index="index_1"
        :route="{path: `/personal/tim_kerja/${tim_kerja_id}/peran` }"
       >
        <i class="fa fa-sitemap"></i>
        
        <span>Peran</span>
      </el-menu-item>
     <!--  <el-menu-item 
        :index="index_2"
        :route="{path: `/personal/tim_kerja/${tim_kerja_id}/matrik`}"
       >
       
        <i class="el-icon-data-board"></i>
        <span>MATRIK</span>
      </el-menu-item> -->
       
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["index_1", "index_2"],
  name: "bkpsdmSubMenu",
  data() {
    return {
      activeLink: null,
      tim_kerja_id:null,
    };
  },
  methods: {},
  watch: {
    $route(to, from) {
      this.activeLink = to.path;
    },
  },
  mounted() {
    this.tim_kerja_id = this.$route.params.id;
    this.activeLink = this.$route.fullPath;

    console.log(this.tim_kerja_id)
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
