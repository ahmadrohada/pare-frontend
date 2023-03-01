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
          :src="photo_url"
          alt="..."
        />
        <div>
          <h4 style="font-size: 13px; color: rgb(252, 252, 252) !important;">{{nama_lengkap}}</h4>
          <h5 style="font-size: 10px; margin-top: -13px; color: rgb(252, 252, 252) !important;">
            NIP. {{nip_pegawai}}
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
        index="/personal/sasaran_kinerja_jpt"
        :route="{path: '/personal/sasaran_kinerja_jpt'}"
       >
          <i class="el-icon-s-order"></i>
          <span>List SKP</span>
      </el-menu-item>
      <br>
      <el-menu-item 
        index= "personal-sasaran_kinerja_jpt-id-sumary___en"
        :route="{path:`/personal/sasaran_kinerja_jpt/${sasaranKinerjaId}/sumary`, name:'personal-sasaran_kinerja_jpt-id-sumary___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Sumary</span>
      </el-menu-item>
      <el-menu-item 
        index= "personal-sasaran_kinerja_jpt-id-data_pegawai___en"
        :route="{path:`/personal/sasaran_kinerja_jpt/${sasaranKinerjaId}/data_pegawai`, name:'personal-sasaran_kinerja_jpt-id-data_pegawai___en'}"
       >
        <i class="el-icon-user"></i>
        <span>Data Pegawai</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document-copy"></i> Kegiatan SKP</template>
          <el-menu-item 
            index="personal-sasaran_kinerja_jpt-id-rencana_hasil_kerja___en"
            :route="{path:`/personal/sasaran_kinerja_jpt/${sasaranKinerjaId}/rencana_hasil_kerja`, name:'personal-sasaran_kinerja_jpt-id-rencana_hasil_kerja___en'}"
            
          >
          <i class="el-icon-arrow-right"></i>
          Hasil Kerja
          </el-menu-item>

           <el-menu-item 
            index="personal-sasaran_kinerja_jpt-id-rencana_perilaku_kerja___en"
            :route="{path:`/personal/sasaran_kinerja_jpt/${sasaranKinerjaId}/rencana_perilaku_kerja`, name:'personal-sasaran_kinerja_jpt-id-rencana_perilaku_kerja___en'}"
            
          >
          <i class="el-icon-arrow-right"></i>
          Perilaku Kerja
          </el-menu-item>
      </el-submenu>

     <!--  <el-menu-item 
        index="personal-sasaran_kinerja_jpt-id-rencana_aksi___en"
        :route="{path:`/personal/sasaran_kinerja_jpt/${sasaranKinerjaId}/rencana_aksi`, name:'personal-sasaran_kinerja_jpt-id-rencana_aksi___en'}"
       >
          <i class="el-icon-date"></i>
          <span>Rencana Aksi</span>
      </el-menu-item> -->
      
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["nama_lengkap", "photo_url","nip_pegawai","notifikasi_renja" ],
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
