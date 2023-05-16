<template>
    <modal :show.sync="modalFormVisible">
        <pare-loader ref="loader"></pare-loader>
        <template slot="header">
            <h4 class="modal-title">Rencana Aksi</h4>
        </template>

 
        <template slot="footer">
            <el-button v-if="periodeTahunList != '' " size="mini" type="primary" :loading="submitLoader" @click="submitForm('SasaranKinerjaForm')">
                Create</el-button>
            <el-button size="mini" @click="resetForm('RencanaAksiForm')">Tutup</el-button>
        </template>
    </modal>
</template>

<script>
var getStartDate = function (year) {
  var date = new Date(year, 0, 1);
  var theFirst = new Date(date.getFullYear(), 0, 1);
  return theFirst;
};
var getEndDate = function (year) {
  var date = new Date(year, 0, 1);
  var theLast = new Date(date.getFullYear(), 11, 31);
  return theLast;
};

import PareLoader from "~/components/Loader/PareLoader.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PareLoader,
  },
  computed: {
    ...mapGetters({
      user_id: "user_id",
      skpd_id: "id_skpd",
    }),
  },
  data() {
    return {
      modalFormVisible: false,
      
      data: {

      },
      RencanaAksiForm: {
        
      },
      rules: {
  
      },
    };
  },
  methods: {
    showModalAdd() {
      this.submitLoader = false;
      this.modalFormVisible = true;
    },
    
  },
  mounted() {},
};
</script>