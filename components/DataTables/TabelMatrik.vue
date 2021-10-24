<template>
  <div>

    <table border="1" width="100%">
      <tr v-for="item in tableData">
        <td>{{item.label}}</td>
        <td v-for="dt in item.rencana_kinerja">{{ dt.label }}</td>
      </tr>
    </table>

   

  </div>
</template>

<script>
  export default {
    props: ["tableData"],
    data() {
      return {
        tableData:[],
        rencana_kinerja:{
          label:null,
        }
          
      };
    },
    methods: {
      
    }

  };
</script>
