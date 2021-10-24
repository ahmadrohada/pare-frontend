<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">DASHBOARD</h4>
      <p class="card-category d-inline">PERSONAL</p>
    </template>
    
  </card>
</template>


<script>

export default {
  name: "personalIndex",
  middleware: ['auth'],
  layout: 'personalLayout',
  components:{
  },
  data() {
    return {
    };
  },
  methods: {
   
    
  },
  mounted() {
    this.$router.push(`/personal/profile`);

  },
};
</script>
<style></style>

