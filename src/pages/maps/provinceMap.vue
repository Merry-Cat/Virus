<template>
	<div class="wrap1">
		<div class="header">
			<div class="main">
				<div class="title">新冠肺炎</div>
				<div class="subTitle">
					<span class="city">{{TotalData.provinceShortName}}</span>
					<span>疫情实时动态</span>
				</div>
				<div class="desc">数据来源：国家及各地卫健委每日信息发布</div>
			</div>
			<div class="tags">
				<div class="tag" @click="showPopup1">
					<div>
						<p>切换省份</p>
					</div>
				</div>
				<div class="tag"><router-link to="/home" tag="span">返回疫情动态</router-link></div>
			</div>
		</div>
		<div class="map-info">
			<div class="endTime-intro">
				<span>截至 <span v-if="TotalData"><span>{{TotalData.updateTime|dateFormat}}</span></span> 全国数据统计</span>
				<em @click="showPopup"><img src="data:image/png;base64,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">数据说明</em>
			</div>
			<div class="virusdata">
				<ul>
					<li>
						<strong style="color:rgb(247,76,49)">{{TotalData.currentConfirmedCount}}</strong>
						<span>现存确诊</span>
					</li>
					<li>
						<strong style="color:rgb(174,33,44)">{{TotalData.confirmedCount}}</strong>
						<span>累计确诊</span>
					</li>
					<li>
						<strong style="color:rgb(93,112,146)">{{TotalData.deadCount}}</strong>
						<span>累计死亡</span>
					</li>
					<li>
						<strong style="color:rgb(40,183,163)">{{TotalData.curedCount}}</strong>
						<span>累计治愈</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- 疫情地图 -->
		<div class="inside-map-title">
			<i></i>
			国内疫情地图
		</div>
		<!-- 疫情地图 -->
		<div class="header-map">
			<ul>
				<li :class="[innerIndex==0?'active-li':'']" @click="clickActive(0)">现存确诊</li>
				<li :class="[innerIndex==1?'active-li':'']" @click="clickActive(1)">累计确诊</li>
			</ul>
			<div v-if="innerIndex===0">当前确诊病例数（排除死亡、治愈）</div>
			<div v-else>累计确诊病例数（包含死亡、治愈）</div>
		</div>
		<!-- 地图 -->
		<div class="chinaMapWrapper">
			<van-swipe @change="onChange" :loop="false" :show-indicators="false" ref="provinceMap">
			  <van-swipe-item><div class="chart1" ref="myEchart"></div></van-swipe-item>
			  <van-swipe-item><div class="chart1" ref="myEchart2"></div></van-swipe-item>
			</van-swipe>
		</div>
		<!-- 现存确诊 -->
		<div class="inside-map-title" style="border-bottom: 0.02666rem solid #ebebeb;">
			<i></i>
			现存确诊
		</div>
		<!-- 图表1 -->
		<div class="linechartContainer">
			<div class="lineChart1" ref="lineChart1"></div>
		</div>
		
		<!-- 新增（确诊、死亡、治愈） -->
		<div class="inside-map-title" style="border-bottom: 0.02666rem solid #ebebeb;margin-top:10px">
			<i></i>
			新增（确诊、死亡、治愈）
		</div>
		<!-- 图表2 -->
		<div class="linechartContainer">
			<div class="lineChart1" ref="lineChart2"></div>
		</div>
		<div class="inside-map-title" style="border-bottom: 0.02666rem solid #ebebeb; margin-top:10px">
			<i></i>
			累计（确诊、死亡、治愈）
		</div>
		<!-- 图表3 -->
		<div class="linechartContainer">
			<div class="lineChart1" ref="lineChart3"></div>
		</div>
		
		<!-- 表格 -->
		<div class="inside-map-title" style="border-bottom: 0.02666rem solid #ebebeb; margin-top:10px">
			<i></i>
			湖北疫情数据
		</div>
		<Tab :getData="TotalData" v-if="flag"></Tab>
		<Footer></Footer>
		<!-- 信息来源弹窗 -->
		<van-popup v-model="show"  close-icon="close" close-icon-position="bottom-center" round>
			<dataIntro></dataIntro>
		</van-popup>
		<!-- 省选择 -->
		<van-popup v-model="showArea" position="bottom" :style="{height:'40%',width:'100%'}">
			<van-area  value="420000" :area-list="areaList" :columns-num="1" @confirm='onConfirm' @cancel='onCancel'/>
		</van-popup>
		
	</div>
