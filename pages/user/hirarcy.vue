<template>
  <div class="row">
    <div class="col-md-4"><hirarcy-pegawai> </hirarcy-pegawai></div>
    <div class="col-md-8"><profil-pegawai> </profil-pegawai></div>
  </div>
</template>


<script>
import ProfilPegawai from '../../components/Profile/ProfilPegawai.vue';
import HirarcyPegawai from '../../components/Profile/HirarcyPegawai.vue';

export default {
  name: 'hirarcy',
  middleware: 'auth',
  layout:'userLayout',
  head() {
    return {
      title: "Hirarcy",
    };
  },
  components: {
    ProfilPegawai,
    HirarcyPegawai
  }
};
</script>
<style></style>
