<template>
    <modal 
    :show.sync="modalFormVisible" 
    modalClasses = "modal-dialog_x"
   >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>

    <div class="wrapper">
      
    
      <table width="850px">
      <thead>
        <tr>
          <th width="50%" colspan="2">PEGAWAI YANG DINILAI</th>
          <th width="50%" colspan="2">PEJABAT PENILAI KINERJA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td width="18%" class="label"> NAMA </td>
            <td>{{pegawaiYangDinilai.nama}}</td>
            <td width="18%" class="label"> NAMA</td>
            <td>{{pejabatPenilaiKinerja.nama}}</td>
        </tr>
        <tr>
            <td class="label"> NIP </td>
            <td>{{pegawaiYangDinilai.nip}}</td>
            <td class="label"> NIP</td>
            <td>{{pejabatPenilaiKinerja.nip}}</td>
        </tr>
        <tr>
            <td class="label"> PANGKAT / GOL RUANG </td>
            <td>{{pegawaiYangDinilai.pangkat}} {{ (pegawaiYangDinilai.golongan != null )? '  /  '+pegawaiYangDinilai.golongan:''}}</td>
            <td class="label"> PANGKAT / GOL RUANG</td>
            <td>{{pejabatPenilaiKinerja.pangkat}} {{ (pejabatPenilaiKinerja.golongan != null )? '  /  '+pejabatPenilaiKinerja.golongan:''}}</td>
        </tr>
        <tr>
            <td class="label"> JABATAN </td>
            <td>{{pegawaiYangDinilai.jabatan}}</td>
            <td class="label"> JABATAN</td>
            <td>{{pejabatPenilaiKinerja.jabatan}}</td>
        </tr>
        <tr>
            <td class="label"> UNIT KERJA </td>
            <td>{{pegawaiYangDinilai.unit_kerja}}</td>
            <td class="label"> UNIT KERJA</td>
            <td>{{pejabatPenilaiKinerja.unit_kerja}}</td>
        </tr>
        <tr>
            <td class="label"> RENCANA KINERJA </td>
            <td colspan="3" >{{rencanaKinerjaLabel}}</td>
        </tr>
        <tr>
            <td class="label"> DESKRIPSI RENCANA KINERJA </td>
            <td colspan="3" >{{deskripsRencanaKinerja}}</td>
        </tr>
        <tr>
            <td class="label">INDIKATOR KINERJA UTAMA</td>
            <td colspan="3" >{{indikatorKinerjaUtamaLabel}}</td>
        </tr>
        <tr>
            <td rowspan="6" class="label">DESKRIPSI</td>
            <td colspan="3" class="label">Definisi</td>
        </tr>
        <tr>
            <td colspan="3">{{deskripsiDefinisi}}</td>
        </tr>
        <tr>
            <td colspan="3" class="label">Formula</td>
        </tr>
        <tr>
            <td colspan="3">{{deskripsiFormula}}</td>
        </tr>
          <tr>
            <td colspan="3" class="label">Tujuan</td>
        </tr>
        <tr>
            <td colspan="3">{{deskripsiTujuan}}</td>
        </tr>
        <tr>
            <td class="label">SATUAN PENGUKURAN</td>
            <td colspan="3">{{satuanPengukuran}}</td>
        </tr>
        <tr>
            <td class="label">JENIS IKU</td>
            <td colspan="3">{{jenisIndikatorKinerjaUtama}}</td>
        </tr>
        <tr>
            <td class="label">PENANGGUNG JAWAB IKU</td>
            <td colspan="3">{{penanggungJawab}}</td>
        </tr>
        <tr>
            <td class="label">PIHAK PENYEDIA DATA</td>
            <td colspan="3">{{penanggungJawab}}</td>
        </tr>
        <tr>
            <td class="label">SUMBER DATA</td>
            <td colspan="3">{{sumberData}}</td>
        </tr>
        <tr>
            <td class="label">PERIODE PELAPORAN</td>
            <td colspan="3">{{periodePelaporan}}</td>
        </tr>
      </tbody>
    </table>
    </div>
      
  </modal>
</template>

