<template>
  <card style="min-height: 500px">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja</h4>
      <p class="card-category d-inline">Bawahan</p>

      <el-tabs type="border-card" style="margin-top: 20px">
        <el-tab-pane>
          <span slot="label">Sumary</span>

          <skp-sumary></skp-sumary>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">Rencana Hasil Kerja</span>
          <skp-hasil-kerja></skp-hasil-kerja>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">Perilaku Kerja</span>
          <skp-perilaku-kerja></skp-perilaku-kerja>
        </el-tab-pane>
      </el-tabs>
    </template>
  </card>
</template>


<script>
import SkpSumary from "~/components/Tabs/SkpSumary.vue";
import SkpHasilKerja from '~/components/Tabs/SkpHasilKerja.vue';
import SkpPerilakuKerja from '~/components/Tabs/SkpPerilakuKerja.vue';

export default {
  middleware: ["auth"],
  components: {
    SkpSumary,
    SkpHasilKerja,
    SkpPerilakuKerja
  },
  layout: "skpdSasaranKinerjaLayout",
  methods: {
    routing(sasaran_kinerja_id) {
      /* if ( sasaran_kinerja_id != 'undefined'){
        this.$router.push(`/personal/sasaran_kinerja/${sasaran_kinerja_id}/sumary`);
      }else{
        this.$router.push(`/error`);
      } */
    },
  },
  mounted() {
    this.routing(this.$route.params.id);
  },
};
</script>
<style></style>

