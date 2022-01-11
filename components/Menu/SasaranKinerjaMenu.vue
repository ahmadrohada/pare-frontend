<template>
  <div>

    <el-menu
      background-color="transparent"
      text-color="#fff"
      active-text-color="#a38068"
      :router="true" 
      style="margin-top:10px;"
    >
      <el-menu-item 
        index="/skpd/sasaran_kinerja"
        :route="{path: '/skpd/sasaran_kinerja'}"
       >
       <strong>
        <i class="el-icon-back"></i>
        <span>Sasaran Kinerja SKPD</span>
       </strong>
       
      </el-menu-item>
      
      <el-divider></el-divider>
    </el-menu>

    <el-menu
      :default-openeds="[]"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true" 
      :default-active="activeLink"
    >
      <el-menu-item 
        index= "sasaran_kinerja-id-sumary___en"
        :route="{path:`/sasaran_kinerja/${sasaranKinerja}/sumary`, name:'sasaran_kinerja-id-sumary___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Sumary</span>
      </el-menu-item>
     
      <el-menu-item 
        index= "sasaran_kinerja-id-rencana_kinerja___en"
        :route="{path:`/sasaran_kinerja/${sasaranKinerja}/sumary`, name:'sasaran_kinerja-id-rencana_kinerja___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Rencana Kinerja</span>
      </el-menu-item>
      <!-- <el-menu-item 
        index= "sasaran_kinerja-id-pejabat___en"
        :route="{path:`/sasaran_kinerja/${sasaranKinerja}/pejabat`, name:'sasaran_kinerja-id-pejabat___en'}"
       >
        <i class="el-icon-user"></i>
        <span>Pejabat</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  props: [],
  name: "skpdMenu",
  data() {
    return {
      activeLink: null,
      renjaId: null,
      logo:null,
    };
  },
  methods: {
    
  },
  watch: {
    $route (to, from) {
      this.activeLink = to.name;
    }
  },
  mounted() {
    /* this.$axios
        .$get("/skpd/"+this.id_skpd)
        .then((resp) => {
          this.logo = resp.logo;
        })
        .catch((err) => {
          console.log(err);
        }); */
    this.activeLink = this.$route.name; 
    console.log(this.$route.name) 
    this.sasaranKinerja = this.$route.params.id;

  },
};
</script>

<style scoped>
 
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

  .el-divider--horizontal {
    margin: 5px -10px 5px 10px !important;
    width: 90% !important;
    height: 3px !important;
    background-color: #34795F !important;
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
