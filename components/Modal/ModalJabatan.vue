<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
        
      

          <el-table
            ref="jabatanTable"
            :data="tableListJabatan"
            :show-header="false"
            border
            :highlight-current-row="false"
            style="width: 100%; margin-top:10px;"
            @selection-change="handleSelectionChange">

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

     <el-form
        ref="JabatanForm"
        :model="JabatanForm"
        size="mini"
      >

          <input v-model="JabatanForm.skpdId" hidden></input>
          <input v-model="JabatanForm.periode" hidden></input>
          <!-- <input v-model="JabatanForm.idJabatanKepala" hidden></input> -->
          <input v-model="JabatanForm.selectedRoles" hidden></input>

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
      headerText:'Rencana Kinerja Form',
      modalFormVisible: false,
      tableListJabatan:[],
      disabled:true,
      params:[],
      
      JabatanForm:{
          skpdId:null,
          periode:null,
          //idJabatanKepala:null,
          selectedRoles: [],
      }
      //loading: true
    };
  },
  methods: {
    
    showModalAdd(skpd_id,periode) {
      this.JabatanForm.skpdId = skpd_id
      this.JabatanForm.periode = periode
      //this.JabatanForm.idJabatanKepala = 6235
      this.tableListJabatan = [];
      this.submitLoader = false
      this.formType = "create"
      this.headerText = "Add Koordinator"
      this.$refs.loader.start() 

      const params = [
          `periode=${this.JabatanForm.periode}`,
          `skpd_id=${this.JabatanForm.skpdId}`,
        ].join('&')
      this.$axios
          .get(`/list_jabatan?${params}`)
          .then(({data}) => {
            
            data.list_jabatan.forEach((item) => {
              this.tableListJabatan.push(item)
            })
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
    submitData() {
      this.submitLoader = true
      this.$axios
        .$post("/jabatan", this.JabatanForm )
        .then((response) => {
          this.$emit('loadAsyncData');
          setTimeout(() => {
                this.modalFormVisible = false;
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
        
        //console.log(this.selectedRoles)
    }
   
  },
  mounted() {
      
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