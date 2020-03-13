<template>
	<div class="chinaMapWrapper">
		<van-swipe @change="onChange" :loop="false" :show-indicators="false" ref="wordlMap1">
		  <van-swipe-item><div class="chart1" ref="wordlMap"></div></van-swipe-item>
		  <van-swipe-item><div class="chart1" ref="worldMap2"></div></van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	import '../../../node_modules/echarts/map/js/world.js'
	export default{
		data(){
			return{
				nowAreaData:[],//现存确诊人数(国家)
				totalAreaData:[],//总共确诊人数(国家)
				defineName:[]
			}
		},
		props:{
			chinaData:Object,
			worldData:Array,
			required:true,
		},
		methods:{
			onChange(index){
				//console.log(index)
				this.$emit('innerIndexW',index)
			},
			//数据处理
			getNowData(){
				let nowData=[];
				let totalData=[];
				let defineAreaName=[];//自定义地区名称
				//console.log(this.areaData)
				let _this = this;
				nowData.push({name:'China',value:_this.chinaData.currentConfirmedCount})
				totalData.push({name:'China',value:_this.chinaData.confirmedCount})
				this.worldData.forEach(item=>{
					if(item.countryName=="美国"){
						nowData.push({
							name:'United States',
							value:item.currentConfirmedCount
						})
						defineAreaName.push({
							EnglishName:item.countryEnglishName,
							ChineseName:item.countryName
						})
						totalData.push({
							name:'United States',
							value:item.confirmedCount
						})
					}
					else{
					nowData.push({
						name:item.countryEnglishName,
						value:item.currentConfirmedCount
					})
					totalData.push({
						name:item.countryEnglishName,
						value:item.confirmedCount
					})
					defineAreaName.push({
						EnglishName:item.countryEnglishName,
						ChineseName:item.countryName
					})
					}
				})
				//console.log(_this.chinaData.currentConfirmedCount)
				
				this.nowAreaData = nowData;
				this.totalAreaData = totalData;
				this.defineName=defineAreaName
			},
			//获取世界地图
			getChinaMap(data,ele,kind){//要渲染的数据，渲染的容器，病例种类（累计，现存）
				let myChart = this.$echarts.init(ele);
				window.onresize = myChart.resize;
				myChart.setOption({
					backgroundColor:'#F7F7F7',//背景颜色
					title:{
						/* text:'China',
						subTitle:'china',
						color:'#000', */
						x:'center'
					},
					 //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
					visualMap: {
						geo:{
							label:false
						},
						pieces:[
							{value:0,color:'#fff'},
							{gte:1,lte:9,color:'#FAEBD2'},
							{gte:10,lte:99,color:'#E9A188'},
							{gte:100,lte:499,color:'#D56355'},
							{gte:500,lte:999,color:'#BB3937'},
							{gte:1000,lte:10000,color:'#772526'},
							{gt:10000,color:'#480F10'}
						],
						orient:'horizontal',//设置数据点是垂直还是水平
						calculable: false, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
						inverse:false,
						textGap:5,
						hoverLink:false,
						itemGap:5,
						itemWidth:10,//设置小方块的宽高
						itemHeight:10,
						left:'center',
						right:'center',
						//show:false,//是否展示小方块等信息
						textStyle: {
							color: '#000',
							fontSize:'8',
							fontFamily:'Microsoft YaHei',
							lineHeight:'50',
							textAlign:'center'
						},
					},
					 // 提示框，鼠标移入
					tooltip:{
						triggerOn: 'click',
						enterable:false,//提示框内是否可以进行点击
						show:true, //鼠标移入是否触发数据
						trigger: 'item', //出发方式
						formatter:function(params,ticket,callback){
							//console.log(params)
							var html="";
							if(params.data==undefined){
							}
							else{
								return html =`
										<div class="tooltip">
											<div class="tooltipLeft">
												<div>${params.name}</div>
												<p>${kind}:${params.value}</p>
											</div>
										</div>			
									  `
							}
						},
						textStyle:{
							lineHeight:14,
						}
					},
					series:[
						{
							name:'WorldMap',
							roam:true,//是否开启缩放
							type: 'map',  //地图种类
							map: 'world', //地图类型。
							//nameMap:{'China':'中国'},
							showLegendSymbol: true, // 存在legend时显示
							data:data,
							itemStyle: { //地图区域的多边形 图形样式。
								fontSize:8,
								emphasis:{ //高亮状态下的样试
									label:{
										show:true,
									}
								}
							},
							zoom:1.2,//放大比例
							label:false
						},
						{
							type:'scatter',
							showEffectOn: 'render',//配置什么时候显示特效
							coordinateSystem:'geo',//该系列使用的坐标系
							symbolSize:10,//标记的大小
							data:[
								{name: '宜昌', value: [111.3,30.7,130]},
							],
							zlevel:99999
						},
					],
				}),
				window.addEventListener('resize', () => {
					// 自动渲染echarts
					myChart.resize();
				})
			}
		},
		created(){
			this.getNowData()
		},
		mounted(){
			
			this.getChinaMap(this.nowAreaData,this.$refs.wordlMap,"现存确诊");
			this.getChinaMap(this.totalAreaData,this.$refs.worldMap2,"累计确诊")
		}
	}
</script>

<style scoped="scoped">
	.chinaMapWrapper{
		width: 100%;
		height: 8.43rem;
	}
	.van-swipe{
		width: 100%;
		height: 100%;
	}
	.van-swipe-item{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chart1{
		width: 100%;
		min-width: 10rem;
		height: 8.43rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tooltip{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 0.22rem;
		line-height: 14px;
	}

</style>
