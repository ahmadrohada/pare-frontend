<template>
  <card style="min-height: 500px">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Manual</h4>
      <p class="card-category d-inline">PDF</p>
    </template>

        <vue-pdf class="your-pdf-class" :src="pdfSrc" :page="1" @num-pages="pdfPageCount = $event"></vue-pdf>
        <div v-if="pdfPageCount > 1">
            <div v-for="(pageNum, index) in pdfPageCount " :key="index">
                <vue-pdf class="your-pdf-class" :src="pdfSrc" :page="pageNum" v-if="pageNum > 1"></vue-pdf>
            </div>
        </div>
 



  </card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  middleware: "auth",
  layout: "home",
  head() {
    return {
      title: "PARE - Manual PDF",
      id_skpd: null,
    };
  },
  data() {
  },
  computed: {
    ...mapGetters({
      namaLengkap: "nama_lengkap",
      id_skpd: "id_skpd",
    }),
  },
  methods: {
    cek_skpd(val) {
      if (this.id_skpd != 28 ) {
        this.$auth.logout();
        if ( this.$route.path == "/"){
            this.$router.go("/login")
          }
      }
    },
  },
  mounted() {
    //this.cek_skpd();
  },
};
</script>
<style></style>

