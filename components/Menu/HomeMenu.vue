<template>
  <div>
      <sidebar-item 
          :link="{
            name: $t('sidebar.home'),
            icon: 'fa fa-home',
            path: '/home'
          }"
        >
      </sidebar-item>
      <div class="dropdown-divider"></div>
      <sidebar-item 
          :link="{
            name: $t('sidebar.user'),
            icon: 'fa fa-user-circle',
            path: '/user'
          }"
        >
      </sidebar-item>

      <sidebar-item 
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'fa fa-columns',
            path: '/personal/dashboard'
          }"
        >
      </sidebar-item>
  </div>
</template>

<script>
export default {
  name: "HomeMenu",
};
</script>

<style lang="scss">
</style>
