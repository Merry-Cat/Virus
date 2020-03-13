<template>
	<div class="main">
		<div class="top-header">
			<div class="read">2,515,173,259 人次已浏览</div>
		</div>
		<van-tabs 
		v-model="active" scrollspy sticky 
		:color="tabstyle.color"
		:title-active-color="tabstyle.titleActiveColor"
		:background="tabstyle.backgroundColor"
		@scroll="changeTabStyle"
		:title-inactive-color="tabstyle.titleInactiveColor"
		>
		<div class="maqueen">
			<div class="maqueen-con">
				<ul class="ul-virus" style="top:0px;transition-duration: 1000ms;">
					<li>
						<div class="tag">疫情</div>
						<div class="maqueen-list">湖北以外新增确诊降至个位数。</div>
						<div class="arrow">></div>
					</li>
					<li>
						<div class="tag">青岛</div>
						<div class="maqueen-list">严防境外疫情输入扩散。</div>
						<div class="arrow">></div>
					</li>
					<li>
						<div class="tag">药物</div>
						<div class="maqueen-list">临床试验结果4月27日公布。</div>
						<div class="arrow">></div>
					</li>
					<li>
						<div class="tag">疫情</div>
						<div class="maqueen-list">湖北以外新增确诊降至个位数。</div>
						<div class="arrow">></div>
					</li>
				</ul>
			</div>
		</div>
		  <van-tab title="疫情地图">
			  <Map @flag="getflag"></Map>
		  </van-tab>
		  <van-tab title="辟谣与防护">
			  <Rumors v-if="flagRumors" @flagN="getflag1"></Rumors>
		  </van-tab>
		  <van-tab title="实时播报">
			  <NowShow v-if="flagNowshow"></NowShow>
		  </van-tab>
		  <van-tab title="疾病知识">
			<Ill></Ill>
		  </van-tab>
		</van-tabs>
		<Footer></Footer>
	</div>
</template>

<script>
	import Map from '../maps/map.vue';
	import Rumors from '../rumors/rumors.vue';
	import NowShow from '../nowshow/nowShow.vue';
	import Ill from '../illKnowedge/ill.vue';
	import Footer from './footer.vue'
	export default{
		data(){
			return{
				//因为同时请求多个接口的时候会出现请求失败的情况，
				//所以我在每个组件请求成功之后再请求其他组件需要的接口，
				VirusData:[],//疫情总数据
				title:['疫情地图','辟谣与防护','实时播报','疾病知识'],
				active:0,
				flagNowshow:false,//获取实时播报成功返回标识符
				flagRumors:false,//获取谣言成功返回标识符
				scrollIndex:0,//滚动索引
				tabstyle:{
					color:'#4169e2',
					titleActiveColor:'#4169e2',
					backgroundColor:'#fff',
					titleInactiveColor:'#000'
				}
			}
		},
		components:{
			Map,
			Rumors,
			NowShow,
			Ill,
			Footer
		},
		methods:{
			//获取map组件成功获取数据标识符
			getflag(response){
				this.flagRumors=response;
			},
			getflag1(res){
				this.flagNowshow=res;
			},
			//通知滚动
			noticeScroll(){
				let dom = document.querySelector(".ul-virus");
				let index=0
				//console.log(dom.style.top)
				let timer = setInterval(function(){
					if(index==0){
						dom.style.transitionDuration="1000ms"
					}
					dom.style.top = -38*index+"px";
					index++
					if(index==5){
						dom.style.transitionDuration="0ms"
						index=0
						dom.style.top = -38*index+"px";
						
					}
				},2000)
			},
			//改变导航条颜色
			changeTabStyle(e){
				if(e.isFixed){
					this.tabstyle.backgroundColor="#4169e2"
					this.tabstyle.color = "#fff";
					this.tabstyle.titleActiveColor="#fff"
					this.tabstyle.titleInactiveColor="#fff"
				}
				else{
					this.tabstyle.backgroundColor="#fff"
					this.tabstyle.color = "#4169e2";
					this.tabstyle.titleActiveColor="#4169e2";
					this.tabstyle.titleInactiveColor="#000"
				}
			}
		},
		created(){
			//this.getVirusTotal()
		},
		mounted() {
			this.noticeScroll()
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.main{
		width: 100%;
		position: relative;
		background-color: #f7f7f7;
		padding-bottom: 1.6rem;
		.maqueen{
			position: absolute;
			top:44px;
			background: #F7F7F7;
			width: 100%;
			.maqueen-con{
				position: relative;
				margin:15px 15px;
				box-sizing: border-box;
				box-shadow: 0px 0px 3px #E0E0E0;
				background: #fff;
				border-radius: 3px;
				height: 40px;
				overflow: hidden;
				.ul-virus{
					position: absolute;
					//top: 0;
					left: 0;
					width: 100%;
					transition-duration: 1000ms;
					//animation: scroll 8s infinite;
					li{
						height: 36px;
						margin:2px 20px;
						line-height: 36px;
						display: flex;
						align-items: center;
						justify-content: space-around;
						
						.tag{
							line-height: 14px;
							height: 14px;
							flex:none;
							background: #ffefed;
							color:#f74c31;
							font-size: 12px;
							border-radius: 2px;
							padding: 3px;
						}
						.maqueen-list{
							font-size: 14px;
							line-height: 36px;
							margin-left: 10px;
							flex: 1;
						}
						.arrow{
							margin-right: 0;
							width: 36px;
							height: 36px;
							line-height: 36px;
							font-size: 14px;
							font-weight: bold;
							flex:0;
							color:#9f9797;
						}
					}
				}
			}
		}
		.top-header{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 33.5%;
			color: #fff;
			font-size: .28rem;
			text-align: center;
			background: url(https://img1.dxycdn.com/2020/0208/913/3395498790898861163-2.png) no-repeat;
			background-size: cover;
		}
		.read{
			position: absolute;
			top: 0.5rem;
			right: 0;
			height: 0.55rem;
			padding: 0 .08rem 0 .12rem;
			color: #fff;
			font-size: .3rem;
			line-height: 0.55rem;
			background-color: rgba(19,15,133,.6);
			border-top-left-radius: .275rem;
			border-bottom-left-radius: .275rem;
		}
	}
</style>
