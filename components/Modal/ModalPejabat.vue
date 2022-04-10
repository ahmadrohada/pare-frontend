<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">Tambah Pejabat</h4>
    </template>

      <el-form
        ref="PejabatForm"
        :model="PejabatForm"
        :rules="rules"
        size="mini"
      >
        <input type="text" v-model="PejabatForm.matriksPeranId" hidden>
        <input type="text" v-model="PejabatForm.skpdId" hidden>
        <input type="text" v-model="PejabatForm.perjanjianKinerjaId" hidden>
        <input type="text" v-model="PejabatForm.periodeTahun" hidden>
        <input type="text" v-model="PejabatForm.userId" hidden>
        <input type="text" v-model="PejabatForm.simpegId" hidden>
        <input type="text" v-model="PejabatForm.nipPejabat" hidden>
        <input type="text" v-model="PejabatForm.namaLengkapPejabat" hidden>
        <input type="text" v-model="PejabatForm.pnsId" hidden>
        <input type="text" v-model="PejabatForm.unitKerjaId" hidden>
        <input type="text" v-model="PejabatForm.pangkatGolonganPejabat" hidden>
        <input type="text" v-model="PejabatForm.instansiPejabat" hidden>

        <el-form-item  prop="dateFrom" hidden>
            <el-col :span="10">
              <el-date-picker 
                type="date" 
                placeholder="Tanggal Mulai" 
                v-model="PejabatForm.dateFrom" 
                format="dd-MM-yyyy"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line text-center" :span="4">s.d</el-col>
            <el-col :span="10" >
              <el-date-picker 
                type="date" 
                placeholder="Tanggal Selesai" 
                v-model="PejabatForm.dateTo" 
                format="dd-MM-yyyy"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
          </el-form-item>
      
        <el-form-item  prop="namaPejabat" label="Nama Pejabat" >
          <el-autocomplete
            class="inline-input"
            v-model="PejabatForm.namaPejabat"
            :fetch-suggestions="querySearch"
            placeholder="Nama Pejabat"
            :trigger-on-focus="false"
            @select="handleSelect"
            :clearable="true"
            @clear="clearPejabat"
          ></el-autocomplete>
        </el-form-item>
       
        <el-form-item  prop="jabatanAktifId" label="Jabatan">
          <el-select 
            v-model="PejabatForm.jabatanAktifId" 
            @change="onPilihJabatan($event)"  
            placeholder="Pilih Jabatan"
            :disabled="disabledSelectJabatan"
            >
            <el-option
              v-for="item in jabatans"
              :selected="item.id"
              :key="item.id"
              :label="item.nama"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Jenis Jabatan" v-if="showSelectJenisJabatan" prop="jenisJabatanSkp" >
            <el-select 
              v-model="PejabatForm.jenisJabatanSkp" 
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
        
        



        <el-form-item size="mini" style="margin-top:20px;">
          <el-button :disabled = "saveDisabled" v-if="formType=='add'" type="primary"  :loading="submitLoader"  @click="saveForm('PejabatForm')"
            >Save</el-button
          >
          <el-button @click="closeForm()" >Tutup</el-button>
        </el-form-item>
      </el-form>
    <template slot="footer"> </template>
  </modal>
</template>

<script>

var getStartDate = function(year) {
    var date = new Date(year, 0, 1);
    var theFirst = new Date(date.getFullYear(), 0, 1);
    return theFirst;
}
var getEndDate = function(year) {
    var date = new Date(year, 0, 1);
    var theLast = new Date(date.getFullYear(), 11, 31);
    return theLast;
}


