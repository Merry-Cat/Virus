<template>
	<div class="areaBox" ref="tabLock1">
		<div class="boxheader">
			<p class="title1">
				<span>地区</span>
			</p>
			<p class="title2">现存确诊</p>
			<p class="title3">累计确诊</p>
			<p class="title4">死亡</p>
			<p class="title5">治愈</p>
		</div>
		<div class="fa-fixBox">
			<div class="fixBoxHeader">
				<p class="fixTit1">
					<span>地区</span>
				</p>
				<p class="fixTit2">现存确诊</p>
				<p class="fixTit3">累计确诊</p>
				<p class="fixTit4">死亡</p>
				<p class="fixTit5">治愈</p>
			</div>
		</div>
		<div class="areaBlock">
			<!-- <div class="blockData" >
				<p class="subTitle">
					<img   :class="item.cities.length==0?'disappear':''" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAAAXNSR0IArs4c6QAAAJVJREFUKBWdj9EJgCAURX0SNEPQNO3QEOI4fbRDDtBfy9RfQ1i3UkR8Zgmi6DuHe6lT62SF7cWPRYKMrKtKC6L9M38yYOU8NDtZ0l8FYMBKgMvYGsQplWAWDOYvAS7FVZ7oYLC8oLSKi37jgQAPb1XC6EkBHtkqUXRWwFWJo7MCfMRVUtGzAnz6Kkx0J8iendp67NzQAYy0O2CWf5zRAAAAAElFTkSuQmCC" alt="">
					{{item.summary+'('+item.cities.length+')'}}
				</p>
				<p class="currentConfirmed">{{item.currentConfirmedCount}}</p>
				<p class="comfirmed">{{item.confirmed}}</p>
				<p class="dead">{{item.dead}}</p>
				<p class="cured">{{item.curd}}</p>

			</div> -->
			<div class="blockData blockDataList" v-for="(item1,index) in getData.cities" :key=index>
				<p class="subTitle">
					<img style="visibility: hidden;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAAAXNSR0IArs4c6QAAAJVJREFUKBWdj9EJgCAURX0SNEPQNO3QEOI4fbRDDtBfy9RfQ1i3UkR8Zgmi6DuHe6lT62SF7cWPRYKMrKtKC6L9M38yYOU8NDtZ0l8FYMBKgMvYGsQplWAWDOYvAS7FVZ7oYLC8oLSKi37jgQAPb1XC6EkBHtkqUXRWwFWJo7MCfMRVUtGzAnz6Kkx0J8iendp67NzQAYy0O2CWf5zRAAAAAElFTkSuQmCC" alt="">
					{{item1.cityName}}
				</p>
				<p class="currentConfirmed">{{item1.currentConfirmedCount}}</p>
				<p class="comfirmed">{{item1.confirmedCount}}</p>
				<p class="dead">{{item1.deadCount}}</p>
				<p class="cured">{{item1.curedCount}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			getData:Object,
			required:true
		},
		methods:{
			//元素是否在可视区
			scrollHandle () {
			    const offset =this.$refs.tabLock1.getBoundingClientRect(); // vue中，使用this.$el获取当前组件的根元素
			    const offsetTop = offset.top;
			    const offsetBottom = offset.bottom;
			    const offsetHeight = offset.height;
			    // 进入可视区域
			    if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
			        //console.log('进入可视区域');
					//console.log(offsetTop)
					if(offsetTop<0){
						document.querySelector(".fa-fixBox").style.display="block";
					}
					else{
						document.querySelector(".fa-fixBox").style.display="none";
					}
			    } else {
			        //console.log('移出可视区域');
			        document.querySelector(".fa-fixBox").style.display="none";
			    }
			},
			//锁定表头
			lockHeader(){//console.log(window)
				var _this = this;
				window.addEventListener('scroll',_this.scrollHandle) 
			},
			//定义一个对象数组排序方法
			sortByKey(arr,key){
				return arr.sort(function(a, b) {
				var y = a[key];
				var x = b[key];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				})
			},
			//详细数据展开
			/* showSub(e){
				if(e.currentTarget.style.overflow=="hidden"){
					e.currentTarget.style.height="unset";
					e.currentTarget.style.overflow="unset";
					e.currentTarget.children[0].children[0].children[0].classList.add('rotat')
				}
				else{
					e.currentTarget.style.height="0.85333rem";
					e.currentTarget.style.overflow="hidden";
					e.currentTarget.children[0].children[0].children[0].classList.remove('rotat')
				}
			}, */
		},
		created() {
		},
		mounted(){
			this.lockHeader()
		},
		computed:{
			newDataArr(){
				return this.sortByKey(this.detailData,"currentConfirmedCount")
			}
		},
		destroyed() {
			window.removeEventListener('scroll',this.scrollHandle)
		}
	}
