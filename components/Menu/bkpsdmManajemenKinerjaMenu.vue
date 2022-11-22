<template>
  <div>
    <card
      class="card-user"
      style="
        margin-top: 10px !important;
        height: 150px !important;
        background: transparent !important;
      "
    >
      <div class="author">
        <img src="~/static/img/bg_profile.png" alt="..." class="bg_photo" />
        <img
          class="sidemenu-avatar"
          src="~/static/img/icons/logo_bkpsdm.png"
          alt="..."
        />
        <div>
          <h4 style="font-size: 13px; color: rgb(252, 252, 252) !important">
            BKPSDM KARAWANG
          </h4>
          <h5
            style="
              font-size: 10px;
              margin-top: -13px;
              color: rgb(252, 252, 252) !important;
            "
          >
            Administrator
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
        index="bkpsdm-manajemen_kinerja-periode___en"
        :route="{
          path: `/bkpsdm/manajemen_kinerja`,
          name: 'bkpsdm-manajemen_kinerja___en',
        }"
      >
        <i class="el-icon-back"></i>
        <span>Manajemen Kinerja List</span>
      </el-menu-item>
      <!-- <el-menu-item 
        index="bkpsdm-manajemen_kinerja-periode___en"
        :route="{path:`/bkpsdm/manajemen_kinerja/${periodeTahun}`, name:'bkpsdm-manajemen_kinerja-periode___en'}"
       >
        <i class="el-icon-date"></i>
        <span>Timeline</span>
      </el-menu-item> -->
      <!-- <el-menu-item 
        index="bkpsdm-manajemen_kinerja-periode-skpd-perjanjian_kinerja___en"
        :route="{path:`/bkpsdm/manajemen_kinerja/${periodeTahun}/${skpdId}/perjanjian_kinerja`, name:'bkpsdm-manajemen_kinerja-periode-skpd-perjanjian_kinerja___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Perjanjian Kinerja</span>
        
      </el-menu-item>
    

      <el-menu-item 
        :disabled="disabledSkpjpt"
        index="bkpsdm-manajemen_kinerja-periode-skpd-sasaran_kinerja_jpt___en"
        :route="{path:`/bkpsdm/manajemen_kinerja/${periodeTahun}/${skpdId}/sasaran_kinerja_jpt`, name:'bkpsdm-manajemen_kinerja-periode-skpd_id-sasaran_kinerja_jpt___en'}"
       >
        <i class="el-icon-data-analysis"></i>
        <span>SKP JPT</span>
      </el-menu-item>

      <el-menu-item 
        :disabled="disabledTimKerja"
        index="bkpsdm-manajemen_kinerja-periode-skpdId-matrik_peran_hasil___en"
        :route="{path:`/bkpsdm/manajemen_kinerja/${periodeTahun}/${skpdId}/matrik_peran_hasil`, name:'bkpsdm-manajemen_kinerja-periode-skpd_id-matrik_peran_hasil___en'}"
       >
        <i class="fa fa-sitemap"></i>&nbsp;
        <span>Matrik</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  //props: ["skpdLogo","skpdSingkatan","skpdId" ],
  name: "bkpsdmManajemenKinerjaMenu",
  data() {
    return {
      activeLink: null,
      disabledSkpjpt: false,
      disabledTimKerja: false,
      periodeTahun: null,
      skpdId: null,
    };
  },
  methods: {
    activateMenu() {
      const params = [
        `skpd_id=${this.skpdId}`,
        `periode_tahun=${this.periodeTahun}`,
      ].join("&");
      this.$axios
        .get(`/manajemen_kinerja_menu?${params}`)
        .then((resp) => {
          //console.log(resp.data[0].perjanjian_kinerja)
          if (resp.data[0].perjanjian_kinerja == true) {
            this.disabledSkpjpt = false;
            this.disabledTimKerja = false;
          }
        })
        .catch((error) => {
          throw error;
        });
    },
  },
  watch: {
    $route(to, from) {
      this.activeLink = to.name;
      console.log(this.activeLink);
    },
  },
  mounted() {
    this.activeLink = this.$route.name;
    this.periodeTahun = this.$route.params.periode;
    this.skpdId = this.$route.params.skpd;
    //this.activateMenu()
  },
};
</script>

<style lang="scss">
</style>
