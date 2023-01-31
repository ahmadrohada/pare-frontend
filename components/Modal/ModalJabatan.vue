<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>

    <el-form
        ref="JabatanForm"
        :model="JabatanForm"
        size="mini"
      >

    <el-form-item  label="Atasan / Parent"  prop="roleParent">
          <el-input
          size="mini"
          readonly
          type="input"
          v-model="JabatanForm.roleParent"
        ></el-input>
      </el-form-item>
     
        
      <el-form-item  label="Level Jabatan"  prop="role">
        <el-select 
          v-model="JabatanForm.role" 
          placeholder="pilih Level Jabatan">
          <el-option label="" value="" ></el-option>
          <el-option :disabled = ketuaDisabled label="Ketua" value="ketua" ></el-option>
          <el-option :disabled = anggotaDisabled label="Anggota" value="anggota"></el-option>
        </el-select>
      </el-form-item>
      </el-form>
         
    <template slot="footer"> 
      <el-button  
        size="mini" 
        type="primary"  
        :loading="submitLoader" 
        @click="submitData()"
      >Submit
      </el-button>
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
      formType: 'create',
      submitLoader:false,
      headerText:'Tambah Peran pada Tim Kerja',
      modalFormVisible: false,
      params:[],
      ketuaDisabled:true,
      anggotaDisabled:true,
      
      JabatanForm:{
          skpdId:null,
          periode:null,
          roleParentId:null,
          roleParent:null,
          levelParent:null,
          role:[],
      }
      //loading: true
    };
  },
  methods: {
    
    showModalAdd(data) {
      this.$refs.loader.start() 
      this.JabatanForm.roleParentId = data.id
      this.JabatanForm.skpdId = data.skpd_id
      this.JabatanForm.roleParent = data.role
      this.JabatanForm.levelParent = data.level

      if ( data.roleName == "KETUA" ){
        this.ketuaDisabled    = true
        this.anggotaDisabled  = false
      }else if ( data.roleName == "KOORDINATOR" ){
        this.ketuaDisabled    = false
        this.anggotaDisabled  = false
      }else{
        this.ketuaDisabled    = true
        this.anggotaDisabled  = true
      }

      const params = [
                  `periode=${this.JabatanForm.periode}`,
                  `skpd_id=${this.JabatanForm.skpdId}`,
                  `jabatan_atasan_id=${this.JabatanForm.roleParentId}`,
                ].join('&')
              this.$refs.loader.start() 
              this.$axios
                  .get(`/list_jabatan?${params}`)
                  .then(({data}) => {
                    
                    this.JabatanForm.role = data.role
                    this.JabatanForm.level = data.level
                   
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

      
      
      this.$refs.loader.finish() 
      this.modalFormVisible = true;
    },  
    submitData() {
      this.submitLoader = true
      this.$refs.loader.start() 
      this.$axios
        .$post("/peran", this.JabatanForm )
        .then((response) => {
          this.$emit('loadAsyncData');
          setTimeout(() => {
                this.modalFormVisible = false;
                this.submitLoader = false
                this.$refs.loader.finish() 
                this.$message({
                  type: 'success',
                  message: 'berhasil menyimpan data'
                }); 
          }, 200);
                      
                      
        })
        .catch((error) => {
            this.submitLoader = false
            this.$refs.loader.finish() 
            this.$message({
              type: 'error',
              duration: 2000,
              message: "Tidak Berhasil Menyimpan Data"
            });    
        });
      
      
    },
   
  },
   mounted() {
    this.JabatanForm.periode = this.$route.params.periode
      
  }
};
</script>
<style lang="scss" scope>

 .el-select {
    width: 100%;
  }

  .el-select-group__title{
      color: rgb(102, 102, 102) !important;
    }


  .modal .modal-header .close {
      visibility: hidden;
  }

</style>