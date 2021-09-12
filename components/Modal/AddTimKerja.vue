<template>
  <el-dialog title="Tambah Time Kerja" :visible.sync="dialogFormVisible">
    <el-form ref="TimKerjaForm" :model="TimKerjaForm" :rules="rules" label-width="120px" size="mini">

      <el-input v-model="TimKerjaForm.parentId" hidden></el-input>
      <el-input v-model="TimKerjaForm.renjaId" hidden></el-input>

      <el-form-item label="Parent Label">
        <el-input v-model="TimKerjaForm.parentLabel" readonly></el-input>
      </el-form-item>
      <el-form-item label="Child Label" prop="label" >
        <el-input v-model="TimKerjaForm.label" ></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="submitForm('TimKerjaForm')">Create</el-button>
        <el-button @click="resetForm('TimKerjaForm')">Close</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      TimKerjaForm: {
        label: "",
        parentLabel: "",
        parentId:"",
        renjaId:""
      },
      formLabelWidth: "120px",
      rules: {
          label: [
            { required: true, message: 'Please input Label name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ]
      },
    };
  },
  methods: {
    showDialog: function (data) {
      console.log(data)
      this.TimKerjaForm.parentLabel = data.label;
      this.TimKerjaForm.parentId = data.id;
      this.TimKerjaForm.renjaId = data.renja_id;
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      }
  },
};
</script>