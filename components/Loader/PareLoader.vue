
<template>
    <div class="loading-overlay" v-if="loading" :value="overlay">
        <img src="~/static/img/loaders/loader.gif" style="height:95px" alt="">
    </div>
</template>


<script>
	export default {
	data: () => ({
	loading: false,
	overlay: false,
	}),
	methods: {
	start() {
	this.loading = true
	this.overlay = true
	},
	finish() {
	this.loading = false
	this.overlay = false
	},
	fail(error) {
	console.log(error)
	},
	increase(num) {
	// console.log(num)
	},
	},
	}
	</script>


<style>
.loading-overlay {
    z-index: 10;
    position: absolute;
    
    background: rgba(213, 236, 229, 0.137);
    display: flex;
    align-items: center;
    justify-content: center;

    width:  100%;
    height:  100%; 
    top: 0%;
    left: 0%;
  }
 

</style>
