<template>
  <card style="min-height:500px;">

    <pare-loader ref="loader"></pare-loader>


    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja JPT</h4>
      <p class="card-category d-inline">Sumary</p>
    </template>


    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <card class="font-weight-300">
                <p class="card-text"><i class="el-icon-date"></i> PERIODE SKP</p>
                <p class="text-muted" style="min-height:20px;">{{ (periodePenilaian.tahun!=null)? 'Tahun '+periodePenilaian.tahun : ''}}</p>
                <hr style="margin-top:-2px;">
                <p class="card-text"><i class="el-icon-date"></i> MASA PENILAIAN SKP</p>
                <p class="text-muted" style="min-height:20px;">{{moment(periodePenilaian.tgl_mulai).format('DD MM YYYY')}} &nbsp; s.d &nbsp; {{moment(periodePenilaian.tgl_selesai).format('DD MM YYYY')}}</p>
                <hr style="margin-top:-2px;">
                <p class="card-text"><i class="el-icon-office-building"></i> INSTANSI</p>
                <p class="text-muted" style="min-height:20px;">{{pegawaiYangDinilai.instansi}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-medal"></i> JENIS JABATAN</p>
                <p class="text-muted" style="min-height:20px;">{{jenisJabatanSkp}}</p>
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
      periodePenilaian:{
        tahun: null,
        tgl_mulai: null,
        tgl_selesai: null

      },
      jenisJabatanSkp:'-',
      statusSkp:'-',
      createdAt:'-',
      createdBy:'-',

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
         

          this.jenisJabatanSkp = data.jenisJabatanSkp,
          this.statusSkp = data.statusSkp,

          this.pegawaiYangDinilai = ( data.pegawaiYangDinilai != null ) ? data.pegawaiYangDinilai : this.pegawaiYangDinilai
          this.periodePenilaian = ( data.periodePenilaian != null ) ? data.periodePenilaian : this.periodePenilaian
         
         
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

