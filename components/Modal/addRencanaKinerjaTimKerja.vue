<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
      <el-form
        ref="RencanaKinerjaTimKerjaForm"
        :model="RencanaKinerjaTimKerjaForm"
        :rules="rules"
        size="mini"
      >
        <input v-model="RencanaKinerjaTimKerjaForm.timKerjaId" hidden></input>
         <input v-model="RencanaKinerjaTimKerjaForm.rencanaKinerjaId" hidden></input>
       
        <div v-if="selectVisible">
          <label>Rencana Kinerja Atasan</label>
          <el-form-item  prop="rencanaKinerjaAtasanId" >
            <el-select 
              v-model="RencanaKinerjaTimKerjaForm.rencanaKinerjaAtasanId" 
              placeholder="Pilih Rencana Kinerja Atasan"
              >
              <el-option
                v-for="item in rencanaKinerjaAtasan"
                :selected="item.id"
                :key="item.label"
                :label="item.label"
                :value="item.id"
                
              
                >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        

        <label>Rencana Kinerja -  {{timKerjaLabel}}</label>
        <el-form-item     prop="rencanaKinerjaLabel">
          <el-input size="mini" type="textarea" placeholder="Rencana Kinerja Label" v-model="RencanaKinerjaTimKerjaForm.rencanaKinerjaLabel"></el-input>
        </el-form-item>
        


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader" @click="saveForm('RencanaKinerjaTimKerjaForm')"
            >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('RencanaKinerjaTimKerjaForm')"
            >Update</el-button
          >
          <el-button @click="resetForm('RencanaKinerjaTimKerjaForm')">Tutup</el-button>
        </el-form-item>
      </el-form>
    <template slot="footer"> </template>
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
      selectVisible:true,
      submitLoader:false,
      headerText:'Rencana Kinerja Form',
      timKerjaLabel:'',
      modalFormVisible: false,
      rencanaKinerjaAtasan:[],
      RencanaKinerjaTimKerjaForm: {
        rencanaKinerjaAtasanId: "",
        rencanaKinerjaId:"",
        rencanaKinerjaLabel:"",
        timKerjaId: ""
      },
      rules: {
          rencanaKinerjaAtasanId: [
            { required: true, message: 'Silakan pilih Rencana Kinerja Atasan', trigger: 'blur' }
          ],
          rencanaKinerjaLabel: [
            { required: true, message: 'Silakan isi Rencana Kinerja', trigger: 'blur' }
          ],
      },
      
    };
  },
  methods: {
    rencanaKinerjaAtasanList(id,selectedId){
        //jika ketua , maka list rencana kinerja atasan nya null
        if ( id == 0 ){
          this.rencanaKinerjaAtasan = [{ id: 0, label: null }]
          this.RencanaKinerjaTimKerjaForm.rencanaKinerjaAtasanId = 0 // pilih data ke 1
          this.selectVisible = false
          
        }else{
          const isSelect = selectedId
          this.$axios
            .$get("/tim_kerja_rencana_kinerja_parent?parent_id="+id)
            .then((resp) => {
              this.selectVisible = true
              this.rencanaKinerjaAtasan =  resp.rencana_kinerja;
              if ( isSelect == 0 ){
                this.RencanaKinerjaTimKerjaForm.rencanaKinerjaAtasanId = resp.rencana_kinerja[0].id // pilih data ke 1
              }else{
                this.RencanaKinerjaTimKerjaForm.rencanaKinerjaAtasanId = isSelect
              }
              
              
              
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 200);
          }) 
        }
    },
    showModalAdd(data) {
        this.rencanaKinerjaAtasanList(data.parent_id,0)
        this.RencanaKinerjaTimKerjaForm.timKerjaId = data.id;
        this.modalFormVisible = true;
    },
    showModalEdit(id) {

      this.$axios
          .$get("/rencana_kinerja?id="+id )
          .then((resp) => {
            //console.log(resp)
            if ( resp.parent == null ){
              this.rencanaKinerjaAtasanList(0,0)
              
            }else{
              this.rencanaKinerjaAtasanList(resp.parent.tim_kerja_id,resp.parent.id)
            }
            this.RencanaKinerjaTimKerjaForm.rencanaKinerjaLabel = resp.label
            this.RencanaKinerjaTimKerjaForm.rencanaKinerjaId = id
            this.RencanaKinerjaTimKerjaForm.timKerjaId = resp.tim_kerja_id
            this.modalFormVisible = true;
            
          })
          .catch((errors) => {
            this.$message({
              type: 'warning',
              message: 'terjadi kesalahan'
            }); 
          }); 

      //this.modalFormVisible = true;
       
    },
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/rencana_kinerja", this.RencanaKinerjaTimKerjaForm )
                    .then((response) => {
                      this.$emit('getPejabatList', this.RencanaKinerjaTimKerjaForm.timKerjaId )
                      setTimeout(() => {
                        this.resetForm('RencanaKinerjaTimKerjaForm')
                        this.$message({
                          type: 'info',
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 200);
                    })
                    .catch((errors) => {
                      this.submitLoader = false
                      console.log(errors);
                      this.$message({
                        type: 'warning',
                        message: 'terjadi kesalahan'
                      }); 
                    }); 


          } else {
            console.log('error submit!!');
            return false;
          }
      });
        
    },
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$put("/rencana_kinerja", this.RencanaKinerjaTimKerjaForm )
                    .then((response) => {
                      this.$emit('getPejabatList', this.RencanaKinerjaTimKerjaForm.timKerjaId )
                      setTimeout(() => {
                        this.resetForm('RencanaKinerjaTimKerjaForm')
                        this.$message({
                          type: 'info',
                          message: 'Rencana Kinerja berhasil diubah'
                        }); 
                      }, 200);
                    })
                    .catch((errors) => {
                      this.submitLoader = false
                      console.log(errors);
                      this.$message({
                        type: 'warning',
                        message: 'terjadi kesalahan'
                      }); 
                    }); 


          } else {
            console.log('error submit!!');
            return false;
          }
      });
        
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.modalFormVisible = false;
      this.submitLoader = false
    },
  
    
    
  },
  mounted() {
      
  }
};
</script>
<style>


.modal .modal-header .close {
    visibility: hidden;
}
</style>