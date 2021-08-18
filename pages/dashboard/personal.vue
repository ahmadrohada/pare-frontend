<template>
  <card style="min-height:480px;">
    <div class="loading-overlay" v-if="loading" :value="overlay">
      <img src="~/static/img/loaders/loader.gif" style="height:80px" alt="">
    </div>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">DASHBOARD</h4>
      <p class="card-category d-inline">PERSONAL</p>
    </template>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <div class="small-box bg-fuchsia" style="cursor:pointer;" >
            <div class="inner">
              <h3>126</h3>
              <p>TOTAL PEGAWAI</p>
            </div>
            <div class="icon">
              <i class="fa fa-users"></i>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="small-box bg-fuchsia" style="cursor:pointer;" >
            <div class="inner">
              <h3>126</h3>
              <p>TOTAL PEGAWAI</p>
            </div>
            <div class="icon">
              <i class="fa fa-users"></i>
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="small-box bg-fuchsia" style="cursor:pointer;" >
            <div class="inner">
              <h3>126</h3>
              <p>TOTAL PEGAWAI</p>
            </div>
            <div class="icon">
              <i class="fa fa-users"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
export default {
  name: "dashoard",
  layout: "dashboard",
  middleware: "auth",
};
</script>
<style>
.small-box {
  border-radius: 5px;
  position: relative;
  display: block;
  margin-bottom: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); 
  background: rgb(200, 199, 201);
  
}

.small-box::before {
  content: '';
  position: absolute;
  background-position: right;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.small-box > .inner {
  padding: 15px;
}
.small-box > .small-box-footer {
  position: relative;
  text-align: center;
  padding: 3px 0;
  color: #fff;
  color: rgba(255, 255, 255, 0.8);
  display: block;
  z-index: 10;
  background: rgba(0, 0, 0, 0.1);
  text-decoration: none;
}
.small-box > .small-box-footer:hover {
  color: #fff;
  background: rgba(0, 0, 0, 0.15);
}
.small-box h3 {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 38px;
  font-weight: bold;
  margin: 0 0 10px 0;
  white-space: nowrap;
  padding: 0;
}
.small-box p {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  text-align: left;
  text-shadow: 1px 1px 3px #1e1d22;
}
.small-box p > small {
  display: block;
  color: #f9f9f9;
  font-size: 13px;
  margin-top: 5px;
}
.small-box h3,
.small-box p {
  z-index: 5;
}
.small-box .icon {
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  position: absolute;
  top: -8px;
  right: 10px;
  z-index: 0;
  font-size: 70px;
  color:#f8f8f8;
  opacity: 0.7;
}
.small-box:hover {
  text-decoration: none;
  color: #f9f9f9;
}
.small-box:hover .icon {
  font-size: 75px;
}

</style>

