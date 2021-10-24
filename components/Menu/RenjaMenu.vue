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
        index="/skpd/renja"
        :route="{path: '/skpd/renja'}"
       >
       <strong>
        <i class="el-icon-back"></i>
        <span>List Renja</span>
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
      <!-- <el-menu-item 
        index="/skpd/renja"
        :route="{path: '/skpd/renja'}"
       >
        <i class="el-icon-data-board"></i>
        <span>List Renja</span>
      </el-menu-item> -->
      <el-menu-item 
        index= "renja-id-peran___en"
        :route="{path:`/renja/${renjaId}/peran`, name:'renja-id-peran___en'}"
       >
        <i class="el-icon-user"></i>
        <span>Peran</span>
      </el-menu-item>
      <el-menu-item 
        index= "renja-id-rencana_skp___en"
        :route="{path:`/renja/${renjaId}/rencana_skp`, name:'renja-id-rencana_skp___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Rencana SKP</span>
      </el-menu-item>
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
    this.renjaId = this.$route.params.id;

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
