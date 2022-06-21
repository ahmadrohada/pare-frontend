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

    <label>Parent / Atasan</label>
      <el-select 
        size="mini"
        v-model="JabatanForm.parentId" 
        placeholder="Pilih Atasan"
        @change="onChangeJabatanAtasan($event)"
        :clearable = true
      >
        <el-option
            v-for="item in parentList"
            :selected="item.label"
            :key="item.id"
            :label="item.nama_lengkap"
            :value="item.id" 
        >
        </el-option>
      </el-select>
        
      <el-form-item  label="Level Jabatan"  prop="role">
        <el-select 
          v-model="JabatanForm.role" 
          placeholder="pilih Level Jabatan">
          <el-option label="Ketua" value="ketua" ></el-option>
          <el-option label="Anggota" value="anggota"></el-option>
        </el-select>
      </el-form-item>

   

     

      <el-table
            ref="jabatanTable"
            :data="tableListJabatan"
            :show-header="false"
            border
            :highlight-current-row="false"
            style="width: 100%; margin-top:10px;"
            @selection-change="handleSelectionChange"
            v-show="tableListJabatanVisible"
            >

            <el-table-column
              align="center"
              type="selection"
              width="40">
            </el-table-column>
            
            <el-table-column   label="JABATAN">
              <template slot-scope="{ row }">
                <div style="padding:0px !important;">
                  <span style="margin-top:-6px;" class="">{{row.nama_lengkap}}</span>
                </div>
              </template>
            </el-table-column>
      </el-table>

    
          <!-- <input v-model="JabatanForm.level" hidden></input>
          <input v-model="JabatanForm.skpdId" hidden></input>
          <input v-model="JabatanForm.periode" hidden></input>
          <input v-model="JabatanForm.roleId" hidden></input>
          <input v-model="JabatanForm.selectedRoles" hidden></input> -->

      </el-form>
         
    <template slot="footer"> 
      <el-button  
        :disabled="disabled"
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
      tableListJabatan:[],
      parentList:[],
      disabled:true,
      tableListJabatanVisible:false,
      params:[],
      
      JabatanForm:{
          skpdId:null,
          periode:null,
          roleId:null,
          parentId:null,
          level:null,
          role:[],
          selectedRoles:null
      }
      //loading: true
    };
  },
  methods: {
    
    showModalAdd(skpd_id) {
      this.tableListJabatan = [];
      this.tableListJabatanVisible = false
      this.JabatanForm.parentId = null
      this.JabatanForm.skpdId = skpd_id

      //get data list jabatan yang dibawah roleId beserta dianya
      const params = [
          `role_id=${this.JabatanForm.roleId}`,
          `periode=${this.JabatanForm.periode}`,
          `skpd_id=${this.JabatanForm.skpdId}`,
        ].join('&')

      this.$refs.loader.start() 

      this.$axios
          .get(`/list_jabatan_atasan?${params}`)
          .then(({data}) => {
            
            this.parentList = data.list_jabatan
            
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
      
      this.modalFormVisible = true;
    },  

    onChangeJabatanAtasan(jabatanAtasanId) {

      this.tableListJabatan = [];
      this.tableListJabatanVisible = false
      if ( jabatanAtasanId != "" ){
        const params = [
                  `periode=${this.JabatanForm.periode}`,
                  `skpd_id=${this.JabatanForm.skpdId}`,
                  `jabatan_atasan_id=${jabatanAtasanId}`,
                ].join('&')
              this.$refs.loader.start() 
              this.$axios
                  .get(`/list_jabatan?${params}`)
                  .then(({data}) => {
                    
                    this.JabatanForm.role = data.role
                    this.JabatanForm.level = data.level
                    data.list_jabatan.forEach((item) => {
                      this.tableListJabatan.push(item)
                    })
                    this.tableListJabatanVisible = true
                    setTimeout(() => {
                      this.$refs.loader.finish() 
                    }, 700);
                  })
                  .catch((error) => {
                    this.JabatanForm.parentId = null
                    this.$message({
                      type: 'error',
                      message: error.response.data.message
                    });    
                    setTimeout(() => {
                      this.$refs.loader.finish() 
                    }, 700);
              }); 
      }
    },
    submitData() {
      this.submitLoader = true
      this.$refs.loader.start() 
      this.$axios
        .$post("/jabatan", this.JabatanForm )
        .then((response) => {
          this.$emit('loadAsyncData');
          setTimeout(() => {
                this.modalFormVisible = false;
                this.submitLoader = false
                this.$refs.loader.finish() 
                this.$message({
                  type: 'info',
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
    handleSelectionChange(val) {
        this.JabatanForm.selectedRoles = val;
        if ( this.JabatanForm.selectedRoles != "" ){
          this.disabled = false
        }else{
          this.disabled = true
        }
    }
   
  },
  mounted() {
    this.JabatanForm.periode = this.$route.params.periode
    this.JabatanForm.roleId =  this.$route.params.roleId
      
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