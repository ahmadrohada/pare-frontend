<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline"></h4>
      <p class="card-category d-inline"></p>
    </template>

     index
    
  </card>
</template>


<script>

export default {
  name: "personalProfileIndex",
  middleware: ['auth'],
  layout: "personalProfileLayout",
  components:{
    
  },
  data() {
    return {

    };
  },
  methods: {
    
    
  },
  mounted() {
    this.$router.push(`/personal/profile/detail`);
    
  },
};
</script>
<style></style>

