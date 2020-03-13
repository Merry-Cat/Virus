<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
	*{
		margin:0;
		padding: 0;
	}
	.van-tabs__content{
		margin-top: 70px;
	}
	.van-step__line{
		background-color: #c0bbbb!important;
		height: calc(100% + 0.42666rem)!important;
		width: 0.02666rem!important;
	}
	.tooltip{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 0.22rem;
		line-height: 14px;
	}
	.tooltipLeft{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.tooltip-right{
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		margin-left: 5px;
		font-size: 0.22rem;
	}
	a{
		text-decoration: none;
		color:#fff;
		display: inline-block;
		padding: 0 0.15rem;
		font-size: 0.22rem;
		border-left: 1px solid #fff;
	}
</style>

