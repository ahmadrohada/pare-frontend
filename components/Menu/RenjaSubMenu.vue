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
        :route="{path: `/renja/${renja_id}/kegiatan` }"
       >
        <i class="el-icon-data-board"></i>
        <span>Kegiatan</span>
      </el-menu-item>
      <el-menu-item 
        :index="index_2"
        :route="{path: `/renja/${renja_id}/tim_kerja`}"
       >
       
        <i class="fa fa-sitemap"></i>
        <span>Tim Kerja</span>
      </el-menu-item>
       <el-menu-item 
        :index="index_3"
        :route="{path: `/renja/${renja_id}/skp`}"
       >
       
        <i class="el-icon-eye"></i>
        <span>SKP</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["index_1", "index_2", "index_3"],
  name: "bkpsdmSubMenu",
  data() {
    return {
      activeLink: null,
      renja_id:null,
    };
  },
  methods: {},
  watch: {
    $route(to, from) {
      this.activeLink = to.path;
    },
  },
  mounted() {
    this.renja_id = this.$route.params.id;
    this.activeLink = this.$route.fullPath;

    console.log(this.renja_id)
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
