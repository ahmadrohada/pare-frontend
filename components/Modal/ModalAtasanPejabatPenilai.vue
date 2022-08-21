<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{text_header}}</h4>
    </template>

      
      <el-form
        ref="AtasanPejabatPenilaiForm"
        :model="AtasanPejabatPenilaiForm"
        :rules="rules"
        size="mini"
      >

      <label>Nama Pegawai</label>
        <el-form-item  prop="namaAtasanPejabatPenilai" >
          <el-autocomplete
            class="inline-input"
            v-model="AtasanPejabatPenilaiForm.namaAtasanPejabatPenilai"
            :fetch-suggestions="querySearchAtasanPejabatPenilai"
            placeholder="Nama Pegawai Yang Dinilai"
            :trigger-on-focus="false"
            @select="handleSelectAtasanPejabatPenilai"
            :clearable="true"
            @clear="clearAtasanPejabatPenilai"
          ></el-autocomplete>
        </el-form-item>

        <label>NIP Pegawai</label>
        <el-form-item>
          <el-input
            v-model="AtasanPejabatPenilaiForm.nipAtasanPejabatPenilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Jabatan</label>
        <el-form-item  prop="jabatanAktifAtasanPejabatPenilaiId" >
          <el-select 
          
            v-model="AtasanPejabatPenilaiForm.jabatanAktifAtasanPejabatPenilaiId" 
            @change="onPilihJabatanAtasanPejabatPenilai($event)"  
            placeholder="Pilih Jabatan"
            :disabled="disabledSelectJabatanAtasanPejabatPenilai"
            >
            <el-option
              v-for="item in jabatansAtasanPejabatPenilai"
              :selected="item.id"
              :key="item.id"
              :label="item.nama"
              :value="item.id"
              
             
              >
            </el-option>
          </el-select>
        </el-form-item>
       

        <label>Pangkat / Golongan Ruang</label>
        <el-form-item  prop="pangkatGolonganAtasanPejabatPenilai" >
          <el-input
            v-model="AtasanPejabatPenilaiForm.pangkatGolonganAtasanPejabatPenilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Instansi</label>
        <el-form-item  prop="instansiAtasanPejabatPenilai" >
          <el-input
            v-model="AtasanPejabatPenilaiForm.instansiAtasanPejabatPenilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>
  
      </el-form>
    <template slot="footer">
      <el-button  size="mini" type="primary"  :loading="submitLoader" @click="submitForm('AtasanPejabatPenilaiForm')">Submit</el-button>
      <el-button size="mini" @click="resetForm('AtasanPejabatPenilaiForm')">Tutup</el-button>
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
      disabledSelectJabatanAtasanPejabatPenilai:true,
      AtasanPejabatPenilaiForm: {
        //Pejabat Penilai
        sasaranKinerjaId:"",
        namaLengkapAtasanPejabatPenilai:"",
        jabatanAktifAtasanPejabatPenilaiId:"",
        jabatanSimAsnAtasanPejabatPenilaiId:"",
        jabatanSimAsnAtasanPejabatPenilaiJenis:"",
        jabatanAtasanPejabatPenilai:"",
        nipAtasanPejabatPenilai:"",
        pangkatAtasanPejabatPenilai:"",
        golonganAtasanPejabatPenilai:"",
        instansiAtasanPejabatPenilai:"",
      },
      jabatansAtasanPejabatPenilai:[],
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
      this.clearAtasanPejabatPenilai()
      this.submitLoader = false
      this.$refs.loader.start() 
      this.text_header = "Add Atasan Pejabat Penilai"
      this.AtasanPejabatPenilaiForm.sasaranKinerjaId = data.id
    
      this.modalFormVisible = true; 
      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 800);

    },
    showModalEdit(data) {
      this.clearAtasanPejabatPenilai()
      this.submitLoader = false
      this.$refs.loader.start() 
      this.text_header = "Ubah Atasan Pejabat Penilai"
      this.AtasanPejabatPenilaiForm.sasaranKinerjaId = data.id
    
      this.modalFormVisible = true; 
      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 800);

    },
    //====== PEJABAT PENILAI  ===============================//
    querySearchAtasanPejabatPenilai(queryString, cb) {
        //console.log(queryString)
        this.$axios
          .$get("/select_user?search="+queryString)
          .then((resp) => {
            //console.log(resp)
            cb(resp);
          })
    },
    handleSelectAtasanPejabatPenilai(queryString) {
        this.$refs.loader.start() 
        
        //mengisi  detail Pegawai
        const params = [`user_id=${queryString.id}`].join('&')
        this.$axios
          .get(`/pegawai_detail?${params}`)
          .then((resp) => {
            console.log(resp)
            this.AtasanPejabatPenilaiForm.nipAtasanPejabatPenilai = resp.data.nip;
            this.AtasanPejabatPenilaiForm.namaLengkapAtasanPejabatPenilai = resp.data.nama_lengkap;

            //first get data, ambil jabatan yang pertama
            if ( resp.data.jabatan.length == 0 ){
              this.$message({
                type: 'warning',
                message: 'Pegawai Tidak Memiliki Jabatan ( SIM ASN )',
                duration:1800,
              });   
            }else{
              this.$refs.AtasanPejabatPenilaiForm.clearValidate()
              this.disabledSelectJabatanAtasanPejabatPenilai = false
              this.jabatansAtasanPejabatPenilai =  resp.data.jabatan;
              this.AtasanPejabatPenilaiForm.jabatanAktifAtasanPejabatPenilaiId = resp.data.jabatan[0].id
              this.AtasanPejabatPenilaiForm.jabatanSimAsnAtasanPejabatPenilaiId = resp.data.jabatan[0].referensi?resp.data.jabatan[0].referensi.id:null
              this.AtasanPejabatPenilaiForm.jabatanSimAsnAtasanPejabatPenilaiJenis = resp.data.jabatan[0].referensi?resp.data.jabatan[0].referensi.jenis:null
              this.AtasanPejabatPenilaiForm.jabatanAtasanPejabatPenilai = resp.data.jabatan[0].nama
              this.AtasanPejabatPenilaiForm.pangkatAtasanPejabatPenilai = resp.data.jabatan[0].golongan?resp.data.jabatan[0].golongan.referensi.pangkat:""
              this.AtasanPejabatPenilaiForm.golonganAtasanPejabatPenilai = resp.data.jabatan[0].golongan?resp.data.jabatan[0].golongan.referensi.golongan:""
              this.AtasanPejabatPenilaiForm.pangkatGolonganAtasanPejabatPenilai = this.AtasanPejabatPenilaiForm.pangkatAtasanPejabatPenilai+" / "+this.AtasanPejabatPenilaiForm.golonganAtasanPejabatPenilai
              this.AtasanPejabatPenilaiForm.instansiAtasanPejabatPenilai = resp.data.jabatan[0].skpd?resp.data.jabatan[0].skpd.nama:null
              

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
    onPilihJabatanAtasanPejabatPenilai(selectedId){
      this.AtasanPejabatPenilaiForm.pangkatGolonganAtasanPejabatPenilai = null;
      this.AtasanPejabatPenilaiForm.instansiAtasanPejabatPenilai = null;

      const isSelect = selectedId
          this.$axios
            .$get("/user_jabatan_detail?jabatan_aktif_id="+selectedId+"&nip_pegawai="+this.AtasanPejabatPenilaiForm.nipAtasanPejabatPenilai)
            .then((resp) => {

              console.log(resp)
              this.AtasanPejabatPenilaiForm.jabatanAktifAtasanPejabatPenilaiId = selectedId
              this.AtasanPejabatPenilaiForm.pangkatGolonganAtasanPejabatPenilai = resp.pangkat+" / "+resp.golongan
              this.AtasanPejabatPenilaiForm.instansiAtasanPejabatPenilai = resp.skpd
              
              
          }) 

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/sasaran_kinerja_atasan_pejabat_penilai", this.AtasanPejabatPenilaiForm )
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
      this.$refs.AtasanPejabatPenilaiForm.clearValidate()
      this.submitLoader = false
      this.$refs[formName].resetFields();
      this.modalFormVisible = false;
    },
    
    clearAtasanPejabatPenilai(){
      this.AtasanPejabatPenilaiForm.nipAtasanPejabatPenilai = null;
      this.AtasanPejabatPenilaiForm.jabatanAktifAtasanPejabatPenilaiId = null;
      this.AtasanPejabatPenilaiForm.pangkatGolonganAtasanPejabatPenilai = null;
      this.AtasanPejabatPenilaiForm.instansiAtasanPejabatPenilai = null;
      this.jabatansAtasanPejabatPenilai = null;
      this.disabledSelectJabatanAtasanPejabatPenilai = true
      
    },
  },
  mounted() {
      
  }
};
</script>
<style scope>

</style>