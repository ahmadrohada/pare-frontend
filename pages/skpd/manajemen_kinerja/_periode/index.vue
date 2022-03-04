<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Manajemen Kinerja PNS {{periodeTahun}}</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>
      <!-- <el-timeline>
        <el-timeline-item
          v-for="(list, index) in manajemenKinerja"
          :key="index"
          :timestamp="list.timestamp"
          :type="list.type"
          placement="top">
          <el-card>
            <h4>{{list.content}}</h4>
            <p>Tom committed 2018/4/12 20:46</p>
            {{list.content}}
          </el-card>
        </el-timeline-item> 
      </el-timeline> -->
  </card>
</template>

<script>
import { mapGetters } from 'vuex' 
import PareLoader from "~/components/Loader/PareLoader.vue";


export default {
  layout: "skpdManajemenKinerjaLayout",
  middleware: "auth",
   components: {
     PareLoader
  },
  data() {
    return {
      periodeTahun: null,
      manajemenKinerja: [],

     
    };
  },
  computed: {
      ...mapGetters({
        skpdId:'id_skpd',
        user:'user',
      })
  },
  methods: {
    loadAsyncData() {
      const params = [
        `skpd_id=${this.skpdId}`,
        `periode_tahun=${this.periodeTahun}`
      ].join('&')

      this.$refs.loader.start() 
      this.$axios
        .get(`/manajemen_kinerja?${params}`)
        .then(({ data }) => {
         
          this.manajemenKinerja = data

          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 400);
        })
        .catch((error) => {
          this.$refs.loader.finish() 
          this.manajemenKinerja = []
          throw error
        })
    }
    
  },
  mounted() {
    this.periodeTahun = this.$route.params.periode
    this.$router.push(`/skpd/manajemen_kinerja/${this.periodeTahun}/perjanjian_kinerja`);
    //this.loadAsyncData()
  },
  
};
</script>
<style lang="scss" scoped>
  .el-card p {
    color: #5e6d82 !important;
    line-height: 1.5em;
  }
  .el-card{
    font-size: 11px  !important;
  }
</style>