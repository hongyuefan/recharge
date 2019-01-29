<template>
<Content  :style="{padding: '0 50px'}">
   <p>
	<br />
</p>
<p>
	一、MetaMask浏览器钱包支付：
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;浏览器：Chrome / Firefox / Opera
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;钱包插件：MetaMask&nbsp;
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;如果国内用户无法翻墙，则不能通过google的应用商店安装chrome版的&nbsp;<span>MetaMask&nbsp;</span>钱包，建议使用Firefox（火狐）浏览器，并安装火狐版的 MetaMask 钱包，其不需要翻墙即可安装使用。
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 购买
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 1）填写“充值金额”（单位：eth）；
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 2）点击“确定”，浏览器会自动调用MetaMask钱包，输入支付密码支付；
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 3）因为区块链交易确认时间，需要等待几分钟后才能在个人中心查看到充值金额；
</p>
<p>
	<br />
</p>
<p>
	二、扫码支付
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;
</p>
<p>
	&nbsp; &nbsp; 1）使用任意以太坊手机钱包，打开扫一扫，支付充值；
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;
</p>
<p>
	&nbsp; &nbsp; 2）充值完成后一定要填写表单信息；
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“充值地址”：此处填写你的支付钱包账户地址
</p>
<p>
	&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; “充值金额”：务必按实际充值金额填写
</p>
<p>
	&nbsp; &nbsp;&nbsp;
</p>
<p>
	三、联系客服
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; Email :&nbsp;<span style="color:#515A6E;font-family:katong;font-size:13px;background-color:#FFFFFF;">janponwar@126.com</span> 
</p>
<p>
	<br />
</p>
     </Content>

</template>



<script>

import {mapState} from 'vuex'

export default {
    data(){
         return{
        }
    },
    computed: mapState({
            language:state => state.language,
    }),
}
</script>
