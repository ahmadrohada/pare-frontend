<template>
  <div class="row row-body">
    <div class="col-md-12">
      <card class="text-center">
        <div class="places-buttons">
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto text-center">
              <h4 class="card-title">
                404
              </h4>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>


<script>
export default {
  middleware: 'auth',
};
</script>

<style scoped>
.row-body{
  min-height:450px;
}
</style>
