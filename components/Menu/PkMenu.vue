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
        index="/skpd/perjanjian_kinerja"
        :route="{path: '/skpd/perjanjian_kinerja'}"
       >
       <strong>
        <i class="el-icon-back"></i>
        <span>Perjanjian Kinerja SKPD</span>
       </strong>
       
      </el-menu-item>
      
      <el-divider></el-divider>
    </el-menu>
    
    <!-- <card class="card-user" style="margin-top:10px !important;height: 150px !important; background: transparent !important;">
      <div class="author">
         <img 
          src="~/static/img/bg_profile.png"
          alt="..."
          class="bg_photo"
        />
        <img
          class="sidemenu-avatar"
          :src="logo"
          alt="..."
        />
        <div>
          <h4 style="font-size: 13px; color: rgb(252, 252, 252) !important;"></h4>
          <h5 style="font-size: 10px; margin-top: -13px; color: rgb(252, 252, 252) !important;">
            Admin 
          </h5>
        </div>
      </div>
    </card> -->

   

    <el-menu
      :default-openeds="[]"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true" 
      :default-active="activeLink"
    >
      <el-menu-item 
        index= "perjanjian_kinerja-id-sumary___en"
        :route="{path:`/perjanjian_kinerja/${perjanjianKinerjaId}/sumary`, name:'perjanjian_kinerja-id-sumary___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Sumary</span>
      </el-menu-item>
      <el-menu-item 
        index= "perjanjian_kinerja-id-sasaran_strategis___en"
        :route="{path:`/perjanjian_kinerja/${perjanjianKinerjaId}/sasaran_strategis`, name:'perjanjian_kinerja-id-sasaran_strategis___en'}"
       >
        <i class="el-icon-notebook-1"></i>
        <span>Sasaran Strategis</span>
      </el-menu-item>
      <!-- <el-menu-item 
        index= "perjanjian_kinerja-id-skp_jpt___en"
        :route="{path:`/perjanjian_kinerja/${perjanjianKinerjaId}/skp_jpt`, name:'perjanjian_kinerja-id-skp_jpt___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>SKP JPT Pratama</span>
      </el-menu-item>
       <el-menu-item 
        index= ""
        :route="{path:``, name:''}"
       >
        <i class="el-icon-data-board"></i>
        <span>Manual Indikator Kinerja</span>
      </el-menu-item>
       <el-menu-item 
        index= ""
        :route="{path:``, name:''}"
       >
        <i class="el-icon-data-board"></i>
        <span>Matriks Peran Hasil</span>
      </el-menu-item>
      <el-menu-item 
        index= "perjanjian_kinerja-id-peran___en"
        :route="{path:`/perjanjian_kinerja/${perjanjianKinerjaId}/peran`, name:'perjanjian_kinerja-id-peran___en'}"
       >
        <i class="el-icon-user"></i>
        <span>Peran</span>
      </el-menu-item>
      <el-menu-item 
        index= "perjanjian_kinerja-id-rencana_skp___en"
        :route="{path:`/perjanjian_kinerja/${perjanjianKinerjaId}/rencana_skp`, name:'perjanjian_kinerja-id-rencana_skp___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Rencana SKP</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  props: [],
  name: "PkMenu",
  data() {
    return {
      activeLink: null,
      perjanjianKinerjaId: null,
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
    this.perjanjianKinerjaId = this.$route.params.id;

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
