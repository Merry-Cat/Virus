<template>
	<div class="map-wrapper" style="background-color: #f7f7f7;">
		<div class="map-tab" >
			<div id="tab-inside" class="active map-tab1">国内疫情数据</div>
			<div id="tab-outside" class="map-tab1"><a name="inside" style=" border: none; font-size: 0.39rem; text-align: center;color:#404a60; line-height: 0.93rem; text-decoration: none;display: inline-block;width: 100%;height: 100%;" href="#outside">国外疫情数据</a></div>
		</div>
		<!-- 全国数据概览 -->
		<div class="map-info">
			<div class="endTime-intro">
				<span>截至 <span v-if="TotalData"><span>{{TotalData.updateTime|dateFormat}}</span></span> 全国数据统计</span>
				<em @click="showPopup"><img src="data:image/png;base64,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">数据说明</em>
			</div>
			<div class="virusdata">
				<ul>
					<li>
						<div class="compare">
							<b>
								较昨日
								<em style="color:rgb(247,76,49)">{{TotalData.currentConfirmedIncr}}</em>
							</b>
						</div>
						<strong style="color:rgb(247,76,49)">{{TotalData.currentConfirmedCount}}</strong>
						<span>现存确诊</span>
					</li>
					<li>
						<div class="compare">
							<b>
								较昨日
								<em style="color:rgb(247,130,7)">+{{TotalData.suspectedIncr}}</em>
							</b>
						</div>
						<strong style="color:rgb(247,130,7)">{{TotalData.suspectedCount}}</strong>
						<span>现存疑似</span>
					</li>
					<li>
						<div class="compare">
							<b>
								较昨日
								<em style="color:rgb(162,90,78)">{{TotalData.seriousIncr}}</em>
							</b>
						</div>
						<strong style="color:rgb(162,90,78)">{{TotalData.seriousCount}}</strong>
						<span>现存重症</span>
					</li>
					<li>
						<div class="compare">
							<b>
								较昨日
								<em style="color:rgb(174,33,44)">+{{TotalData.confirmedIncr}}</em>
							</b>
						</div>
						<strong style="color:rgb(174,33,44)">{{TotalData.confirmedCount}}</strong>
						<span>累计确诊</span>
					</li>
					<li>
						<div class="compare">
							<b>
								较昨日
								<em style="color:rgb(93,112,146)">+{{TotalData.deadIncr}}</em>
							</b>
						</div>
						<strong style="color:rgb(93,112,146)">{{TotalData.deadCount}}</strong>
						<span>累计死亡</span>
					</li>
					<li>
						<div class="compare">
							<b>
								较昨日
								<em style="color:rgb(40,183,163)">+{{TotalData.curedIncr}}</em>
							</b>
						</div>
						<strong style="color:rgb(40,183,163)">{{TotalData.curedCount}}</strong>
						<span>累计治愈</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- 疫情小工具 -->
		<div class="map-tool">
			<div class="num1">
				<img src="https://img1.dxycdn.com/2020/0221/958/3397927500415181599-135.png" alt="">
				<div class="texts">
					<p class="title">同乘查询</p>
					<p class="subTitle">患者同乘查询</p>
				</div>
			</div>
			<div class="num2">
				<img src="https://img1.dxycdn.com/2020/0221/550/3397927717311267685-135.png" alt="">
				<div class="texts">
					<p class="title">
						<span>抗议物资，每日补货</span>
						<img class="limited" src="https://img1.dxycdn.com/2020/0221/567/3397927573429646011-135.png" alt="tag">
					</p>
					<p class="subTitle">消毒剂、洗手液、温度计，库存每日更新</p>
				</div>
			</div>
			<div class="num3">
				<img src="https://img1.dxycdn.com/2020/0221/861/3397927687246311086-135.png" alt="">
				<div class="texts">
					<p class="title">母婴健康</p>
					<p class="subTitle">在家孕育指南</p>
				</div>
			</div>
			<div class="num4">
				<img src="https://img1.dxycdn.com/2020/0221/578/3397927811800552709-135.png" alt="">
				<div class="texts">
					<p class="title">线上开药</p>
					<p class="subTitle">快递送货上门</p>
				</div>
			</div>
			<div class="num5" style="margin-right:0;width: 33%;">
				<img src="https://img1.dxycdn.com/2020/0221/518/3397927841865325260-135.png" alt="">
				<div class="texts">
					<p class="title">在线问诊</p>
					<p class="subTitle">湖北地区免费</p>
				</div>
			</div>
		</div>
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
		<template>
			<chinaMap ref="child" :areaData="areaData" v-if="flag==true" @innerIndexC="getChildIndex"></chinaMap>
		</template>
		
		<!-- 国内疫情趋势 -->
		<div class="innerVirusContaniner">
			<div class="inside-map-title">国内疫情趋势</div>
			<innerChart ref="chatChild" @getchartIndex="getIndexFunc"></innerChart>
			<ul>
				<li :class="[innerIndex1==0?'active-li':'']" @click="clickActive1(0)">新增疑似/新增确诊</li>
				<li :class="[innerIndex1==1?'active-li':'']" @click="clickActive1(1)">现存确诊/现存疑似</li>
				<li :class="[innerIndex1==2?'active-li':'']" @click="clickActive1(2)">死亡/治愈</li>
				<li :class="[innerIndex1==3?'active-li':'']" @click="clickActive1(3)">病死率</li>
				<li :class="[innerIndex1==4?'active-li':'']" @click="clickActive1(4)">治愈率</li>
			</ul>
		</div>
		<!-- 湖北/非湖北疫情趋势 -->
		<div class="innerVirusContaniner">
			<div class="inside-map-title">湖北/非湖北疫情趋势</div>
				<div class="innerChartWrapper1">
					<van-swipe @change="onChange1" :show-indicators="false"  ref="chart2" :width="widthside">
					  <template>
						  <van-swipe-item v-for="(item,index) in imgArr" :key="index">
							  <div class="chart2">
								<img :src="item" alt="">
							  </div>
						  </van-swipe-item>
					  </template>
					</van-swipe>
					<img @click="pre2('chart2')" class="arrow" src="data:image/png;base64,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" alt="">
					<img @click="nxt2('chart2')" class="arrow right" src="data:image/png;base64,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" alt="">
				</div>
			<ul>
				<li :class="[innerIndex2==0?'active-li':'']" @click="clickActive2(0)">湖北新增</li>
				<li :class="[innerIndex2==1?'active-li':'']" @click="clickActive2(1)">非湖北新增</li>
				<li :class="[innerIndex2==2?'active-li':'']" @click="clickActive2(2)">湖北现存确诊</li>
				<li :class="[innerIndex2==3?'active-li':'']" @click="clickActive2(3)">非湖北现存确诊</li>
				<li :class="[innerIndex2==4?'active-li':'']" @click="clickActive2(4)">治愈/死亡</li>
			</ul>
		</div>
		<!-- 国内各地区表格数据 -->
		<Tab :detailData="areaData"></Tab>
		<div class="splitline"></div>
		<!-- 国外疫情数据 -->
		<div class="map-tab" >
			<div id="tab-inside" class="map-tab1"><a href="#inside" name="outside" style="border: none; font-size: 0.39rem; font-size: 0.39rem; color:#404a60;text-align: center; line-height: 0.93rem; text-decoration: none;display: inline-block;width: 100%;height: 100%;" >国内疫情数据</a></div>
			<div id="tab-outside" class="active map-tab1">国外疫情数据</div>
		</div>
		<!-- 国外数据概览 -->
		<div class="map-info">
			<div class="endTime-intro">
				<span>截至 <span v-if="TotalData"><span>{{TotalData.updateTime|dateFormat}}</span></span> 全国数据统计</span>
				<em @click="showPopup"><img src="data:image/png;base64,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">数据说明</em>
			</div>
			<div class="virusdata">
				<ul>
					<li style="width: 25%;">
						<!-- <div class="compare">
							<b>
								较昨日
								<em style="color:rgb(247,76,49)">{{TotalData.currentConfirmedIncr}}</em>
							</b>
						</div> -->
						<strong style="color:rgb(247,76,49)">{{outsideCurrentComfirmed}}</strong>
						<span>现存确诊</span>
					</li>
					<li style="width: 25%;">
						<!-- <div class="compare">
							<b>
								较昨日
								<em style="color:rgb(174,33,44)">+{{TotalData.confirmedIncr}}</em>
							</b>
						</div> -->
						<strong style="color:rgb(174,33,44)">{{outsideComfirmed}}</strong>
						<span>累计确诊</span>
					</li>
					<li style="width: 25%;">
						<!-- <div class="compare">
							<b>
								较昨日
								<em style="color:rgb(93,112,146)">+{{TotalData.deadIncr}}</em>
							</b>
						</div> -->
						<strong style="color:rgb(93,112,146)">{{outsideDead}}</strong>
						<span>累计死亡</span>
					</li>
					<li style="width: 25%;margin-top: 0px;">
						<!-- <div class="compare">
							<b>
								较昨日
								<em style="color:rgb(40,183,163)">+{{TotalData.curedIncr}}</em>
							</b>
						</div> -->
						<strong style="color:rgb(40,183,163)">{{outsideCured}}</strong>
						<span>累计治愈</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- 全球疫情地图 -->
		<div class="inside-map-title">
			<i></i>
			全球疫情地图
			<span class="wordData">
				<p class="comfirmedWorld">全球累计确诊 {{TotalData.confirmedCount+outsideComfirmed}}</p>
				<p class="currentComfirmedWorld">现存确诊 {{TotalData.currentConfirmedCount+outsideCurrentComfirmed}}</p>
			</span>
		</div>
		<!-- 疫情地图 -->
		<div class="header-map">
			<ul>
				<li :class="[outSideIndex==0?'active-li':'']" @click="clickActive3(0)">现存确诊</li>
				<li :class="[outSideIndex==1?'active-li':'']" @click="clickActive3(1)">累计确诊</li>
			</ul>
			<div v-if="outSideIndex===0">当前确诊病例数（排除死亡、治愈）</div>
			<div v-else>累计确诊病例数（包含死亡、治愈）</div>
		</div>
		<template>
			<wordMap ref="childOut" :worldData="outSideData" :chinaData="TotalData" v-if="TotalData.confirmedCount&&outSideData.length>0" @innerIndexW="getoutsideFuc"></wordMap>
		</template>
		<!-- 国外疫情趋势 -->
		<div class="innerVirusContaniner">
			<div class="inside-map-title">国外疫情趋势</div>
				<div class="innerChartWrapper1">
					<van-swipe @change="onChange2" :show-indicators="false"  ref="chart3" :width="widthside">
					  <template>
						  <van-swipe-item v-for="(item,index) in imgArrOutside" :key="index">
							  <div class="chart2">
								<img :src="item" alt="">
							  </div>
						  </van-swipe-item>
					  </template>
					</van-swipe>
					<img @click="pre2('chart3')" class="arrow" src="data:image/png;base64,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" alt="">
					<img @click="nxt2('chart3')" class="arrow right" src="data:image/png;base64,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" alt="">
				</div>
			<ul>
				<li :class="[outsideIndex1==0?'active-li':'']" @click="clickActiveout(0,'chart3')">国外新增确诊</li>
				<li :class="[outsideIndex1==1?'active-li':'']" @click="clickActiveout(1,'chart3')">国外累计确诊</li>
				<li :class="[outsideIndex1==2?'active-li':'']" @click="clickActiveout(2,'chart3')">国外死亡</li>
			</ul>
		</div>
		<!-- 重点国家疫情趋势 -->
		<div class="innerVirusContaniner">
			<div class="inside-map-title">国外重点国家疫情趋势</div>
				<div class="innerChartWrapper1">
					<van-swipe @change="onChange3" :show-indicators="false"  ref="chart4" :width="widthside">
					  <template>
						  <van-swipe-item v-for="(item,index) in imgArrimportant" :key="index">
							  <div class="chart2">
								<img :src="item" alt="">
							  </div>
						  </van-swipe-item>
					  </template>
					</van-swipe>
					<img @click="pre2('chart4')" class="arrow" src="data:image/png;base64,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" alt="">
					<img @click="nxt2('chart4')" class="arrow right" src="data:image/png;base64,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" alt="">
				</div>
			<ul style="flex-flow: wrap;">
				<li style="width:calc(20%-0.53333rem)" :class="[outsideIndex2==0?'active-li':'']" @click="clickActiveout(0,'chart4')">韩国新增确诊</li>
				<li style="width:calc(20%-0.53333rem)" :class="[outsideIndex2==1?'active-li':'']" @click="clickActiveout(1,'chart4')">韩国累计确诊</li>
				<li style="width:calc(20%-0.53333rem)" :class="[outsideIndex2==2?'active-li':'']" @click="clickActiveout(2,'chart4')">日本新增确诊</li>
				<li style="width:calc(20%-0.53333rem)" :class="[outsideIndex2==3?'active-li':'']" @click="clickActiveout(3,'chart4')">日本累计确诊</li>
				<li style="width:calc(20%-0.53333rem)" :class="[outsideIndex2==4?'active-li':'']" @click="clickActiveout(4,'chart4')">意大利新增确诊</li>
				<li style="width:calc(20%-0.53333rem)" :class="[outsideIndex2==5?'active-li':'']" @click="clickActiveout(5,'chart4')">意大利累计确诊</li>
				<li style="width:calc(20%-0.53333rem)" :class="[outsideIndex2==6?'active-li':'']" @click="clickActiveout(6,'chart4')">伊朗新增确诊</li>
				<li style="width:calc(20%-0.53333rem)" :class="[outsideIndex2==7?'active-li':'']" @click="clickActiveout(7,'chart4')">伊朗累计确诊</li>
			</ul>
		</div>
		<TabTwo :outSideData="outSideData"  v-if="outSideData.length>0"></TabTwo>
		<van-popup v-model="show"  close-icon="close" close-icon-position="bottom-center" round>
			<dataIntro></dataIntro>
		</van-popup>
	</div>
