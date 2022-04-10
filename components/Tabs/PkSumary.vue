<template>
  <card style="min-height:320px;">
    <pare-loader ref="loader"></pare-loader>
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


    <el-button 
        class="btn-block"
        size="small"
        v-show="(statusPk == 'open')" 
        type="primary"  
        :loading="submitLoader"  
        icon="el-icon-position"
        @click="submitPerjanjianKinerja($event)"
    >
    SUBMIT PERJANJIAN KINERJA
    </el-button>

  </card>
</template>


<script>

import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  middleware: ['auth'],
  components:{
    PareLoader,
  },
  data() {
    return {
      periodePk: '-',
      namaSkpd:'-',
      namaKepalaSkpd:'-',
      jabatanKepalaSkpd:'-',
      createdAt:'-',
      createdBy:'-',
      jumlahSasaranStrategis:'-',
      statusPk:'close',
      perjanjianKinerjaId:null,
      submitLoader:false

    }
  },
  methods: {
    loadData(perjanjianKinerjaId) {
      this.perjanjianKinerjaId = perjanjianKinerjaId
      const params = [
        `id=${this.perjanjianKinerjaId}`,
      ].join('&')
      this.$refs.loader.start() 
      if ( this.perjanjianKinerjaId != null ){
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
            }, 300);

          })
          .catch((error) => {
            this.$refs.loader.finish() 
            throw error
          })
      }
      
    },
    submitPerjanjianKinerja: function(data) {
     
      //cek jumlah sasaran strategis
      this.submitLoader = true
      this.$axios
        .get(`/perjanjian_kinerja_detail?id=`+this.perjanjianKinerjaId)
        .then(({ data }) => {
          
          if(data.jumlahSasaranStrategis >= 1 ){
              this.$confirm('Submit Perjanjian Kinerja', 'Konfirmasi', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Batal',
                type: 'warning'
              }).then(() => {
                this.$refs.loader.start() 
                this.$axios
                  .$put("/submit_perjanjian_kinerja?id="+this.perjanjianKinerjaId)
                  .then((resp) => {
                      this.$message({
                        type: 'success',
                        message: 'Berhasil Submit'
                      });
                      setTimeout(() => {
                        this.$refs.loader.finish() 
                        this.$router.go(this.$router.currentRoute)
                      }, 400);
                      
                  })
                  .catch((error) => {
                    setTimeout(() => {
                        this.$refs.loader.finish() 
                        this.submitLoader = false
                    }, 700);
                    this.$message({
                      type: 'error',
                      message: error.response.data.message
                    });          
                  });

                
              }).catch(() => {
                setTimeout(() => {
                  this.submitLoader = false
                }, 800);
                this.$message({
                  type: 'info',
                  message: 'Proses Submit Dibatalkan'
                });          
              });
          }else{
            this.$message({
                  type: 'warning',
                  message: 'PK harus memiliki minimal 1 Sasaran Strategis'
                });   
            setTimeout(() => {
              this.submitLoader = false
            }, 800);
          }
        

        })
        .catch((error) => {
          throw error
        })
    },
  },
  mounted() {
    if ( this.perjanjianKinerjaId != null ){
        this.loadData(this.perjanjianKinerjaId)
    }
    
  },

};
</script>
<style></style>

