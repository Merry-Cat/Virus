<template>
	<div class="nowshow">
		<div class="nullDiv"></div>
		<div class="rumorsTitle">
			<i></i>
			实时播报
		</div>
		<div class="progress_list">
			<van-steps direction="vertical" 
			class="defineClass" 
			inactive-icon="stop-circle" 
			active-icon="stop-circle"
			active-color="#c0bbbb">
			  <van-step class="item2" v-for="(item,index) in newsList" :key="index">
				 <a :href="item.sourceUrl" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"></a>
				  <div class="left_con">
					  <span>{{item.befor}}</span>
					  <p>{{item.pubDate|dateFormat}}</p>
				  </div>
				<div class="toptitle">
					<i v-if="index==0">最新</i>
					{{item.title}}
				</div>
				<div class="content">
					{{item.summary}}
				</div>
				<div class="toolFrom">
					{{'信息来源： '+item.infoSource}}
				</div>
			  </van-step>
			</van-steps>
		</div>
		<div class="filter">
			<span>查看更多 ></span>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				newsList:[],//新闻列表
				flagKnowedge:false,
				nowTime:''
			}
		},
		methods:{
			//将时间戳转换为多久前
			formatMsgTime (timespan) {
			  var dateTime = new Date(timespan);
			  var year = dateTime.getFullYear();
			  var month = dateTime.getMonth() + 1;
			  var day = dateTime.getDate();
			  var hour = dateTime.getHours();
			  var minute = dateTime.getMinutes();
			  var second = dateTime.getSeconds();
			  var now = new Date();
			  //var now_new = Date.parse(now.toDateString());  //typescript转换写法
			  var now_new = Date.parse(new Date());
			  var milliseconds = 0;
			  var timeSpanStr;
			  milliseconds = now_new - timespan;
				//console.log(milliseconds)
			  if (milliseconds <= 1000 * 60 * 1) {
			    timeSpanStr = '刚刚';
			  }
			  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
			    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
			  }
			  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
			    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
			  }
			  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
			    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
			  }
			  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
			    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
			  } else {
			    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
			  }
			  return timeSpanStr;
			},
			//获取新闻链接
			getNews(){
				this.$http.get('/api/news',{params:{num:10}}).then(res=>{
					//console.log(res.data.results[0].pubDate)
					res.data.results.forEach(item=>{
						let temp =this.formatMsgTime(item.pubDate)
						item.befor = temp
					})
					this.newsList = res.data.results;
					this.flagKnowedge = true;
					this.$emit('flagKnow',this.flagKnowedge)
				})
				.catch(error=>{
					this.$notify({type:'danger',message:'获取新闻失败，刷新重试！'})
				})
			}
		},
		created(){
			this.getNews()
		},
		mounted(){
			
		},
		updated(){
		},
		computed:{},
	}
</script>

<style lang="scss" scoped="scoped">
	.nowshow{
		width: 100%;
		background-color:#EFEFEF;
		.nullDiv{
			width: 100%;
			background-color: #f7f7f7;
			height: 0.21333rem;
		}
		.rumorsTitle{
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
			i{
				width: 0.09rem;
				height: 0.37rem;
				background-color:#4169e2;
				display: inline-block;
				margin-right: 0.2rem;
				
			}
		}
		.progress_list{
			position: relative;
			display: inline-block;
			box-sizing: border-box;
			width: 100%;
			margin-top: 0.42666rem;
			padding-right: 0.42666rem;
			vertical-align: top;
			overflow: hidden;
			.defineClass{
				padding-left: 30%!important;
				background-color: #efefef;
				.item2{
					position: relative;
					background-color: #fff;
					border-radius: 0.08rem;
					box-sizing: border-box;
					padding:0.26666rem;
					margin-bottom: 0.42666rem;
					&:before{
						background-color: #ebebeb!important;
					}
					.toptitle{
						color:#333;
						font-weight: 600;
						font-size: 0.42666rem;
						line-height: 0.61333rem;
						text-overflow: ellipsis;
						i{
							display: inline-block;
							width: 0.74666rem;
							height: 0.42666rem;
							margin-right: 0.16rem;
							color:#fff;
							font-size: 0.32rem;
							font-style: normal;
							line-height: 0.42666rem;
							text-align: center;
							vertical-align: 0.05333rem;
							background-color: #f74c31;
							border-radius: 0.05333rem;
							
						}
					}
					.content{
						display: -webkit-box;
						margin-top: 0.10666rem;
						overflow: hidden;
						color:#999;
						font-size: 0.32rem;
						line-height: 0.42666rem;
						text-overflow: ellipsis;
						word-break: break-all;
						-webkit-line-clamp: 5;
					}
					.toolFrom{
						right: 0.42666rem;
						bottom: 0.32rem;
						margin-top: 0.10666rem;
						color:#999;
						font-size: 0.32rem;
						text-align: right;
					}
					.left_con{
						position: absolute;
						left: -2.66666rem;
						top: 0.21333rem;
						width: 2.66666rem;
						span{
							font-size: 0.32rem;
							color: #000;
							font-weight: 500;
							margin-right: 0.85333rem;
							text-align: right;
							display: block;
						}
						p{
							font-size: 0.26666rem;
							color:rgb(153,153,153);
							font-weight: 500;
							text-align: right;
							margin-right: 0.85333rem;
						}
						
					}
				}
			}
		}
		.filter{
			position: relative;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			width: 100%;
			height: 3.38666rem;
			margin-top: -2.66666rem!important;
			color:#4169e2;
			font-size: 0.37333rem;
			line-height: 0.69333rem;
			background-image: url(https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/bg-write@2x.ceaac07a.png);
			background-size: 100% 100%;
			span{
				display: flex;
				align-items: center;
				margin-bottom: 0.53333rem;
			}
		}
	}
</style>
