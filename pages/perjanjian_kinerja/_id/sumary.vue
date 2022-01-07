<template>
  <card style="min-height:500px;">

    <pare-loader ref="loader"></pare-loader>


    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Perjanjian Kinerja</h4>
      <p class="card-category d-inline">Sumary</p>
    </template>


    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <card class="font-weight-300">
                <p class="card-text"><i class="el-icon-date"></i> PERIODE PERJANJIAN KINERJA</p>
                <p class="text-muted">{{periodePk}}</p>
                <hr style="margin-top:-2px;">
                <p class="card-text"><i class="el-icon-office-building"></i> SKPD</p>
                <p class="text-muted">{{namaSkpd}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-collection"></i> KEPALA SKPD </p>
                <p class="text-muted">{{namaKepalaSkpd}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-medal"></i> JABATAN KEPALA SKPD</p>
                <p class="text-muted">{{jabatanKepalaSkpd}}</p>
                <hr style="margin-top:-2px;">
          </card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <card class="font-weight-300">
                <p class="card-text"><i class="el-icon-date"></i> CREATED AT</p>
                <p class="text-muted">{{createdAt}}</p>
                <hr style="margin-top:-2px;">
                <p class="card-text"><i class="el-icon-thumb"></i> CREATED BY ( ADMIN )</p>
                <p class="text-muted">{{createdBy}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-notebook-2"></i> JUMLAH SASARAN STRATEGIS</p>
                <p class="text-muted">{{jumlahSasaranStrategis}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-monitor"></i> STATUS</p>
                <p class="text-muted">{{statusPk}}</p>
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
  layout: "perjanjianKinerjaLayout",
  components:{
    PareLoader,
  },
  data() {
    return {
      perjanjianKinerjaId: null,
      periodePk: '-',
      namaSkpd:'-',
      namaKepalaSkpd:'-',
      jabatanKepalaSkpd:'-',
      createdAt:'-',
      createdBy:'-',
      jumlahSasaranStrategis:'-',
      statusPk:'-'

    }
  },
  methods: {
    loadData() {

      const params = [
        `id=${this.perjanjianKinerjaId}`,
      ].join('&')

      this.$refs.loader.start() 
      this.$axios
        .get(`/perjanjian_kinerja_detail?${params}`)
        .then(({ data }) => {
          this.periodePk = data.periodePk
          this.namaSkpd = data.namaSkpd
          this.namaKepalaSkpd = data.namaKepalaSkpd
          this.jabatanKepalaSkpd = data.jabatanKepalaSkpd
          this.createdAt = data.createdAt
          this.createdBy = data.createdBy
          this.jumlahSasaranStrategis = data.jumlahSasaranStrategis
          this.statusPk = data.status
         
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
    this.perjanjianKinerjaId = this.$route.params.id
    this.loadData()
  },

};
</script>
<style></style>

