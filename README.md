# 仿丁香园的新冠状病毒实时播报页

## 项目说明
```
--------------------请在手机上预览，或者打开谷歌控制台手机预览模式--------------------------------------

由于疫情原因太久没编码了，正好在学习Vue，就拿了丁香园这个疫情来练练手。

技术栈：Vue-CLI+Vue+VueRouter+Axios+Echarts+Vant

npm install 安装，命令行 npm run serve 开发模式运行，npm run build 生产模式运行。cdn方面我没有过多的去优化。

同时请求多个数据接口的时候会报浏览器跨域错误，导致请求失败。我目前还没找到是什么原因。所以有时候会出现组件加载不

出来的情况，要刷新试试。

因为接口里面省级历史数据是个json文件。展示太麻烦。所以我只展示了湖北省（1月20号到3月10号）的数据，地图上点击任

何一个省跳转的数据都是湖北的。数据表格也是一样的。
```

## 数据请求接口
```
所有的数据请求都来自于这里 https://github.com/BlankerL/DXY-COVID-19-Crawler,
```
## 网页截图
```
![疫情概览](https://gitee.com/ThxMay/Virus/blob/master/img/IMG_2029.PNG)
![疫情地图](https://gitee.com/ThxMay/Virus/blob/master/img/IMG_2030.PNG)
![实时播报](https://gitee.com/ThxMay/Virus/blob/master/img/IMG_2032.PNG)
![疾病知识](https://gitee.com/ThxMay/Virus/blob/master/img/IMG_2033.PNG)
![省级数据](https://gitee.com/ThxMay/Virus/blob/master/img/IMG_2034.PNG)
```
## 结语
```
项目比较简单，适合新手练手。还有些功能没有完善，需要的可以自行完善。

原网址地址  https://ncov.dxy.cn/ncovh5/view/pneumonia
```