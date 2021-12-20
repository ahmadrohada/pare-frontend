<template>
    <modal 
    :show.sync="modalFormVisible">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">Create Sasaran Kinerja Pegawai</h4>
    </template>

    <el-form
        ref="SasaranKinerjaForm"
        :model="SasaranKinerjaForm"
        :rules="rules"
        size="mini"
      >
    <el-tabs v-model="activeName" @tab-click="handleClick" style="min-height:260px;">
      <el-tab-pane label="DETAIL" name="detail">
        <label>Periode PK</label>
          <el-form-item  prop="periodePkId" >
            <el-select 
              v-model="SasaranKinerjaForm.periodePkId" 
              placeholder="Pilih Periode Perjanjian Kinerja"
              v-on:change="pilihPeriode($event)"
              >
              <el-option
                v-for="item in periodePkList"
                :selected="item.id"
                :key="item.id"
                :label="item.periode"
                :value="item.id"
                @change="tes"
                >
              </el-option>
            </el-select>
          </el-form-item>

          <label>Periode Penilaian SKP</label>
          <el-form-item prop="dateFrom">
            <el-col :span="10">
              <el-date-picker 
                type="date" 
                placeholder="Tanggal Mulai" 
                v-model="SasaranKinerjaForm.dateFrom" 
                format="dd-MM-yyyy"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line text-center" :span="4">s.d</el-col>
            <el-col :span="10" >
              <el-date-picker 
                type="date" 
                placeholder="Tanggal Selesai" 
                v-model="SasaranKinerjaForm.dateTo" 
                format="dd-MM-yyyy"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
          </el-form-item>

          <label>Jenis Jabatan</label>
          <el-form-item  prop="jenisJabatanSkp" >
            <el-select 
              v-model="SasaranKinerjaForm.jenisJabatanSkp" 
              placeholder="Pilih Jenis Jabatan Sasaran Kinerja"
              >
              <el-option
                v-for="item in jenisJabatanSkpList"
                :selected="item.value"
                :key="item.value"
                :label="item.value"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="PEGAWAI YANG DINILAI" name="pegawai">
        <label>Nama Pegawai</label>
        <el-form-item  prop="namaPegawaiYangDinilai" >
          <el-autocomplete
            class="inline-input"
            v-model="SasaranKinerjaForm.namaPegawaiYangDinilai"
            :fetch-suggestions="querySearchPegawaiYangDinilai"
            placeholder="Nama Pegawai Yang Dinilai"
            :trigger-on-focus="false"
            @select="handleSelectPegawaiYangDinilai"
            :clearable="true"
            @clear="clearPegawaiYangDinilai"
          ></el-autocomplete>
        </el-form-item>

        <label>NIP Pegawai</label>
        <el-form-item>
          <el-input
            v-model="SasaranKinerjaForm.nipPegawaiYangDinilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Jabatan</label>
        <el-form-item  prop="jabatanAktifPegawaiYangDinilaiId" >
          <el-select 
            v-model="SasaranKinerjaForm.jabatanAktifPegawaiYangDinilaiId" 
            @change="onPilihJabatanPegawaiYangDinilai($event)"  
            placeholder="Pilih Jabatan"
            :disabled="disabledSelectJabatanPegawaiYangDinilai"
            >
            <el-option
              v-for="item in jabatansPegawaiYangDinilai"
              :selected="item.id"
              :key="item.id"
              :label="item.nama"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <label>Pangkat / Golongan Ruang</label>
        <el-form-item  prop="pangkatGolonganPegawaiYangDinilai" >
          <el-input
            v-model="SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Instansi</label>
        <el-form-item  prop="instansiPegawaiYangDinilai" >
          <el-input
            v-model="SasaranKinerjaForm.instansiPegawaiYangDinilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <input v-model="SasaranKinerjaForm.userId" hidden></input>
        <input v-model="SasaranKinerjaForm.periodeLabel" hidden></input>
        <input v-model="SasaranKinerjaForm.simpegId" hidden></input>
        <input v-model="SasaranKinerjaForm.pnsId" hidden></input>


        <input v-model="SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiId" hidden></input>
        <input v-model="SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiJenis" hidden></input>
        <input v-model="SasaranKinerjaForm.jabatanPegawaiYangDinilai" hidden></input>
        <input v-model="SasaranKinerjaForm.golonganPegawaiYangDinilai" hidden></input>
        <input v-model="SasaranKinerjaForm.pangkatPegawaiYangDinilai" hidden></input>
        <input v-model="SasaranKinerjaForm.namaLengkapPegawaiYangDinilai" hidden></input>
       
      </el-tab-pane>





      <el-tab-pane label="PEJABAT PENILAI KINERJA" name="pejabat_penilai_kinerja">
        <label>Nama Pegawai</label>
        <el-form-item  prop="namaPejabatPenilaiKinerja" >
          <el-autocomplete
            class="inline-input"
            v-model="SasaranKinerjaForm.namaPejabatPenilaiKinerja"
            :fetch-suggestions="querySearchPejabatPenilaiKinerja"
            placeholder="Nama Pegawai Yang Dinilai"
            :trigger-on-focus="false"
            @select="handleSelectPejabatPenilaiKinerja"
            :clearable="true"
            @clear="clearPejabatPenilaiKinerja"
          ></el-autocomplete>
        </el-form-item>

        <label>NIP Pegawai</label>
        <el-form-item>
          <el-input
            v-model="SasaranKinerjaForm.nipPejabatPenilaiKinerja"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Jabatan</label>
        <el-form-item  prop="jabatanAktifPejabatPenilaiKinerjaId" >
          <el-select 
          
            v-model="SasaranKinerjaForm.jabatanAktifPejabatPenilaiKinerjaId" 
            @change="onPilihJabatanPejabatPenilaiKinerja($event)"  
            placeholder="Pilih Jabatan"
            :disabled="disabledSelectJabatanPejabatPenilaiKinerja"
            >
            <el-option
              v-for="item in jabatansPejabatPenilaiKinerja"
              :selected="item.id"
              :key="item.id"
              :label="item.nama"
              :value="item.id"
              
             
              >
            </el-option>
          </el-select>
        </el-form-item>
       

        <label>Pangkat / Golongan Ruang</label>
        <el-form-item  prop="pangkatGolonganPejabatPenilaiKinerja" >
          <el-input
            v-model="SasaranKinerjaForm.pangkatGolonganPejabatPenilaiKinerja"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Instansi</label>
        <el-form-item  prop="instansiPejabatPenilaiKinerja" >
          <el-input
            v-model="SasaranKinerjaForm.instansiPejabatPenilaiKinerja"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>
        

        <input v-model="SasaranKinerjaForm.skpdId" hidden></input>
        <input v-model="SasaranKinerjaForm.unitKerjaId" hidden></input>
        
        <input v-model="SasaranKinerjaForm.namaLengkapPejabatPenilaiKinerja" hidden></input>
        <input v-model="SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiKinerjaId" hidden></input>
        <input v-model="SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiKinerjaJenis" hidden></input>
        <input v-model="SasaranKinerjaForm.jabatanPejabatPenilaiKinerja" hidden></input>
        <input v-model="SasaranKinerjaForm.golonganPejabatPenilaiKinerja" hidden></input>
        <input v-model="SasaranKinerjaForm.pangkatPejabatPenilaiKinerja" hidden></input>
        
      </el-tab-pane>
    </el-tabs> 
    
    </el-form>
   
       
       
       
    <template slot="footer"> 
          <el-button  size="mini" type="primary"  :loading="submitLoader" @click="submitForm('SasaranKinerjaForm')"
            >Create</el-button
          >
          <el-button size="mini" @click="resetForm('SasaranKinerjaForm')">Tutup</el-button>
    </template>
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
      modalFormVisible: false,
      activeName: 'detail',
      submitLoader:false,
      periodePkList:[],
      disabledSelectJabatanPegawaiYangDinilai:true,
      disabledSelectJabatanPejabatPenilaiKinerja:true,
      jenisJabatanSkpList: [{
          value: 'PEJABAT PIMPINAN TINGGI',
        }, {
          value: 'PIMPINAN UNIT KERJA MANDIRI',
        }, {
          value: 'PEJABAT ADMINISTRASI',
        }, {
          value: 'PEJABAT FUNGSIONAL',
        }],
      data:{
          detail:null,
          pegawaiYangDinilai:null,
          pejabatPenilaiKinerja:null
      },
      SasaranKinerjaForm: {
        periodePkId: "",
        periodeLabel:"",
        jenisJabatanSkp:"",
        dateFrom:"",
        dateTo:"",
        userId:"",
        pnsId:"",
        simpegId:"",
        skpdId:"",
        unitKerjaId:"",

        //Pegawai yang dinilai
        namaLengkapPegawaiYangDinilai:"",
        jabatanAktifPegawaiYangDinilaiId:"",
        jabatanSimAsnPegawaiYangDinilaiId:"",
        jabatanSimAsnPegawaiYangDinilaiJenis:"",
        jabatanPegawaiYangDinilai:"",
        nipPegawaiYangDinilai:"",
        pangkatPegawaiYangDinilai:"",
        golonganPegawaiYangDinilai:"",
        instansiPegawaiYangDinilai:"",

        //Pejabat Penilai
        namaLengkapPejabatPenilaiKinerja:"",
        jabatanAktifPejabatPenilaiKinerjaId:"",
        jabatanSimAsnPejabatPenilaiKinerjaId:"",
        jabatanSimAsnPejabatPenilaiKinerjaJenis:"",
        jabatanPejabatPenilaiKinerja:"",
        nipPejabatPenilaiKinerja:"",
        pangkatPejabatPenilaiKinerja:"",
        golonganPejabatPenilaiKinerja:"",
        instansiPejabatPenilaiKinerja:"",

      },
      rules: {
         periodePkId: [
            { required: true, message: 'Silakan pilih Periode PK', trigger: 'blur' }
          ],
          jenisJabatanSkp: [
            { required: true, message: 'Silakan jenis Jabatan SKP', trigger: 'blur' }
          ],
          dateFrom: [
            { required: true, message: '', trigger: 'blur' }
          ],
          dateTo: [
            { required: true, message: '', trigger: 'blur' }
          ], 
         
      },
   
    };
  },
  methods: {
    showModal(skpdId) {

      this.submitLoader = false
      this.$refs.loader.start() 
      this.modalFormVisible = true; 


      //get data periode PK List from this SKPD
      this.$axios
        .$get("/perjanjian_kinerja?skpd_id="+skpdId)
        .then((data) => {
            this.periodePkList = data.data
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 700);
            
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error.response.data.message
          });    
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 700);
        }); 

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/sasaran_kinerja", this.SasaranKinerjaForm )
                    .then((response) => {
                      
                      this.modalFormVisible = false;
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.submitLoader = false
                        this.$message({
                          type: 'info',
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 200);
                    })
                    .catch((error) => {
                        this.submitLoader = false

                       
                       
                        this.$message({
                          type: 'error',
                          duration: 3000,
                          message: error.response.data.message
                        });    
                    });

        } else {
            console.log('error submit!!');
            return false;
          }
      });
       
      
    },
    resetForm(formName) {
      this.submitLoader = false
      this.$refs[formName].resetFields();
      this.modalFormVisible = false;
    },
    pilihPeriode(event){
      
       this.$axios
        .$get("/perjanjian_kinerja_detail?id="+event)
        .then((resp) => {

          this.SasaranKinerjaForm.periodeLabel = resp.periode.tahun
          console.log(resp.periode.tahun) 
              
        }) 
    },

    //===== pegawai yang dinilai =============================//
    querySearchPegawaiYangDinilai(queryString, cb) {
        //console.log(queryString)
        this.$axios
          .$get("/select_user?search="+queryString)
          .then((resp) => {
            //console.log(resp)
            cb(resp);
          })
    },
    handleSelectPegawaiYangDinilai(queryString) {
        this.$refs.loader.start() 
        
        //mengisi  detail Pegawai
        const params = [`user_id=${queryString.id}`].join('&')
        this.$axios
          .get(`/pegawai_detail?${params}`)
          .then((resp) => {
            console.log(resp)
            this.SasaranKinerjaForm.nipPegawaiYangDinilai = resp.data.nip;
            this.SasaranKinerjaForm.namaLengkapPegawaiYangDinilai = resp.data.nama_lengkap;
            this.SasaranKinerjaForm.userId = queryString.id
            this.SasaranKinerjaForm.simpegId = resp.data.id
            this.SasaranKinerjaForm.pnsId = resp.data.pns_id
            this.SasaranKinerjaForm.skpdId = resp.data.skpd.id
            this.SasaranKinerjaForm.unitKerjaId = resp.data.unit_kerja?resp.data.unit_kerja.id : null 

            //first get data, ambil jabatan yang pertama
            if ( resp.data.jabatan.length == 0 ){
              this.$message({
                type: 'warning',
                message: 'Pegawai Tidak Memiliki Jabatan ( SIM ASN )',
                duration:800,
              });   
            }else{
              this.$refs.SasaranKinerjaForm.clearValidate()
              this.disabledSelectJabatanPegawaiYangDinilai = false
              this.jabatansPegawaiYangDinilai =  resp.data.jabatan;
              this.SasaranKinerjaForm.jabatanAktifPegawaiYangDinilaiId = resp.data.jabatan[0].id
              this.SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiId = resp.data.jabatan[0].referensi.id
              this.SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiJenis = resp.data.jabatan[0].referensi.jenis
              this.SasaranKinerjaForm.jabatanPegawaiYangDinilai = resp.data.jabatan[0].nama
              this.SasaranKinerjaForm.pangkatPegawaiYangDinilai = resp.data.jabatan[0].golongan.referensi.pangkat
              this.SasaranKinerjaForm.golonganPegawaiYangDinilai = resp.data.jabatan[0].golongan.referensi.golongan
              this.SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai = resp.data.jabatan[0].golongan.referensi.pangkat+" / "+resp.data.jabatan[0].golongan.referensi.golongan
              this.SasaranKinerjaForm.instansiPegawaiYangDinilai = resp.data.jabatan[0].skpd.nama
              

            }
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 700);
          })
          .catch((error) => {
          this.$message({
            type: 'error',
            duration:1800,
            message: error.response.data.message
          });    
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 700);
        }); 
    },
    onPilihJabatanPegawaiYangDinilai(selectedId){
      this.SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai = null;
      this.SasaranKinerjaForm.instansiPegawaiYangDinilai = null;

      const isSelect = selectedId
          this.$axios
            .$get("/user_jabatan_detail?jabatan_aktif_id="+selectedId+"&nip_pegawai="+this.nipPegawaiYangDinilai)
            .then((resp) => {

              console.log(resp)
              this.SasaranKinerjaForm.jabatanAktifPegawaiYangDinilaiId = selectedId
              this.SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai = resp.pangkat+" / "+resp.golongan
              this.SasaranKinerjaForm.instansiPegawaiYangDinilai = resp.skpd
              
              
          }) 

    },
    clearPegawaiYangDinilai(){
      this.SasaranKinerjaForm.nipPegawaiYangDinilai = null;
      this.SasaranKinerjaForm.jabatanAktifPegawaiYangDinilaiId = null;
      this.SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai = null;
      this.SasaranKinerjaForm.instansiPegawaiYangDinilai = null;
      this.jabatansPegawaiYangDinilai = null;
      this.disabledSelectJabatanPejabatPenilaiKinerja = true
      
    },


    //====== PEJABAT PENILAI KINERJA ===============================//
    querySearchPejabatPenilaiKinerja(queryString, cb) {
        //console.log(queryString)
        this.$axios
          .$get("/select_user?search="+queryString)
          .then((resp) => {
            //console.log(resp)
            cb(resp);
          })
    },
    handleSelectPejabatPenilaiKinerja(queryString) {
        this.$refs.loader.start() 
        
        //mengisi  detail Pegawai
        const params = [`user_id=${queryString.id}`].join('&')
        this.$axios
          .get(`/pegawai_detail?${params}`)
          .then((resp) => {
            console.log(resp)
            this.SasaranKinerjaForm.nipPejabatPenilaiKinerja = resp.data.nip;
            this.SasaranKinerjaForm.namaLengkapPejabatPenilaiKinerja = resp.data.nama_lengkap;

            //first get data, ambil jabatan yang pertama
            if ( resp.data.jabatan.length == 0 ){
              this.$message({
                type: 'warning',
                message: 'Pegawai Tidak Memiliki Jabatan ( SIM ASN )',
                duration:1800,
              });   
            }else{
              this.$refs.SasaranKinerjaForm.clearValidate()
              this.disabledSelectJabatanPejabatPenilaiKinerja = false
              this.jabatansPejabatPenilaiKinerja =  resp.data.jabatan;
              this.SasaranKinerjaForm.jabatanAktifPejabatPenilaiKinerjaId = resp.data.jabatan[0].id
              this.SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiKinerjaId = resp.data.jabatan[0].referensi?resp.data.jabatan[0].referensi.id:null
              this.SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiKinerjaJenis = resp.data.jabatan[0].referensi?resp.data.jabatan[0].referensi.jenis:null
              this.SasaranKinerjaForm.jabatanPejabatPenilaiKinerja = resp.data.jabatan[0].nama
              this.SasaranKinerjaForm.pangkatPejabatPenilaiKinerja = resp.data.jabatan[0].golongan?resp.data.jabatan[0].golongan.referensi.pangkat:""
              this.SasaranKinerjaForm.golonganPejabatPenilaiKinerja = resp.data.jabatan[0].golongan?resp.data.jabatan[0].golongan.referensi.golongan:""
              this.SasaranKinerjaForm.pangkatGolonganPejabatPenilaiKinerja = this.SasaranKinerjaForm.pangkatPejabatPenilaiKinerja+" / "+this.SasaranKinerjaForm.golonganPejabatPenilaiKinerja
              this.SasaranKinerjaForm.instansiPejabatPenilaiKinerja = resp.data.jabatan[0].skpd?resp.data.jabatan[0].skpd.nama:null
              

            }
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 700);
          })
          .catch((error) => {
          this.$message({
            type: 'error',
            message: error.response.data.message
          });    
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 700);
        }); 
    },
    onPilihJabatanPejabatPenilaiKinerja(selectedId){
      this.SasaranKinerjaForm.pangkatGolonganPejabatPenilaiKinerja = null;
      this.SasaranKinerjaForm.instansiPejabatPenilaiKinerja = null;

      const isSelect = selectedId
          this.$axios
            .$get("/user_jabatan_detail?jabatan_aktif_id="+selectedId+"&nip_pegawai="+this.nipPejabatPenilaiKinerja)
            .then((resp) => {

              console.log(resp)
              this.SasaranKinerjaForm.jabatanAktifPejabatPenilaiKinerjaId = selectedId
              this.SasaranKinerjaForm.pangkatGolonganPejabatPenilaiKinerja = resp.pangkat+" / "+resp.golongan
              this.SasaranKinerjaForm.instansiPejabatPenilaiKinerja = resp.skpd
              
              
          }) 

    },
    clearPejabatPenilaiKinerja(){
      this.SasaranKinerjaForm.nipPejabatPenilaiKinerja = null;
      this.SasaranKinerjaForm.jabatanAktifPejabatPenilaiKinerjaId = null;
      this.SasaranKinerjaForm.pangkatGolonganPejabatPenilaiKinerja = null;
      this.SasaranKinerjaForm.instansiPejabatPenilaiKinerja = null;
      this.jabatansPejabatPenilaiKinerja = null;
      this.disabledSelectJabatanPejabatPenilaiKinerja = true
      
    },
  },
  mounted() {
      
  }
};
</script>
<style scope>

.modal.show .modal-dialog {
    transform: translate(0, 10%) !important;
}

.modal-body {
    min-height: 430px !important;
}

.modal-dialog {
    max-width: 520px !important;
    margin-bottom: 13px !important;
    
}

.list-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    line-height: 1.25em;
    white-space: nowrap;
    margin-bottom: 14px;
}
  
  .title{
    color:rgb(36, 36, 37);
    margin-bottom: 5px;
    font-weight: 100;
    line-height: 1.0em;
    font-size: 0.85em;
 
  }

  .el-select {
    width: 100%;
  }

  label{
    margin-bottom: 0rem !important;
    color:#92989b;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 13px !important;
  }
</style>