<template>
  <div>
       <sidebar-item 
          :link="{
            name: $t('sidebar.home'),
            icon: 'tim-icons icon-app',
            path: '/home'
          }"
        >
        </sidebar-item>

        <sidebar-item 
          :link="{
            name: $t('sidebar.personalDashboard'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/personal/dashboard'
          }"
        >
        </sidebar-item>
        <sidebar-item 
          :link="{
            name: $t('sidebar.adminBkpsdm'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/admin_bkpsdm/dashboard'
          }"
        >
        </sidebar-item>
         <sidebar-item 
          :link="{
            name: $t('sidebar.adminSkpd'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/admin_skpd/dashboard'
          }"
        >
        </sidebar-item>

        
  </div>
</template>

<script>
export default {
  name: "DashboardMenu",
};
</script>

<style lang="scss">
</style>
