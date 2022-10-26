<template>
  <modal :show.sync="modalFormVisible">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{ headerText }}</h4>
    </template>

    <el-form ref="AddUserForm" :model="AddUserForm" size="mini">
      <label>NIP Pegawai</label>
      <el-form-item>
        <el-input
          placeholder="Silakan input NIP Pegawai"
          v-model="AddUserForm.nipPegawai"
          class="input-with-select"
          prefix-icon="el-icon-search"
          clearable
        >
        </el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button
        size="mini"
        type="primary"
        :loading="submitLoader"
        @click="addPegawai()"
        >Submit</el-button
      >
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
      formType: "add",
      submitLoader: false,
      headerText: "Add User",
      modalFormVisible: false,

      AddUserForm: {
        nipPegawai : null,
      },
    };
  },
  methods: {
    showModalAdd(data) {
      this.formType = "add";
      this.headerText = "Add User";
      this.AddUserForm.nipPegawai = "";

      this.modalFormVisible = true;
    },
   
    addPegawai(){
      console.log(this.AddUserForm.nipPegawai)
        this.$refs.loader.start() 
        this.$axios
          .$post("/addPegawai", this.AddUserForm)
          .then((resp) => {
            console.log(resp);
            this.$refs.loader.finish() 
            this.modalFormVisible = false;
             this.$message({
                  type: 'success',
                  message: 'Berhasil ditambahkan'
                });
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
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}

.el-select-group__title {
  color: rgb(102, 102, 102) !important;
}

.modal .modal-header .close {
  visibility: hidden;
}
</style>