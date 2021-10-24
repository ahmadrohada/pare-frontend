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
  name: "renjaIndex",
  middleware: ['auth'],
  layout: "renjaLayout",
  components:{
  },
  data() {
    return {

    };
  },
  methods: {
    
    
  },
  mounted() {
    this.$router.push(`/skpd/renja`);
    
  },
};
</script>
<style></style>

