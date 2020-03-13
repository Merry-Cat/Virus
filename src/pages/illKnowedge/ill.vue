<template>
	<div class="ill">
		<div class="nullDiv"></div>
		<div class="rumorsTitle">
			<i></i>
			疾病知识
		</div>
		<div class="knowLedgeContainer">
			<div class="item" v-for="(item,index) in knowledgeArr" :key="index">
				<div class="lazyImg" v-if="index>0">
					<img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;display: block; object-fit: cover;border-radius: 0px;">
				</div>
				<div class="right_cont">
					<div class="title_r">{{item.title}}</div>
					<a  class="subtitle" :href="item.linkUrl">
						<div class="linkcont">{{item.summary}}</div>
					</a>
					<div class="footer">
						<a :href="item.linkUrl">查看详情</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				knowledgeArr:[
					{title:'什么是新型冠状病毒？',summary:'此次流行的冠状病毒为一种新发现的冠状病毒，国际病毒分类委员会命名为 SARS-Cov-2。因为人群缺少对新型病毒株的免疫力，所以人群普遍易感。',imgUrl:'',linkUrl:'https://ask.dxy.com/ama/index#/disease/24677/info/0'},
					{title:'帮你排除感染症状',summary:'出现什么症状可能感染了新型冠状病毒？如何在家做好自我隔离？',imgUrl:'https://img1.dxycdn.com/2020/0126/335/3393120598787233917-66.png',linkUrl:'https://ask.dxy.com/ama/index#/disease/24677/info/1'},
					{title:'冠状病毒怕什么？',summary:'哪些人容易感染新型冠状病毒？什么人容易变成重症？新型冠状病毒致病性如何？',imgUrl:'https://img1.dxycdn.com/2020/0126/584/3393140198870641951-73.jpg',linkUrl:'https://ask.dxy.com/ama/index#/disease/24677/info/2'},
					{title:'做好预防面感染',summary:'人口不密集的地方可以不带口罩吗？口罩能重复带吗？煮沸后能重复使用吗？',imgUrl:'https://img1.dxycdn.com/2020/0127/314/3393234046053613437-73.jpg',linkUrl:'https://ask.dxy.com/ama/index#/disease/24677/info/6'},
					{title:'日常防护要到位',summary:'新型冠状病毒肺炎流行，外卖还能吃吗？买不到消毒液家里消毒用什么替代？',imgUrl:'https://img1.dxycdn.com/2020/0126/366/3393121524352686218-66.png',linkUrl:'https://ask.dxy.com/ama/index#/disease/24677/info/5'},
					{title:'如何确诊感染？',summary:'新型冠状病毒肺炎患者有什么临床表现？医生如何识别并确诊新型冠状病毒肺炎？',imgUrl:'https://img1.dxycdn.com/2020/0126/838/3393121081971054723-66.png',linkUrl:'https://ask.dxy.com/ama/index#/disease/24677/info/3'},
					{title:'治疗方法早知道',summary:'潜伏期能检查出来吗？感染了新型冠状病毒一定会得肺炎吗？新冠肺炎如何治疗？',imgUrl:'https://img1.dxycdn.com/2020/0126/500/3393121414831020167-66.png',linkUrl:'https://ask.dxy.com/ama/index#/disease/24677/info/4'}
				]
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.ill{
		padding-bottom: 0.42666rem;
		background-color: #fff;
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
		.knowLedgeContainer{
			padding:0 0.42666rem;
			background-image: url(https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/wiki-bg@3x.55bc1167.png);
			background-repeat: no-repeat;
			background-size: 100% 3.01333rem;
			border-top: 1px solid #fff;
			.item{
				max-height: 3.78666rem;
				margin: 0.42666rem 0;
				padding:0.53333rem 0.42666rem;
				background-color: #fff;
				border-radius: 0.10666rem;
				box-shadow: 0 0.08rem 0.26666rem 0 rgba($color: #000000, $alpha: 0.08);
				.lazyImg{
					float: left;
					width: 2.72rem;
					height: 2.72rem;
					object-fit: cover;
					border-radius: 0.10666rem;
					
				}
				.right_cont{
					overflow: hidden;
					.title_r{
						padding-top: 0.05333rem;
						color:#333;
						font-weight: 500;
						font-size: 0.45333rem;
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						margin-left: 0.32rem;
					}
					.subtitle{
						font-size: 0;
						text-decoration: none;
						padding:0;
						.linkcont{
							min-height: 1.28rem;
							padding-top: 0.08rem;
							color:#666;
							font-weight: 400;
							font-size: 0.32rem;
							line-height: 0.42666rem;
							display: -webkit-box;
							overflow: hidden;
							text-overflow: ellipsis;
							word-break: break-all;
							-webkit-line-clamp: 3;
							-webkit-box-orient: vertical;
							margin-left: 0.32rem;
						}
					}
					.footer{
						padding-top: 0.26666rem;
						overflow: hidden;
						margin-left: 0.32rem;
						a{
							float: right;
							color:#4169e2;
							font-size: 0.32rem;
							cursor: pointer;
						}
					}
				}
			}
		}
	}
</style>
