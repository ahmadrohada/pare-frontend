<template>
  <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <card class="font-weight-300">
                <p class="card-text"><i class="el-icon-date"></i> PERIODE SKP</p>
                <p class="text-muted" style="min-height:20px;">{{ (periodePenilaian.tahun!=null)? 'Tahun '+periodePenilaian.tahun : ''}}</p>
                <hr style="margin-top:-2px;">
                <p class="card-text"><i class="el-icon-date"></i> MASA PENILAIAN SKP</p>
                <p class="text-muted" style="min-height:20px;">{{moment(periodePenilaian.tgl_mulai).format('DD MM YYYY')}} &nbsp; s.d &nbsp; {{moment(periodePenilaian.tgl_selesai).format('DD MM YYYY')}}</p>
                <hr style="margin-top:-2px;">
               <!--  <p class="card-text"><i class="el-icon-office-building"></i> INSTANSI</p>
                <p class="text-muted" style="min-height:20px;">{{pegawaiYangDinilai.instansi}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-medal"></i> JENIS JABATAN</p>
                <p class="text-muted" style="min-height:20px;">{{jenisJabatanSkp}}</p>
                <hr style="margin-top:-2px;"> -->


               
          </card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
         <!--  <card class="font-weight-300">
                <p class="card-text"><i class="el-icon-date"></i> STATUS</p>
                <p class="text-muted" style="min-height:20px;">{{statusSkp}}</p>
                <hr style="margin-top:-2px;">
               
          </card> -->
      </el-col>
    </el-row>
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
          <card class="font-weight-300">
                <p style="font-weight:bold;height:30px;"><i class="el-icon-user"></i> PEJABAT PENILAI KINERJA</p>
                <p class="card-text"><i class="el-icon-date"></i> NAMA</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilaiKinerja.nama}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-thumb"></i> NIP</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilaiKinerja.nip}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-notebook-2"></i> PANGKAT / GOL RUANG</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilaiKinerja.pangkat}} {{ (pejabatPenilaiKinerja.golongan != null )? '  /  '+pejabatPenilaiKinerja.golongan:''}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-monitor"></i> JABATAN</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilaiKinerja.jabatan}}</p>
                <hr style="margin-top:-2px;">

                <p class="card-text"><i class="el-icon-monitor"></i> INSTANSI</p>
                <p class="text-muted" style="min-height:20px;">{{pejabatPenilaiKinerja.instansi}}</p>
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
  layout: "sasaranKinerjaLayout",
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
      pejabatPenilaiKinerja:{
        nama:"-",
        nip:"-",
        pangkat:"-",
        jabatan:"-",
        golongan:"-",
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
    loadData(sasaranKinerjaId) {
      this.sasaranKinerjaId = sasaranKinerjaId
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
          this.pejabatPenilaiKinerja = ( data.pejabatPenilaiKinerja != null ) ? data.pejabatPenilaiKinerja : this.pejabatPenilaiKinerja
          this.periodePenilaian = ( data.periodePenilaian != null ) ? data.periodePenilaian : this.periodePenilaian
         
         
          setTimeout(() => {
             this.$refs.loader.finish() 
          }, 300);

        })
        .catch((error) => {
          throw error
        })
    },
  },
  mounted() {
    if ( this.sasaranKinerjaId != null ){
        this.loadData(this.sasaranKinerjaId)
    }
  },

};
</script>
<style></style>

