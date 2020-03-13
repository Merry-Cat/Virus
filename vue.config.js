module.exports={
	configureWebpack: (config)=>{
	if(process.env.NODE_ENV === 'production'){
		config.externals = {
			'vue':'Vue',
			'echarts':'echarts',
			'vue-aswsome-swiper':'VueAwesomeSwiper',
			'axios':'axios',
		}
	}
  }
}