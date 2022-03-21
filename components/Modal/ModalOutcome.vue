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
        <input v-model="OutcomeForm.parentId" hidden></input>
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
      params:[],
      OutcomeForm:{
          skpdId:null,
          periode:null,
          roleId:null,
          parentId:null,
          level:null,
          outcomeLabel:null,
      }
      //loading: true
    };
  },
  methods: {
    
    showModalAdd(e) {
     
      this.OutcomeForm.parentId = null
      this.OutcomeForm.skpdId = e.skpd_id
      this.OutcomeForm.level = e.level
      this.OutcomeForm.roleId = e.id
      this.OutcomeForm.outcomeLabel = ""

      if ( e.level == "S2" ){
        //alert("cari parent outcome atasan nya")
        //munculkan list outcome atasan
        this.$refs.loader.start() 

        setTimeout(() => {
          this.$refs.loader.finish() 
        }, 700);
        this.modalFormVisible = true;
      }

      
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