<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  components:{
    PareLoader,
  },
  data() {
    return {
      
      headerText:'Manual Indikator Kinerja',
      modalFormVisible: false,
      manualIndikatorKinerjaId:"",
      sasaranKinerjaId:"",
      rencanaKinerjaId:"",
      indikatorKinerjaId:"",

      pegawaiYangDinilai:"",
      pejabatPenilaiKinerja:"",

      rencanaKinerjaLabel:"",
      deskripsiRencanaKinerja:"",
      indikatorKinerjaUtamaLabel:"",
      deskripsiDefinisi:"",
      deskripsiFormula:"",
      deskripsiTujuan:"",
      satuanPengukuran:"",
      jenisIndikatorKinerjaUtama:"",
      penanggungJawab:"",
      pihakPenyediaData:"",
      sumberData:"",
      periodePelaporan:""
    }
  },
  methods: {
   
    
    showModalDetail(id) {
     
      this.$refs.loader.start() 
      this.headerText = "Manual Indikator Kinerja"
      this.$axios
          .$get("/manual_indikator_kinerja?id="+id )
          .then((resp) => {
           
            this.manualIndikatorKinerjaId = resp.manual_indikator_kinerja_id
            this.sasaranKinerjaId = resp.sasaran_kinerja_id
            this.rencanaKinerjaId = resp.rencana_kinerja.id
            this.indikatorKinerjaId = resp.indikator_kinerja_individu.id

            this.pegawaiYangDinilai = resp.pegawai_yang_dinilai
            this.pejabatPenilaiKinerja = resp.pejabat_penilai_kinerja

            this.rencanaKinerjaLabel = resp.rencana_kinerja.label
            this.deskripsiRencanaKinerja = resp.deskripsi_rencana_kinerja
            this.indikatorKinerjaUtamaLabel = resp.indikator_kinerja_individu.label
            this.deskripsiDefinisi = resp.definisi
            this.deskripsiFormula = resp.formula
            this.deskripsiTujuan = resp.tujuan
            this.satuanPengukuran = resp.satuan_pengukuran 
            this.jenisIndikatorKinerjaUtama = resp.jenis_indikator_kinerja
            this.penanggungJawab = resp.penanggung_jawab
            this.pihakPenyediaData = resp.pihak_penyedia_data
            this.sumberData = resp.sumber_data
            this.periodePelaporan = resp.periode_pelaporan

            this.modalFormVisible = true;

            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 800);

            
          })
          .catch((error) => {
            this.$message({
              type: 'warning',
              message: error.response.data.message
            }); 
          }); 
    }
   
  },
  mounted() {
      
  }
};
</script>



<style scoped>



div.wrapper {
  display: block;
  overflow-x: auto;
  height: 100%;
}

table {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #666;
  text-shadow: 1px 1px 0px #fff;
  background: #eaebec;
  border: #ccc 1px solid;
  
  
}
 
table th {
  text-align: center;
  padding: 5px 10px;
  border-left:1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  background: #ededed;
}

.label{
  background: #ededed;
}
 
/* table th:first-child{  
  border-left:none;  
} */
 
/* table tr {
  text-align: center;
  padding-left: 20px;
} */
 
/* table td:first-child {
  text-align: left;
  padding-left: 20px;
  border-left: 0;
} */
 
table td {
  padding: 5px 10px;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  background: #fafafa;
  background: -webkit-gradient(linear, left top, left bottom, from(#fbfbfb), to(#fafafa));
  background: -moz-linear-gradient(top, #fbfbfb, #fafafa);
} 
 
table tr:last-child td {
  border-bottom: 0;
}
 
table tr:last-child td:first-child {
  -moz-border-radius-bottomleft: 3px;
  -webkit-border-bottom-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
 
table tr:last-child td:last-child {
  -moz-border-radius-bottomright: 3px;
  -webkit-border-bottom-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
 
table tr:hover td {
  background: #f2f2f2;
  background: -webkit-gradient(linear, left top, left bottom, from(#f2f2f2), to(#f0f0f0));
  background: -moz-linear-gradient(top, #f2f2f2, #f0f0f0);
}
</style>

