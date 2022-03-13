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
          <h5 style="font-size: 11px; margin-top: -15px; color: rgb(252, 252, 252) !important;">
             Manajemen Kinerja PNS
          </h5>
          <h5 style="font-size: 12px; margin-top: -15px; color: rgb(252, 252, 252) !important;">
             Periode {{periodeTahun}}
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
      <!-- <el-menu-item 
        index="skpd-manajemen_kinerja-periode___en"
        :route="{path:`/skpd/manajemen_kinerja/${periodeTahun}`, name:'skpd-manajemen_kinerja-periode___en'}"
       >
        <i class="el-icon-date"></i>
        <span>Timeline</span>
      </el-menu-item> -->
      <el-menu-item 
        index="skpd-manajemen_kinerja-periode-perjanjian_kinerja___en"
        :route="{path:`/skpd/manajemen_kinerja/${periodeTahun}/perjanjian_kinerja`, name:'skpd-manajemen_kinerja-periode-perjanjian_kinerja___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Perjanjian Kinerja</span>
        
      </el-menu-item>
    

      <el-menu-item 
        :disabled="disabledSkpjpt"
        index="skpd-manajemen_kinerja-periode-sasaran_kinerja_jpt___en"
        :route="{path:`/skpd/manajemen_kinerja/${periodeTahun}/sasaran_kinerja_jpt`, name:'skpd-manajemen_kinerja-periode-sasaran_kinerja_jpt___en'}"
       >
        <i class="el-icon-data-analysis"></i>
        <span>SKP JPT</span>
      </el-menu-item>

      <el-menu-item 
        :disabled="disabledTimKerja"
        index="skpd-manajemen_kinerja-periode-tim_kerja___en"
        :route="{path:`/skpd/manajemen_kinerja/${periodeTahun}/tim_kerja`, name:'skpd-manajemen_kinerja-periode-tim_kerja___en'}"
       >
        <i class="el-icon-user"></i>
        <span>Tim Kerja</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["skpdLogo","skpdSingkatan","skpdId" ],
  name: "manajemenKinerjaMenu",
  data() {
    return {
      activeLink: null,
      disabledSkpjpt:true,
      disabledTimKerja:true,
      periodeTahun:null,
    };
  },
  methods: {
    activateMenu() {
      const params = [
        `skpd_id=${this.skpdId}`,
        `periode_tahun=${this.periodeTahun}`,
      ].join('&')
      this.$axios
        .get(`/manajemen_kinerja_menu?${params}`)
        .then((resp) => {
          //console.log(resp.data[0].perjanjian_kinerja)
          if (resp.data[0].perjanjian_kinerja == true ){
            this.disabledSkpjpt = false
            this.disabledTimKerja = false
          }
          
          
        })
        .catch((error) => {
          throw error
        })
    },
    
  },
  watch: {
    $route (to, from) {
      this.activeLink = to.name;
    }
  },
  mounted() {
    this.activeLink = this.$route.name; 
    this.periodeTahun = this.$route.params.periode;
    this.activateMenu()
  },
};
</script>

<style lang="scss">
 
</style>
