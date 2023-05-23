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
      <!-- <el-menu-item 
        index="/personal"
        :route="{path: '/personal'}"
       >
       
        <i class="el-icon-data-board"></i>
        <span>Dashboard</span>
      </el-menu-item> -->
     <!--  <el-menu-item 
        index="/personal/profile"
        :route="{path: '/personal/profile'}"
       >
       
        <i class="el-icon-user"></i>
        <span>Profile</span>
      </el-menu-item> -->

    <!--   <el-badge :value="notifikasi_renja" class="item" type="warning">
        <el-menu-item 
        index="/personal/rencana_skp"
        :route="{path: '/personal/rencana_skp'}"
       >
          <i class="el-icon-office-building"></i>
          <span>Rencana SKP</span>
      </el-menu-item>
       </el-badge> -->
      <el-menu-item 
        index="/personal/sasaran_kinerja"
        :route="{path: '/personal/sasaran_kinerja'}"
       >
          <i class="el-icon-s-order"></i>
          <span>List SKP</span>
      </el-menu-item>
      <br>
      <el-menu-item 
        index= "personal-sasaran_kinerja-id-sumary___en"
        :route="{path:`/personal/sasaran_kinerja/${sasaranKinerjaId}/sumary`, name:'personal-sasaran_kinerja-id-sumary___en'}"
       >
        <i class="el-icon-data-board"></i>
        <span>Sumary</span>
      </el-menu-item>
      <el-menu-item 
        index= "personal-sasaran_kinerja-id-data_pegawai___en"
        :route="{path:`/personal/sasaran_kinerja/${sasaranKinerjaId}/data_pegawai`, name:'personal-sasaran_kinerja-id-data_pegawai___en'}"
       >
        <i class="el-icon-user"></i>
        <span>Data Pegawai</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document-copy"></i> Kegiatan SKP</template>
          <el-menu-item 
            index="personal-sasaran_kinerja-id-rencana_hasil_kerja___en"
            :route="{path:`/personal/sasaran_kinerja/${sasaranKinerjaId}/rencana_hasil_kerja`, name:'personal-sasaran_kinerja-id-rencana_hasil_kerja___en'}"
            
          >
          <i class="el-icon-arrow-right"></i>
          Rencana Hasil Kerja
          </el-menu-item>

           <el-menu-item 
            index="personal-sasaran_kinerja-id-rencana_perilaku_kerja___en"
            :route="{path:`/personal/sasaran_kinerja/${sasaranKinerjaId}/rencana_perilaku_kerja`, name:'personal-sasaran_kinerja-id-rencana_perilaku_kerja___en'}"
            
          >
          <i class="el-icon-arrow-right"></i>
          Perilaku Kerja
          </el-menu-item>
      </el-submenu>

      <el-menu-item 
        index="personal-sasaran_kinerja-id-rencana_aksi___en"
        :route="{path:`/personal/sasaran_kinerja/${sasaranKinerjaId}/rencana_aksi`, name:'personal-sasaran_kinerja-id-rencana_aksi___en'}"
       >
          <i class="el-icon-date"></i>
          <span>Rencana Aksi</span>
      </el-menu-item>
      


      <!-- <el-menu-item 
        index="/personal/sasaran_kinerja"
        :route="{path: '/personal/sasaran_kinerja'}"
       >
          <i class="el-icon-data-analysis"></i>
          <span>Hasil Kerja</span>
      </el-menu-item>

      <el-menu-item 
        index="/personal/sasaran_kinerja"
        :route="{path: '/personal/sasaran_kinerja'}"
       >
          <i class="el-icon-data-analysis"></i>
          <span>Perilaku Kerja</span>
      </el-menu-item> -->


     <!--  <el-menu-item 
        index="/personal/sasaran_kinerja"
        :route="{path: '/personal/sasaran_kinerja'}"
       >
          <i class="el-icon-data-analysis"></i>
          <span>Kegiatan</span>
      </el-menu-item>
       

      <el-menu-item 
        index="/personal/sasaran_kinerja"
        :route="{path: '/personal/sasaran_kinerja'}"
       >
          <i class="el-icon-data-analysis"></i>
          <span>Feedback</span>
      </el-menu-item>

      <el-menu-item 
        index="/personal/sasaran_kinerja"
        :route="{path: '/personal/sasaran_kinerja'}"
       >
          <i class="el-icon-data-analysis"></i>
          <span>Capaian</span>
      </el-menu-item> -->
      <!-- <el-submenu index="1" disabled>
        <template slot="title"
          ><i class="el-icon-document-copy"></i>SKP</template
        >
          <el-menu-item index="1-1">Tahunan</el-menu-item>
          <el-menu-item index="1-2">Bulanan</el-menu-item>
      </el-submenu>
      <el-submenu index="2" disabled>
        <template slot="title"
          ><i class="el-icon-notebook-2"></i>Capaian</template
        >
          <el-menu-item index="2-1">Tahunan</el-menu-item>
          <el-menu-item index="2-2">Bulanan</el-menu-item>
      </el-submenu>
      <el-submenu index="3" disabled>
        <template slot="title"
          ><i class="el-icon-money"></i>TPP</template
        >
          <el-menu-item index="3-1">Report</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      
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