</template>

<script>
	import dataIntro from '../home/dataIntro.vue';
	import Tab from './tab3.vue';
	import Footer from '../home/footer.vue'
	import '../../../node_modules/echarts/map/js/province/hubei.js';
	import AreaList from '../../../public/area.js'
	var hubei  = require('../../../static/hubeisheng.json');
	export default{
		data(){
			return{
				TotalData:{},//省数据概览
				show:false,//地图切换
				showArea:false,
				innerIndex:0,//地图切换索引
				nowDataArr:[],//现存确诊
				totalDataArr:[],//累计确诊
				currentConfirmedCount:[],//现存确诊折线图
				dateLine:[],//时间线
				newAdd:{},//新增
				total:{},//累计
				flag:false,
				areaList:AreaList,//省市联动的数据
				lineNeedData:{},
				confirmedIncrtemp:[],
				confirmedIncrtemp1:[],
				deadIncrtemp:[],
				deadIncrtemp1:[],
				curedIncrtemp:[],
				curedIncrtemp1:[],
				setlinechart:true,
			}
		},
		components:{
			dataIntro,
			Tab,
			Footer
		},
		methods:{
			onConfirm(e){
				console.log("选择了"+e)
				this.showArea = false;
			},
			onCancel(){
				this.showArea = false;
			},
			//数据处理
			changeData(){
				hubei.data.forEach(item=>{
					this.currentConfirmedCount.push(item.currentConfirmedCount);
					this.dateLine.push(this.insertStr(item.dateId.toString().slice(-4),2,"-"))
					this.confirmedIncrtemp.push(item.confirmedIncr)
					this.deadIncrtemp.push(item.deadIncr)
					this.curedIncrtemp.push(item.curedIncr);
					this.confirmedIncrtemp1.push(item.confirmedCount)
					this.deadIncrtemp1.push(item.deadCount)
					this.curedIncrtemp1.push(item.curedCount);
				})
				this.lineNeedData.name="现存确诊";
				this.lineNeedData.data = this.currentConfirmedCount;
				this.newAdd.name=['新增确诊','新增死亡','新增治愈'];
				this.newAdd.data1=this.confirmedIncrtemp;
				this.newAdd.data2=this.curedIncrtemp;
				this.newAdd.data3=this.deadIncrtemp;
				this.total.name=['累计确诊','累计死亡','累计治愈'];
				this.total.data1=this.confirmedIncrtemp1;
				this.total.data2=this.curedIncrtemp1;
				this.total.data3=this.deadIncrtemp1;
				
			},
			//必要的字符串修饰
			insertStr(soure, start, newStr){   
			   return soure.slice(0, start) + newStr + soure.slice(start);
			},
			onChange(index){
				this.innerIndex = index;
			},
			clickActive(innerIndex){
				this.$refs.provinceMap.swipeTo(innerIndex)
			},
			//获取单线折线图
			getLineChart(ele,data,X){
				let lineChart = this.$echarts.init(ele);
				lineChart.clear();
				this.setlinechart = false;
				window.onresize = lineChart.resize;
				lineChart.setOption({
					tooltip:{
						trigger:'axis',
						formatter:`
							<div>{b}</div>
							<div>${data.name}:{c}</div>
						`
					},
					legend:{
						y:'top',
						x:'center',
						data:[data.name]
					},
					xAxis:{
						type:'category',
						boundaryGap:false,
						data:X
					},
					grid:{
						left:'20%',//Y轴数值太长无法显示完全时增大这个值，
					},
					yAxis:{
						type:'value'
					},
					series:[
						{
							name:data.name,
							type:'line',
							data:data.data,
							stack:'总量',
							itemStyle:{
								normal:{
									color:'#28b7a3',//线条上的圆点颜色
									lineStyle:{
										color:'#28b7a3'//改变线条颜色
									}
								}
							}
						},
						
					]
				})
				window.addEventListener('resize', () => {
					// 自动渲染echarts
					lineChart.resize();
				})
			},
			//获取多线折线图
			getLinesChart(ele,data,X){
				let lineChart = this.$echarts.init(ele);
				window.onresize = lineChart.resize;
				this.setlinechart = false;
				lineChart.setOption({
					tooltip:{
						trigger:'axis',
					},
					legend:{
						y:'top',
						x:'center',
						data:data.name
					},
					xAxis:{
						type:'category',
						boundaryGap:false,
						data:X
					},
					yAxis:{
						type:'value',
					},
					grid:{
						left:'20%',//Y轴数值太长无法显示完全时增大这个值，
					},
					series:[
						{
							name:data.name[0],
							type:'line',
							data:data.data1,
							//stack:'总量',//设置相同的属性的时候数据线会堆加
							itemStyle:{
								normal:{
									color:'#F74C31',//线条上的圆点颜色
									lineStyle:{
										color:'#F74C31'//改变线条颜色
									}
								}
							}
						},
						{
							name:data.name[1],
							type:'line',
							data:data.data3,
							//stack:'总量',
							itemStyle:{
								normal:{
									color:'#70cfc2',//线条上的圆点颜色
									lineStyle:{
										color:'#70cfc2'//改变线条颜色
									}
								}
							}
						},
						{
							name:data.name[2],
							type:'line',
							data:data.data2,
							//stack:'总量',
							itemStyle:{
								normal:{
									color:'#5D7092',//线条上的圆点颜色
									lineStyle:{
										color:'#5D7092'//改变线条颜色
									}
								}
							}
						},
						
					]
				})
			},
			//获取省地图
			getProvinceMap(data,ele,kind,provinceName){//要渲染的数据，渲染的容器，病例种类（累计，现存）,省份
				let myChart = this.$echarts.init(ele);
				/* window.onresize = myChart.resize; */
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
						enterable:true,//提示框内是否可以进行点击
						show:true, //鼠标移入是否触发数据
						trigger: 'item', //出发方式
						formatter:`
							<div class="tooltip">
								<div class="tooltip-left">
									<div>{b}${kind}:{c}</div>
								</div>
							</div>			
						`,
						textStyle:{
							lineHeight:14,
						}
					},
					series:[
						{
							name:'地图',
							type: 'map',  //地图种类
							map: provinceName, //地图类型。
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
							zoom:1.1,//放大比例
							label: {  //图形上的文本标签，可用于说明图形的一些数据信息
								show:true,
								fontSize:7,
								fontFamily:'宋体',
								color:'#000',
								fontWeight:'lighter',
							},
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
				})
/* 				window.addEventListener('resize', () => {
					// 自动渲染echarts
					myChart.resize();
				}) */
			},
			//获取概览数据
			getProvinceData(name,latest){
				this.$http.get('api/area',{params:{province:name,latest:latest}}).then(res=>{
					console.log(res.data)
					let nowData = [];
					let totalData = [];
					this.TotalData = res.data.results[0];
					this.TotalData.cities.forEach(item=>{
						//console.log(item)
						if(item.currentConfirmedCount>10000&&item.cityName!='神农架林区'&&item.cityName!='恩施州'){
							nowData.push({
								name:item.cityName+'市',
								value:item.currentConfirmedCount,
								label:{color:'#fff'}
							})
							totalData.push({
								name:item.cityName+'市',
								value:item.confirmedCount,
								label:{color:"#fff"},
							})
						}
						else if(item.cityName!='神农架林区'&&item.cityName!='恩施州'){
						nowData.push({
							name:item.cityName+'市',
							value:item.currentConfirmedCount
						})
						totalData.push({
							name:item.cityName+'市',
							value:item.confirmedCount
						})
						}
						else if(item.cityName=='神农架林区'){
							nowData.push({
								name:item.cityName,
								value:item.currentConfirmedCount
							})
							totalData.push({
								name:item.cityName,
								value:item.confirmedCount
							})
						}
						else{
							nowData.push({
								name:'恩施土家族苗族自治州',
								value:item.currentConfirmedCount
							})
							totalData.push({
								name:'恩施土家族苗族自治州',
								value:item.confirmedCount
							})
						}
					})
					this.nowDataArr = nowData;
					this.totalDataArr = totalData;
					this.flag = true;
				})
				.catch(error=>{
					this.$message.error('获取省数据错误！')
				})
			},
			showPopup(){
				this.show = true;
			},
			//省选择
			showPopup1(){
				this.showArea = true;
			}
		},
		created(){
			this.getProvinceData("湖北省",0)
			//console.log(hubei)
		},
		mounted() {
			
			
		},
		updated() {
			this.changeData()
			console.log("数据更新了！")
			this.getProvinceMap(this.nowDataArr,this.$refs.myEchart,"当前确诊",'湖北');
			this.getProvinceMap(this.totalDataArr,this.$refs.myEchart2,"累计确诊","湖北")
			if(this.setlinechart)
			{
				this.getLineChart(this.$refs.lineChart1,this.lineNeedData,this.dateLine)
				this.getLinesChart(this.$refs.lineChart2,this.newAdd,this.dateLine)
				this.getLinesChart(this.$refs.lineChart3,this.total,this.dateLine)
			}
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.wrap1{
		width: 100%;
		min-height: 17.78666rem;
		height: auto;
		padding-bottom: 1.6rem;
		background-color: #f7f7f7;
		.header{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 33.5%;
			color:#fff;
			font-size: 0.74666rem;
			text-align: center;
			background: url(https://img1.dxycdn.com/2020/0222/443/3398118007984440896-2.png) no-repeat;
			background-size: cover;
			.main{
				position: absolute;
				top: 0.88rem;
				left: 0.56rem;
				text-align: left;
				.title{
					color:#fff;
					font-weight: 700;
					font-size: 0.64rem;
					line-height: 0.89333rem;
					
				}
				.subTitle{
					display: flex;
					align-items: center;
					margin-top: 0.05333rem;
					color:#fff;
					font-weight: 700;
					font-size: 0.64rem;
					line-height: 0.66666rem;
					.city{
						margin-right: 0.16rem;
						padding:0.01333rem 0.13333rem;
						color:#3343ff;
						font-size: 0.56rem;
						background-color: #fff;
						border-radius: 0.10666rem;
					}
				}
				.desc{
					margin-top: 0.29333rem;
					margin-left: 0.17333rem;
					color:#c4d2ff;
					font-size: 0.24rem;
					line-height: 0.33333rem;
					
				}
			}
			.tags{
				position: absolute;
				top: 0.32rem;
				right: 0.32rem;
				.tag{
					position: relative;
					float: right;
					height:0.64rem;
					margin-left: 0.06666rem;
					padding:0 0.32rem;
					color:#fff;
					font-size: 0.29333rem;
					line-height: 0.64rem;
					background-color: rgba(19,15,133,0.5);
					border-radius: 0.32rem;
					
				}
			}
		}
		.map-info{
			//height: 5.04rem;
			background-color: #fff;
			padding:0.41rem;
			.endTime-intro{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:0.18rem 0;
				font-size: 0.31rem;
				line-height: 0.57rem;
				span{
					color:rgb(102,102,102);
					
				}
				em{
					display: flex;
					justify-content: space-between;
					height: 0.57rem;
					border-radius: 0.385rem 0 0 0.385rem;
					background-color: #f7f7f7;
					padding:0 0.21rem;
					margin-right: -0.42rem;
					font-style: normal;
					color:#666;
					align-items: center;
					img{
						width: 0.32rem;
						height: 0.32rem;
						margin-right: 0.09rem;
						line-height: 0.57rem;
					}
				}
			}
			.virusdata{
				position: relative;
				background-color: #fff;
				text-align: center;
				border: 1px solid #ebebeb;
				box-shadow: 0 0 0.127rem rgba(0,0,0,0.15);
				border-radius: 0.1rem;
				ul{
					position: relative;
					//flex-flow: wrap;
					display: flex;
					margin:0;
					//padding:0.10666rem 0 0.42666rem;
					padding:.42666rem 0;
					text-align: center;
					li{
						width: 50%;
						position: relative;
						z-index: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						strong{
							margin-bottom: 0.026rem;
							font-weight: 700;
							font-size: 0.52rem;
							line-height: 0.52rem;
							
						}
						span{
							font-weight: 600;
						}
					}
				}
			}
		}
		.inside-map-title{
			padding:0 0 0 0.41rem;
			height: 1.04rem;
			color:#000;
			font-weight: bold;
			line-height: 1.04rem;
			background-color: #fff;
			border-top: 1px solid #ebebeb;
			font-size: 0.427rem;
			display: flex;
			align-items: center;
			.wordData{
				margin-left: 0.21333rem;
				color:#666;
				display: inline-flex;
				font-weight: 400;
				font-size: 0.32rem;
				.currentComfirmedWorld{
					margin-left: 0.21333rem;
				}
			}
			.innerChartWrapper{
				height: 4.85rem;
				padding: 0 0.41rem;
				position: relative;
				background-color: #fff;
				.arrow{
					position: absolute;
					width: 0.51rem;
					height: 0.51rem;
					z-index: 10;
					top: 2.25rem;
				}
				.right{
					right: 0.19rem;
				}
				.van-swipe-item{
					display: flex;
					align-items: center;
					justify-content: center;
					.chart1{
						height: 4.85rem;
						width: 10.25rem;
						display: flex;
						align-items: center;
						justify-content: center;
						box-sizing: border-box;
						box-shadow:  0.051rem 0.195rem 6px rgba($color: #000000, $alpha: 0.4);
						border: 0.13rem #ebebeb;
						img{
							width: 100%;
							height: 100%;
							display: block;
							
						}
					}
				}
			}
			i{
				width: 0.09rem;
				height: 0.37rem;
				background-color:#4169e2;
				display: inline-block;
				margin-right: 0.2rem;
				
			}
			
		}
		.header-map{
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			background-color: #fff;
			font-size: 0.32rem;
			height: 1.13rem;
			padding:0.1rem 0.41rem 0.31rem 0.41rem;
			ul{
				display: flex;
				flex: row;
				margin:0;
				padding: 0;
				list-style: none;
				li{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 1.65rem;
					height: 0.72rem;
					color:#666;
					border-radius: 0.0532rem;
				}
				.active-li{
					color:#4169e2;
					background-color: #f1f5ff;
					position: relative;
				}
			}
		}
		.chinaMapWrapper{
			width: 100%;
			height: 8.43rem;
			.van-swipe{
				width: 100%;
				height: 100%;
				.van-swipe-item{
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.chart1{
						width: 100%;
						min-width: 10rem;
						height: 8.43rem;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		.linechartContainer{
			padding-top: 0.53333rem;
			background-color: #fff;
			box-sizing: border-box;
			display: flex;
			align-items:center;
			justify-content: center;
			.lineChart1{
				height: 6.93333rem;
				width:100%;
				
			}
		}
	}
</style>
