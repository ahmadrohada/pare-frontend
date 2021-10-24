<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">DASHBOARD</h4>
      <p class="card-category d-inline">ADMIN SKPD</p>
    </template>
    
    
  </card>
</template>


<script>

export default {
 
  data() {
    return {
    };
  },
  methods: {
   
    
  },
  mounted() {
    this.$router.push("/skpd/user");
  },
};
</script>
<style></style>

