<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>

    <el-form
        ref="OutcomeForm"
        :model="OutcomeForm"
        :rules="rules"
        size="mini"
      >
        <el-form-item  
          label="Outcome Atasan"   
          prop="outcomeAtasanId"
          v-show="selectVisible == true">
          <el-select 
              v-model="OutcomeForm.outcomeAtasanId" 
              placeholder="Pilih Outcome Atasan"
              style="width:100%"
              >
              <el-option
                v-for="item in outcomeAtasan"
                :selected="item.id"
                :key="item.label"
                :label="item.label"
                :value="item.id"
                
              
                >
              </el-option>
          </el-select>
        </el-form-item>

        <el-form-item   label="Label"  prop="outcomeLabel">
          <el-input 
            :rows="2"
            type="textarea" 
            placeholder="Outcome Label" 
            v-model="OutcomeForm.outcomeLabel">
            </el-input>
        </el-form-item>

    
        <input v-model="OutcomeForm.skpdId" hidden></input>
        <input v-model="OutcomeForm.periode" hidden></input>
        <input v-model="OutcomeForm.roleId" hidden></input>
        <input v-model="OutcomeForm.level" hidden ></input>

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
      headerText:'Add Outcome',
      modalFormVisible: false,
      selectVisible:false,
      params:[],
      outcomeAtasan:[],
      OutcomeForm:{
          skpdId:null,
          periode:null,
          roleId:null,
          level:null,
          outcomeLabel:null,
          outcomeAtasanId:null
      }
      //loading: true
    };
  },
  methods: {
     outcomeAtasanList(skpdId,periode,roleId,selectedId){
       const isSelect = selectedId
       const params = [
          `periode=${periode}`,
          `skpd_id=${skpdId}`,
          `role_id=${roleId}`,
        ].join('&')

          this.$axios
            .get(`/list_outcome_atasan?${params}`)
            .then((data) => {
              this.outcomeAtasan =  data.data.outcomeAtasan;
              if ( isSelect == 0 ){
                this.OutcomeForm.outcomeAtasanId = data.data.outcomeAtasan[0].id // pilih data ke 1
              }else{
                this.OutcomeForm.outcomeAtasanId = isSelect
              }
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 200);
          }) 
        
    },
    showModalAdd(e) {
     
      this.OutcomeForm.parentId = null
      this.OutcomeForm.skpdId = e.skpd_id
      this.OutcomeForm.level = e.level
      this.OutcomeForm.roleId = e.id
      this.OutcomeForm.outcomeLabel = ""
      this.OutcomeForm.outcomeAtasanId = null

      

      if ( e.level != "S2" ){
        this.outcomeAtasanList(e.skpd_id,this.OutcomeForm.periode,e.id,0)
        this.selectVisible = true
        //munculkan list outcome atasan
      }else{
        this.selectVisible = false
      }

      this.$refs.loader.start() 

      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 700);
      this.modalFormVisible = true;
    }, 
    showModalEdit(e) {
      this.modalFormVisible = true;
      
    }, 
    submitData() {
      this.submitLoader = true
      this.$axios
        .$post("/hasil", this.OutcomeForm )
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
        this.OutcomeForm.selectedRoles = val;

        if ( this.OutcomeForm.selectedRoles != "" ){
          this.disabled = false
        }else{
          this.disabled = true
        }
        
        //console.log(this.selectedRoles)
    }
   
  },
  mounted() {
    this.OutcomeForm.periode = this.$route.params.periode
    this.OutcomeForm.roleId = this.$route.params.roleId
      
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