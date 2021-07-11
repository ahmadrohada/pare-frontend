<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card>
        PERSONAL DASHBOARD
      </card>
    </div>
  </div>
</template>
<script>

export default {
  name: "dashoard",
  layout: "dashboard",
  middleware: 'auth',
};
</script>
<style></style>