</script>

<style lang="scss" scoped="scoped">
.blockDataList{
		font-weight: 500!important;
		border-bottom: 0.01333rem solid #ebebeb;
		background-color: #fff!important;
		min-height: 0.64rem;
		display: flex;
		width: 100%;
	}
	.areaBox{
		padding:0.37rem 0.41rem;
		background-color: #fff;
		.boxheader{
			width: 100%;
			height: 0.85rem;
			background-color: #f7f7f7;
			font-weight: 700;
			color: #333;
			overflow: hidden;
			display: flex;
			font-size: 0.3rem;
			.title1{
				background-color: #e3e8f7;
				justify-content: left;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				height: 0.85rem;
				border-right: 0.01333rem solid #fff;
				width: 2.47706rem;
				span{
					margin-left: 0.53rem;
				}
			}
			.title2{
				background-color: #f3bab0;
				width: 1.73466rem;
				height: 0.85rem;
				box-sizing: border-box;
				border-right: 0.0133333rem solid #fff;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.title3{
				background-color: #e69a8d;
				width: 1.73466rem;
				height: 0.85rem;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				border-right: 0.0133333rem solid #fff;
				justify-content: center;
			}
			.title4{
				background-color: #b4c0d5;
				width:1.51946rem;
				height: 0.85rem;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				border-right: 0.01333333rem solid #fff;
				justify-content: center;
			}
			.title5{
				background-color: #95db9a;
				width: 1.6272rem;
				height: 0.85rem;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-right: 0.0133333rem solid #fff;
				justify-content: center;
			}
		}
		.fa-fixBox{
			position: relative;
			width: 100%;
			height: 0.85333rem;
			display: none;
			z-index: 11;
			.fixBoxHeader{
				position: fixed;
				top: 0px;
				width: auto;
				height: 0.85333rem;
				box-sizing: border-box;
				//margin:0 0.41rem;
				display: flex;
				font-weight: bold;
				.fixTit1{
					width: 2.49173rem;
					height: 0.85333rem;
					border-right: 0.01333rem solid #fff;
					background-color: #fff;
					display: flex;
					align-items: center;
					span{
						margin-left: 0.53rem;
					}
				}
				.fixTit2{
					width: 1.74506rem;
					height: 0.85333rem;
					border-right: 0.01333rem solid #fff;
					background-color: #fff;
					align-items: center;
					display: flex;
					justify-content: center;
				}
				.fixTit3{
					width: 1.74506rem;
					height: 0.85333rem;
					border-right: 0.01333rem solid #fff;
					background-color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.fixTit4{
					width: 1.52826rem;
					height: 0.85333rem;
					border-right: 0.01333rem solid #fff;
					background-color: #fff;
					align-items: center;
					display: flex;
					justify-content: center;
				}
				.fixTit5{
					width: 1.6368rem;
					height: 0.85333rem;
					border-right: 0.01333rem solid #fff;
					background-color: #fff;
					align-items: center;
					justify-content: center;
					display: flex;
				}
			}
		}
		.intro{
			margin-top: 0.21333rem;
			color: #999;
			font-size: 0.32rem;
			line-height: 0.48rem;
		}
		.areaBlock{
			//height: 0.85333rem;
			width: 100%;
			overflow: unset;
			.blockData{
				position: relative;
				display: flex;
				width: 100%;
				height: 0.85333rem;
				overflow: hidden;
				color:#333;
				font-weight: 700;
				background-color: #f7f7f7;
				font-size: 0.34666rem;
				.subTitle{
					display: flex;
					align-items: center;
					height: 0.85333rem;
					border-radius: 0.01333rem solid #fff;
					width: 2.48506rem;
					text-align: left!important;
					img{
						position: relative;
						height: 0.16rem;
						transition: all 0.2s;
						width: 0.21333rem;
						margin: 0 0.16rem;
						text-align: left!important;
						transform: rotate(-90deg);
						
					}
				}
				.currentConfirmed{
					display: flex;
					align-items: center;
					justify-content: center;
					width:1.73253rem;
					height: 0.85333rem;
					border-right: 0.01333rem solid #fff;
					font-size: 0.34666rem;
				}
				.comfirmed{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 1.73253rem;
					height: 0.85333rem;
					border-right: 0.01333rem solid #fff;
					font-size: 0.34666rem;
				}
				.dead{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 1.51786rem;
					height: 0.85333rem;
					border-right: 0.01333rem solid #fff;
					font-size: 0.34666rem;
				}
				.cured{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 1.62533rem;
					height: 0.85333rem;
					border-right: 0.01333rem solid #fff;
					font-size: 0.34666rem;
				}
			}
		}
	}
	.rotat{
		transform: rotate(0deg)!important;
	}
	.disappear{
		visibility: hidden!important;
	}
</style>
