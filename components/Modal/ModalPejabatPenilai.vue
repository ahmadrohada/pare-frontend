<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{text_header}}</h4>
    </template>

      
      <el-form
        ref="PejabatPenilaiForm"
        :model="PejabatPenilaiForm"
        :rules="rules"
        size="mini"
      >

      <label>Nama Pegawai</label>
        <el-form-item  prop="namaPejabatPenilai" >
          <el-autocomplete
            class="inline-input"
            v-model="PejabatPenilaiForm.namaPejabatPenilai"
            :fetch-suggestions="querySearchPejabatPenilai"
            placeholder="Nama Pegawai Yang Dinilai"
            :trigger-on-focus="false"
            @select="handleSelectPejabatPenilai"
            :clearable="true"
            @clear="clearPejabatPenilai"
          ></el-autocomplete>
        </el-form-item>

        <label>NIP Pegawai</label>
        <el-form-item>
          <el-input
            v-model="PejabatPenilaiForm.nipPejabatPenilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Jabatan</label>
        <el-form-item  prop="jabatanAktifPejabatPenilaiId" >
          <el-select 
          
            v-model="PejabatPenilaiForm.jabatanAktifPejabatPenilaiId" 
            @change="onPilihJabatanPejabatPenilai($event)"  
            placeholder="Pilih Jabatan"
            :disabled="disabledSelectJabatanPejabatPenilai"
            >
            <el-option
              v-for="item in jabatansPejabatPenilai"
              :selected="item.id"
              :key="item.id"
              :label="item.nama"
              :value="item.id"
              
             
              >
            </el-option>
          </el-select>
        </el-form-item>
       

        <label>Pangkat / Golongan Ruang</label>
        <el-form-item  prop="pangkatGolonganPejabatPenilai" >
          <el-input
            v-model="PejabatPenilaiForm.pangkatGolonganPejabatPenilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Instansi</label>
        <el-form-item  prop="instansiPejabatPenilai" >
          <el-input
            v-model="PejabatPenilaiForm.instansiPejabatPenilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>
  
      </el-form>
    <template slot="footer">
      <el-button  size="mini" type="primary"  :loading="submitLoader" @click="submitForm('PejabatPenilaiForm')">Submit</el-button>
      <el-button size="mini" @click="resetForm('PejabatPenilaiForm')">Tutup</el-button>
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
      text_header:"Pejabat Penilai",
      modalFormVisible: false,
      disabledSelectJabatan:true,
      submitLoader:false,
      saveDisabled:true,
      disabledSelectJabatanPejabatPenilai:true,
      PejabatPenilaiForm: {
        //Pejabat Penilai
        sasaranKinerjaId:"",
        namaLengkapPejabatPenilai:"",
        jabatanAktifPejabatPenilaiId:"",
        jabatanSimAsnPejabatPenilaiId:"",
        jabatanSimAsnPejabatPenilaiJenis:"",
        jabatanPejabatPenilai:"",
        nipPejabatPenilai:"",
        pangkatPejabatPenilai:"",
        golonganPejabatPenilai:"",
        instansiPejabatPenilai:"",
      },
      jabatansPejabatPenilai:[],
      rules: {
          namaPegawai: [
            { required: true, message: 'Silakan pilih pejabat', trigger: 'blur' }
          ],
          jabatanAktifId: [
            { required: true, message: 'Silakan pilih jabatan', trigger: 'blur' }
          ],
      },
    };
  },
  methods: {
    showModalAdd(data) {
      this.clearPejabatPenilai()
      this.submitLoader = false
      this.$refs.loader.start() 
      this.text_header = "Add Pejabat Penilai"
      this.PejabatPenilaiForm.sasaranKinerjaId = data.id
    
      this.modalFormVisible = true; 
      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 800);

    },
    //====== PEJABAT PENILAI  ===============================//
    querySearchPejabatPenilai(queryString, cb) {
        //console.log(queryString)
        this.$axios
          .$get("/select_user?search="+queryString)
          .then((resp) => {
            //console.log(resp)
            cb(resp);
          })
    },
    handleSelectPejabatPenilai(queryString) {
        this.$refs.loader.start() 
        
        //mengisi  detail Pegawai
        const params = [`user_id=${queryString.id}`].join('&')
        this.$axios
          .get(`/pegawai_detail?${params}`)
          .then((resp) => {
            console.log(resp)
            this.PejabatPenilaiForm.nipPejabatPenilai = resp.data.nip;
            this.PejabatPenilaiForm.namaLengkapPejabatPenilai = resp.data.nama_lengkap;

            //first get data, ambil jabatan yang pertama
            if ( resp.data.jabatan.length == 0 ){
              this.$message({
                type: 'warning',
                message: 'Pegawai Tidak Memiliki Jabatan ( SIM ASN )',
                duration:1800,
              });   
            }else{
              this.$refs.PejabatPenilaiForm.clearValidate()
              this.disabledSelectJabatanPejabatPenilai = false
              this.jabatansPejabatPenilai =  resp.data.jabatan;
              this.PejabatPenilaiForm.jabatanAktifPejabatPenilaiId = resp.data.jabatan[0].id
              this.PejabatPenilaiForm.jabatanSimAsnPejabatPenilaiId = resp.data.jabatan[0].referensi?resp.data.jabatan[0].referensi.id:null
              this.PejabatPenilaiForm.jabatanSimAsnPejabatPenilaiJenis = resp.data.jabatan[0].referensi?resp.data.jabatan[0].referensi.jenis:null
              this.PejabatPenilaiForm.jabatanPejabatPenilai = resp.data.jabatan[0].nama
              this.PejabatPenilaiForm.pangkatPejabatPenilai = resp.data.jabatan[0].golongan?resp.data.jabatan[0].golongan.referensi.pangkat:""
              this.PejabatPenilaiForm.golonganPejabatPenilai = resp.data.jabatan[0].golongan?resp.data.jabatan[0].golongan.referensi.golongan:""
              this.PejabatPenilaiForm.pangkatGolonganPejabatPenilai = this.PejabatPenilaiForm.pangkatPejabatPenilai+" / "+this.PejabatPenilaiForm.golonganPejabatPenilai
              this.PejabatPenilaiForm.instansiPejabatPenilai = resp.data.jabatan[0].skpd?resp.data.jabatan[0].skpd.nama:null
              

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
    onPilihJabatanPejabatPenilai(selectedId){
      this.PejabatPenilaiForm.pangkatGolonganPejabatPenilai = null;
      this.PejabatPenilaiForm.instansiPejabatPenilai = null;

      const isSelect = selectedId
          this.$axios
            .$get("/user_jabatan_detail?jabatan_aktif_id="+selectedId+"&nip_pegawai="+this.PejabatPenilaiForm.nipPejabatPenilai)
            .then((resp) => {

              console.log(resp)
              this.PejabatPenilaiForm.jabatanAktifPejabatPenilaiId = selectedId
              this.PejabatPenilaiForm.pangkatGolonganPejabatPenilai = resp.pangkat+" / "+resp.golongan
              this.PejabatPenilaiForm.instansiPejabatPenilai = resp.skpd
              
              
          }) 

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/sasaran_kinerja_pejabat_penilai", this.PejabatPenilaiForm )
                    .then((response) => {
                      
                      this.modalFormVisible = false;
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.submitLoader = false
                        this.$message({
                          type: 'info',
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 500);
                    })
                    .catch((error) => {
                        this.submitLoader = false
                        this.$message({
                          type: 'error',
                          duration: 1800,
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
      this.$refs.PejabatPenilaiForm.clearValidate()
      this.submitLoader = false
      this.$refs[formName].resetFields();
      this.modalFormVisible = false;
    },
    
    clearPejabatPenilai(){
      this.PejabatPenilaiForm.nipPejabatPenilai = null;
      this.PejabatPenilaiForm.jabatanAktifPejabatPenilaiId = null;
      this.PejabatPenilaiForm.pangkatGolonganPejabatPenilai = null;
      this.PejabatPenilaiForm.instansiPejabatPenilai = null;
      this.jabatansPejabatPenilai = null;
      this.disabledSelectJabatanPejabatPenilai = true
      
    },
  },
  mounted() {
      
  }
};
</script>
<style scope>

</style>