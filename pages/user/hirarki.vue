<template>
  <div class="row">
    <div class="col-md-5"><hirarki-pegawai> </hirarki-pegawai></div>
    <div class="col-md-7"><profil-pegawai> </profil-pegawai></div>
  </div>
</template>


<script>
import ProfilPegawai from '../../components/Profile/ProfilPegawai.vue';
import HirarkiPegawai from '../../components/Profile/HirarkiPegawai.vue';

export default {
  name: 'hirarki',
  middleware: 'auth',
  layout:'userLayout',
  head() {
    return {
      title: "hirarki",
    };
  },
  components: {
    ProfilPegawai,
    HirarkiPegawai
  }
};
</script>
<style></style>
