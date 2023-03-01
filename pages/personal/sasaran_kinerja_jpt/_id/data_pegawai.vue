<template>
  <card style="min-height:500px;">

    <pare-loader ref="loader"></pare-loader>


    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja JPT</h4>
      <p class="card-category d-inline">Data Pegawai</p>
    </template>

    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <card class="font-weight-300">
                <p style="font-weight:bold;height:30px;"><i class="el-icon-user"></i> PEGAWAI YANG DINILAI</p>
                <p class="card-text"><i class="el-icon-date"></i> NAMA</p>
                <p class="text-muted" style="min-height:20px;">{{pegawaiYangDinilai.nama}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-thumb"></i> NIP</p>
                <p class="text-muted" style="min-height:20px;">{{pegawaiYangDinilai.nip}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-notebook-2"></i> PANGKAT / GOL RUANG</p>
                <p class="text-muted" style="min-height:20px;">{{pegawaiYangDinilai.pangkat}} {{ (pegawaiYangDinilai.golongan != null )? '  /  '+pegawaiYangDinilai.golongan:''}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-monitor"></i> JABATAN</p>
                <p class="text-muted" style="min-height:20px;">{{pegawaiYangDinilai.jabatan}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-monitor"></i> INSTANSI</p>
                <p class="text-muted" style="min-height:20px;">{{pegawaiYangDinilai.instansi}}</p>
                <hr style="margin-top:-2px;">
          </card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <card class="font-weight-300">
                <p style="font-weight:bold;height:30px;"><i class="el-icon-user"></i> PEJABAT PENILAI</p>
                <p class="card-text"><i class="el-icon-date"></i> NAMA</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.nama}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-thumb"></i> NIP</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.nip}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-notebook-2"></i> PANGKAT / GOL RUANG</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.pangkat}} {{ (pejabatPenilai.golongan != null )? '  /  '+pejabatPenilai.golongan:''}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-monitor"></i> JABATAN</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.jabatan}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-monitor"></i> INSTANSI</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.instansi}}</p>
                <hr style="margin-top:-2px;">
          </card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <card class="font-weight-300">
                <p style="font-weight:bold;height:30px;"><i class="el-icon-user"></i> ATASAN PEJABAT PENILAI</p>
                <p class="card-text"><i class="el-icon-date"></i> NAMA</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.nama}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-thumb"></i> NIP</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.nip}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-notebook-2"></i> PANGKAT / GOL RUANG</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.pangkat}} {{ (pejabatPenilai.golongan != null )? '  /  '+pejabatPenilai.golongan:''}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-monitor"></i> JABATAN</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.jabatan}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-monitor"></i> INSTANSI</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilai.instansi}}</p>
                <hr style="margin-top:-2px;">
          </card>
      </el-col>
    </el-row>

   


    








  </card>
</template>


<script>

import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  middleware: ['auth'],
  layout: "sasaranKinerjaJptPersonalLayout",
  components:{
    PareLoader,
  },
  data() {
    return {
      sasaranKinerjaId: null,
      pegawaiYangDinilai:{
        nama:"-",
        nip:"-",
        pangkat:"-",
        golongan:"-",
        jabatan:"-",
        instansi:"-"
      },
      pejabatPenilai:{
        nama:"-",
        nip:"-",
        pangkat:"-",
        jabatan:"-",
        golongan:"-",
        instansi:"-"
      },
    }
  },
  methods: {
    loadData() {

      const params = [
        `id=${this.sasaranKinerjaId}`,
      ].join('&')

      this.$refs.loader.start() 
      this.$axios
        .$get(`/sasaran_kinerja?${params}`)
        .then(({ data }) => {
         
          this.pegawaiYangDinilai = ( data.pegawaiYangDinilai != null ) ? data.pegawaiYangDinilai : this.pegawaiYangDinilai
          this.pejabatPenilai = ( data.pejabatPenilai != null ) ? data.pejabatPenilai : this.pejabatPenilai
         
          setTimeout(() => {
             this.$refs.loader.finish() 
          }, 800);

        })
        .catch((error) => {
          throw error
        })
    },
  },
  mounted() {
    this.sasaranKinerjaId = this.$route.params.id
    this.loadData()
  },

};
</script>
<style></style>