</template>

<script>
	import chinaMap from './chinaMap.vue';
	import innerChart from './innerChart.vue';
	import Tab from './tab.vue';
	import wordMap from './wordMap.vue';
	import TabTwo from './tab2.vue';
	import dataIntro from '../home/dataIntro.vue'
	export default{
		data(){
			return{
				TotalData:{},//全国数据概览
				areaData:[],//国内各省市数据，
				outSideData:[],//国外数据。
				flag:false,//条件渲染子组件,
				innerIndex:0,//当前选中tab,
				innerIndex1:0,//国内疫情趋势图表当前选中，
				innerIndex2:0,//湖北/非湖北趋势,
				outSideIndex:0,//世界地图索引
				outsideIndex1:0,//国外疫情趋势索引
				outsideIndex2:0,//国外重点国家索引
				worldData:[],//全世界数据，包括中国
				widthside:'10.28rem',
				show:false,//弹出层控制
				imgArr:['https://img1.dxycdn.com/2020/0305/057/3400265513107522996-135.png',
						'https://img1.dxycdn.com/2020/0305/963/3400265525992191202-135.png',
						'https://img1.dxycdn.com/2020/0305/305/3400265538877093665-135.png',
						'https://img1.dxycdn.com/2020/0305/029/3400265560352165146-135.png',
						'https://img1.dxycdn.com/2020/0305/967/3400265573236833505-135.png',
				],
				//国外疫情趋势图
				imgArrOutside:[
					'https://img1.dxycdn.com/2020/0308/687/3400841103149410326-135.png',
					'https://img1.dxycdn.com/2020/0308/285/3400841124624696750-135.png',
					'https://img1.dxycdn.com/2020/0308/541/3400841143951601077-135.png',
				],
				//国外重点国家疫情趋势图
				imgArrimportant:[
					'https://img1.dxycdn.com/2020/0308/893/3400841216966047756-135.png',
					'https://img1.dxycdn.com/2020/0308/792/3400841234146366703-135.png',
					'https://img1.dxycdn.com/2020/0308/935/3400841255620754815-135.png',
					'https://img1.dxycdn.com/2020/0308/020/3400841281390559553-135.png',
					'https://img1.dxycdn.com/2020/0308/024/3400841305013329463-135.png',
					'https://img1.dxycdn.com/2020/0308/956/3400841328635650352-135.png',
					'https://img1.dxycdn.com/2020/0308/772/3400841401650097063-135.png',
					'https://img1.dxycdn.com/2020/0308/213/3400841425271969327-135.png',
				]
				
			}
		},
		props:[],
		components:{
			chinaMap,
			innerChart,
			Tab,
			wordMap,
			TabTwo,
			dataIntro
		},
		methods:{
			//展示弹出层
			showPopup(){
				this.show = true;
			},
			//获取全国数据概览
			getTotalData(){
				this.$http.get('/api/overall').then(response=>{
					//console.log(response.data.results.updateTime)
					this.TotalData = response.data.results[0];
					//console.log(this.TotalData)
				})
				.catch(error => {
					this.$notify({type:'danger',message:'获取全国数据失败！请刷新重试'})
				})
			},
			//获取子组件索引
			getChildIndex(innerIndexC){
				this.innerIndex = innerIndexC;
			},
			onChange1(index){
				this.innerIndex2 = index;
			},
			onChange2(index){
				this.outsideIndex1 = index;
			},
			onChange3(index){
				this.outsideIndex2 = index;
			},
			getIndexFunc(index){
				this.innerIndex1 = index
			},
			//获取世界地图的索引
			getoutsideFuc(index){
				this.outSideIndex1 = index
			},
			pre2(res){
				this.$refs[res].prev()
			},
			nxt2(res){
				this.$refs[res].next()
			},
			//点击切换高亮
			clickActive(innerIndex){
				var _this = this
				this.$refs.child.$refs.mapChild.swipeTo(innerIndex)
			},
			clickActive1(innerIndex){
				var _this = this
				this.$refs.chatChild.$refs.chart1.swipeTo(innerIndex)
			},
			clickActive2(index){
				this.$refs.chart2.swipeTo(index)
			},
			clickActive3(index){
				this.$refs.childOut.$refs.wordlMap1.swipeTo(index)
			},
			clickActiveout(index,refName){
				this.$refs[refName].swipeTo(index)
			},
			//处理国外的数据
			getOutSideTotalData(key){
				let data=0
				this.outSideData.forEach(item=>{
					data+=item[key]
				})
				return data
			},
			//获取中国各省和外国总数据
			getProvince(){
				this.$http.get('/api/area').then(res=>{
					const areadata = res.data.results;
					let nowArr=[];
					this.worldData = areadata;
					let outsideArr=[];
					//console.log(areadata)
					areadata.filter((item)=>{
						if(item.countryName=="中国"){
							nowArr.push(item)
						}
						else{
							outsideArr.push(item)
						}
					})
					this.areaData = nowArr;
					this.outSideData = outsideArr;
					this.flag=true;
					this.$emit('flag',this.flag)
				})
				.catch(error=>{
					this.$notify({type:'danger',message:'世界数据失败！请刷新！'})
				})
			},
		},
		created(){
			//同时执行会报浏览器同源错误，不知道是数据原因还是怎么的。
			setTimeout(()=>{
				this.getTotalData()
			},2000)
			this.getProvince();
		},
		mounted(){
		},
		computed:{
			outsideCurrentComfirmed(){
				return this.getOutSideTotalData('currentConfirmedCount')
			},
			outsideComfirmed(){
				return this.getOutSideTotalData('confirmedCount')
			},
			outsideDead(){
				return this.getOutSideTotalData('deadCount')
			},
			outsideCured(){
				return this.getOutSideTotalData('curedCount')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.map-wrapper{
		width: 100%;
		.map-tab{
			position: relative;
			display: flex;
			display: -ms-flexbox;
			justify-content: space-between;
			height: 0.93rem;
			background-color: #e6edff;
			border-radius: .32rem .32rem 0 0;
			-webkit-box-pack: justify;
			.active{
				color:#4169e2!important;
				font-weight: 500;
				background-color: #fff;
				border-radius: 0.32rem 0.32rem 0 0;
				&:before{
					width: 0.63rem!important;
				}
			}
			#tab-inside,#tab-outside{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50%;
				height: 100%;
				color: #404a60;
				font-size: .39rem;
				&:before{
					position: absolute;
					top: 0;
					display: block;
					width: 0;
					height: .93rem;
					font-size: 0;
					line-height: 0;
					background-size: 100% 100%;
					content: "."
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
					flex-flow: wrap;
					display: flex;
					margin:0;
					padding:0.21rem 0 0.3rem 0;
					text-align: center;
					
					li{
						width: 33.333%;
						position: relative;
						z-index: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						box-sizing: border-box;
						&:not(:nth-child(3n+1))::before{
							position: absolute;
							bottom:0.108rem;
							left:-0.013rem;
							z-index: 2;
							width: 0.026rem;
							height: 1.04rem;
							margin-top: -0.38rem;
							background-image: linear-gradient(180deg,#eee,#e1e1e1 51%,#fff);
							content:"";
						}
						&:nth-child(n+4){
							margin-top: 0.318rem;
						}
						.compare{
							display: flex;
							align-items: center;
							justify-content: center;
							margin-bottom: 0.052rem;
							color:#666;
							font-weight: 400;
							font-size: 0.234rem;
							text-align: center;
							em{
								font-style: normal;
							}
						}
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
		.map-tool{
			margin-top: -0.42rem;
			padding:0.41rem;
			background-color: #fff;
			display: flex;
			flex-flow: wrap;
			align-items: center;
			justify-content: flex-start;
			.num1{
				width: calc(34% - 0.052rem);
				margin-right: 0.052rem;
				display: flex;
				align-items: center;
				//justify-content: space-around;
				box-sizing: border-box;
				padding:0.267rem;
				background-color: #f1f5ff;
				border-radius: 0.114rem;
				img{
					width: 0.68rem;
					height: 0.68rem;
					margin-right: 0.26rem;
					color:#4169e2;
					font-weight: 700;
					font-size: 0.31rem;
				}
				.texts{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 100%;
					overflow: hidden;
					line-height: 1.5;
					white-space: nowrap;
					.title{
						font-weight: 500;
						line-height: 1.3;
						align-items: center;
						display: flex;
					}
					.subTitle{
						color:#666;
						margin-top: 0.054rem;
						font-size: 0.258rem;
					}
				}
			}
			.num2{
				display: flex;
				align-items: center;
				//justify-content: space-around;
				box-sizing: border-box;
				padding:0.267rem;
				background-color: #f1f5ff;
				border-radius: 0.114rem;
				width: 66%;
				img{
					width: 0.68rem;
					height: 0.68rem;
					margin-right: 0.26rem;
					color:#4169e2;
					font-weight: 700;
					font-size: 0.31rem;
				}
				.texts{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 100%;
					overflow: hidden;
					line-height: 1.5;
					white-space: nowrap;
					.title{
						font-weight: 500;
						line-height: 1.3;
						align-items: center;
						display: flex;
						img{
							height: 0.31rem;
							margin-left: 0.12rem;
						}
					}
					.subTitle{
						color:#666;
						margin-top: 0.054rem;
						font-size: 0.258rem;
					}
				}
			}
			.num3,.num4,.num5{
				display: flex;
				align-items: center;
				//justify-content: space-around;
				box-sizing: border-box;
				padding:0.267rem;
				margin-top: 0.056rem;
				margin-right: 0.056rem;
				background-color: #f1f5ff;
				border-radius: 0.114rem;
				width:calc(34% - 0.056rem);
				img{
					width: 0.68rem;
					height: 0.68rem;
					margin-right: 0.26rem;
					color:#4169e2;
					font-weight: 700;
					font-size: 0.31rem;
				}
				.texts{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 100%;
					overflow: hidden;
					line-height: 1.5;
					white-space: nowrap;
					.title{
						font-weight: 500;
						line-height: 1.3;
						align-items: center;
						display: flex;
						img{
							height: 0.31rem;
							margin-left: 0.12rem;
						}
					}
					.subTitle{
						color:#666;
						margin-top: 0.054rem;
						font-size: 0.258rem;
					}
				}
			}
			.num4,.num5{
				width: calc(33% - 0.056rem);
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
		.innerVirusContaniner{
			padding-top: 0.41rem;
			background-color: #fff;
			ul{
				display: flex;
				flex: row;
				margin-top: 0.14rem;
				padding: 0 0.37rem;
				list-style: none;
				background-color: #fff;
				li{
					display: flex;
					align-items: center;
					justify-content: center;
					color:#666;
					background-color: #f1f5ff;
					text-align: center;
					width: calc(20% - .052rem);
					margin-right: 0.052rem;
					box-sizing: border-box;
					padding:0.105rem;
					border-radius: 0.0532rem;
				}
				li:nth-child(n+6){
					margin-top: 0.066666rem;
				}
				.active-li{
					color:#4169e2;
					background-color: #f1f5ff;
					position: relative;
				}
			}
		}
		.splitline{
			height: 0.21333rem;
			width: 100%;
			background-color: #f7f7f7;
		}
	}
	.innerChartWrapper1{
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
			.chart2{
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
</style>