import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  components:{
    PareLoader,
  },
  data() {
    return {
      formType: 'add',
      modalFormVisible: false,
      submitLoader:false,
      disabledSelectJabatan:true,
      showSelectJenisJabatan:false,
      saveDisabled:true,
      PejabatForm: {
        namaPejabat:null,
        jabatanAktifId:null,
        matriksPeranId:null,
        skpdId:null,
        perjanjianKinerjaId:null,
        periodeTahun:null,
        userId:null,
        simpegId:null,
        nipPejabat:null,
        namaLengkapPejabat:null,
        jabatanPejabat:null,
        jabatanSimAsnPejabatId:null,
        jabatanSimAsnPejabatJenis:null,
        pangkatPejabat:null,
        golonganPejabat:null,
        pnsId:null,
        unitKerjaId:null,
        instansiPejabat:null,
        pangkatGolonganPejabat:null,
        dateFrom:null,
        dateTo:null,
        jenisJabatanSkp:"",
      },
      jabatans: [],
      jenisJabatanSkpList: [{
          value: 'PEJABAT PIMPINAN TINGGI',
        }, {
          value: 'PIMPINAN UNIT KERJA MANDIRI',
        }, {
          value: 'PEJABAT ADMINISTRASI',
        }, {
          value: 'PEJABAT FUNGSIONAL',
      }],
      rules: {
          namaPejabat: [
            { required: true, message: 'Silakan pilih pejabat', trigger: 'blur' }
          ],
          jabatanAktifId: [
            { required: true, message: 'Silakan pilih jabatan', trigger: 'blur' }
          ],
          jenisJabatanSkp: [
            { required: true, message: 'Silakan jenis Jabatan SKP', trigger: 'blur' }
          ],
      },
      disabledSelect:true,
    };
  },
  methods: {
    showModalAdd(data) {
      this.clearPejabat()
      this.submitLoader = false
      this.$refs.loader.start() 
      
      //default start date and end date 
      const start = getStartDate(data.periode);
      const end = getEndDate(data.periode);

      this.PejabatForm.matriksPeranId = data.id
      this.PejabatForm.skpdId = data.skpd_id
      this.PejabatForm.perjanjianKinerjaId = data.perjanjian_kinerja_id
      this.PejabatForm.periodeTahun = data.periode
      this.PejabatForm.dateFrom = start
      this.PejabatForm.dateTo = end
    
      this.modalFormVisible = true; 

      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 800);

    },
    querySearch(queryString, cb) {
        //console.log(queryString)
        this.$axios
          .$get("/select_user?search="+queryString)
          .then((resp) => {
            console.log(resp)
            cb(resp);
          })
    },
    handleSelect(queryString) {
        this.$refs.loader.start() 
        this.PejabatForm.userId = queryString.id
       
        const params = [`user_id=${queryString.id}`].join('&')
        this.$axios
          .get(`/pegawai_detail?${params}`)
          .then((resp) => {
            console.log(resp)
            this.PejabatForm.nipPejabat = resp.data.nip;
            this.PejabatForm.namaLengkapPejabat = resp.data.nama_lengkap;
            this.PejabatForm.userId = queryString.id
            this.PejabatForm.simpegId = resp.data.id
            this.PejabatForm.pnsId = resp.data.pns_id
            this.PejabatForm.skpdId = resp.data.skpd.id
            this.PejabatForm.unitKerjaId = resp.data.unit_kerja?resp.data.unit_kerja.id : null 

            

            //first get data, ambil jabatan yang pertama
            if ( resp.data.jabatan.length == 0 ){
              this.$message({
                type: 'warning',
                message: 'Pegawai Tidak Memiliki Jabatan ( SIM ASN )',
                duration:800,
              });   
              this.$refs.loader.finish() 
            }else{
              this.$refs.PejabatForm.clearValidate()
              this.disabledSelectJabatan = false
              this.saveDisabled = false
              this.showSelectJenisJabatan = true
              this.jabatans =  resp.data.jabatan;
              this.PejabatForm.jabatanAktifId = resp.data.jabatan[0].id
              this.PejabatForm.jabatanSimAsnPejabatId = resp.data.jabatan[0].referensi.id
              this.PejabatForm.jabatanSimAsnPejabatJenis = resp.data.jabatan[0].referensi.jenis
              this.PejabatForm.jabatanPejabat = resp.data.jabatan[0].nama
              this.PejabatForm.pangkatPejabat = resp.data.jabatan[0].golongan.referensi.pangkat
              this.PejabatForm.golonganPejabat = resp.data.jabatan[0].golongan.referensi.golongan
              this.PejabatForm.pangkatGolonganPejabat = resp.data.jabatan[0].golongan.referensi.pangkat+" / "+resp.data.jabatan[0].golongan.referensi.golongan
              this.PejabatForm.instansiPejabat = resp.data.jabatan[0].skpd.nama
              setTimeout(() => {
                this.$refs.loader.finish() 
              }, 700);

            }
            
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
    clearPejabat(){
      this.$refs.PejabatForm.clearValidate()
      this.PejabatForm.jabatanAktifId = null
      this.PejabatForm.namaPejabat = null
      this.PejabatForm.userId = null
      this.PejabatForm.simpegId = null
      this.PejabatForm.unitKerjaId = null
      this.PejabatForm.instansiPejabat = null
      this.PejabatForm.pangkatGolonganPejabat = null
      this.jabatans = null
      this.disabledSelectJabatan = true
      this.saveDisabled = true
      this.showSelectJenisJabatan = false
      
    },
    closeForm(){
      this.$refs.PejabatForm.clearValidate()
      this.clearPejabat()
      this.modalFormVisible = false; 
    },

    onPilihJabatan(selectedId){
      //this.PejabatForm.pangkatGolonganPejabat = null;
      //this.PejabatForm.instansiPejabat = null;
      this.$refs.loader.start() 
      this.$axios
        .$get("/user_jabatan_detail?jabatan_aktif_id="+selectedId+"&nip_pegawai="+this.PejabatForm.nipPejabat)
        .then((resp) => {
          console.log(resp)
          this.PejabatForm.jabatanAktifId = selectedId
          this.PejabatForm.pangkatGolonganPejabat = resp.pangkat+" / "+resp.golongan
          this.PejabatForm.instansiPejabat = resp.skpd      
          this.saveDisabled = false  
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
    saveForm(formName) {
        this.submitLoader = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.loader.start() 
            this.$axios
                    .$post("/pejabat_sasaran_kinerja", this.PejabatForm )
                    .then((response) => {
                      //this.addKetua(response)
                      this.$emit('loadAsyncData')
                      setTimeout(() => {
                        this.modalFormVisible = false;
                        this.submitLoader = false
                        this.$refs.loader.finish() 
                        this.$message({
                          type: 'info',
                          message: 'berhasil menyimpan data Pejabat'
                        }); 
                      }, 500);
                    })
                    .catch((error) => {
                        this.submitLoader = false
                        this.$refs.loader.finish() 
                        this.$message({
                          type: 'error',
                          duration: 3000,
                          message: error.response.data.message
                        });    
                    });

        } else {
            console.log('error submit!!');
            setTimeout(() => {
              this.submitLoader = false
            }, 500);
            return false;
          }
      });
      
    }
  },
  mounted() {
      
  }
};
</script>
<style scope>

</style>