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
            name: $t('sidebar.profile'),
            icon: 'fa fa-user-circle',
            path: '/user/profile'
          }"
        >
      </sidebar-item>

     <sidebar-item 
          :link="{
            name: $t('sidebar.atasan'),
            icon: 'fa fa-sitemap',
            path: '/user/atasan'
          }"
        >
      </sidebar-item>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
};
</script>

<style lang="scss">
</style>
