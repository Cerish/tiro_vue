<template>
  <div id="card">
  	<header>
  		<img class="avatar" v-bind:src="require('@/assets/images/avatar.jpg')" v-bind:alt="user.username">
  		<p class="name">{{user.username}}</p>
  	</header>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'card',
  data () {
    return {
		
    }
  },
  computed:{
	  ...mapGetters({
		  user: 'userInfo'
	  })
  }
}
</script>

<style lang="scss" scoped>
#card {
	padding: 12px;
  .avatar{
  	width: 40px;
  	height: 40px;
  	vertical-align: middle;/*这个是图片和文字居中对齐*/
  }
  .name {
  	display: inline-block;
  	padding: 10px;
  	margin-bottom: 15px;
  	font-size: 16px;
  }
  
}
</style>
