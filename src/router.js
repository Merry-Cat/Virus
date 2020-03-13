import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home/home.vue'
import chinaMap from './pages/maps/chinaMap.vue';
import provinceMap from './pages/maps/provinceMap.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',//去掉#号
  routes: [
    {
      path: '/',
	  redirect:'/home',
    },
	{
		path:'/home',
		component:Home,
	},
	{
		path:'/provinceMap',
		name:'province',
		component:provinceMap
	},
	{
	  path: '/inside',
	  redirect:'/home',
	},
	{
	  path: '/outside',
	  redirect:'/home',
	},
	{
		path:'/map',
		component: chinaMap
	},
	
  ],
  //路由导航守卫
  beforeEach(to,from,path){
	  next()
  }
})
