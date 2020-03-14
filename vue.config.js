module.exports={
	configureWebpack: (config)=>{
	if(process.env.NODE_ENV === 'production'){
		config.externals = {
			'echarts':'echarts',
			'vue-aswsome-swiper':'VueAwesomeSwiper',
			'axios':'axios',
		}
	}
  }
}