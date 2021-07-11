<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card>
        ADMIN SKPD DASHBOARD
      </card>
    </div>
  </div>
</template>
<script>

import DashboardMenu from '~/components/Menu/DashboardMenu.vue';

export default {
  name: "dashoard",
  layout: "dashboard",
  middleware: 'auth',
  components: {
      DashboardMenu
  },
};
</script>
<style></style>

