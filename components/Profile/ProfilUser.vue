<template>
  <card class="font-weight-300">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">DETAIL</h4>
      <p class="card-category d-inline">USER</p>
    </template>
        <p class="card-text"><i class="fa fa-user"></i> NAMA LENGKAP</p>
        <p class="text-muted">{{ user.nama_lengkap }}</p>
        <hr>
        <p class="card-text"><i class="fa fa-id-badge"></i> NIP</p>
        <p class="text-muted">{{ user.nip }}</p>
        <hr>

        <p class="card-text"><i class="fa fa-id-card"></i> JABATAN ( {{ (user.jabatan)?user.jabatan[0].referensi.jenis:'-'}} )</p>
        <p class="text-muted">{{ (user.jabatan)?user.jabatan[0].nama:'-'}}</p>
        <hr>

        <p class="card-text"><i class="fa fa-university"></i> SKPD</p>
        <p class="text-muted">{{ (user.skpd)?user.skpd.nama:'-'}}</p>
        <hr>

        <p class="card-text"><i class="fa fa-tags"></i> Unit Kerja</p>
        <p class="text-muted">{{ (user.unit_kerja)?(user.unit_kerja.nama):'' }}</p>
        <hr /> 
  </card>
</template>
<script> 

export default {
  props: ["user"],
   data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    
  }
  
};
</script>
<style></style>
