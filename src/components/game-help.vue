<template>
     <Content  v-if="language==1" :style="{padding: '0 50px'}">
    <p>
	一、游戏开始前的准备：
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;浏览器：Chrome / Firefox / Opera
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;钱包&nbsp; &nbsp;&nbsp;&nbsp;：MetaMask&nbsp;
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
	二、快速入手
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;<span>游戏使用大家所熟悉的“</span><span>剪刀包袱锤</span><span>”游戏策略，具体如何与以太坊区块链结合，下面详细介绍：</span> 
</p>
<p>
	<span><br />
</span>
</p>
<p>
	&nbsp; &nbsp; 游戏合约中存在一个卡牌池，游戏启动时，会随机设置一个启发阈值（数值不可知），如果当前玩家购买钥匙的Id值大于这个阈值，那么会随机在卡牌池中按顺序进行一次挑战，玩家初始都拥有<span>卡牌三张，奖章三枚，胜一局得到一枚章，负一局失去一枚章，平局不得不失</span>，此卡牌被消耗，剩余两张卡牌置于卡牌池中，被后来者被动进行随机挑战。当三张卡牌全部被消耗掉后，奖章数大于5则进入胜利方，反之则进入失败方。
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;
</p>
<p>
	&nbsp; &nbsp; 1、购买
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 1）选择卡牌（剪刀、包袱、锤头 卡牌可以重复），如何选择卡牌胜率更大，玩家可根据当前游戏状态，自行琢磨；
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 2）选择购买筹码数量，购买筹码的数量越多、购买时间越早，收益也随之越大；
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 3）点击购买，MetaMask 钱包会提示支付eth，输入密码支付后，区块链确认时间后会给出购买结果提示；
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 4）在玩家购买后的初始状态下，玩家拥有卡牌三张、奖章三枚，胜一局得到一枚，负一局失去一枚，平局不得不失；
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 2、用户信息
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 玩家购买的钥匙（key），以及钥匙的状态、收益等信息可以在 用户信息 栏中找到；
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 3、游戏信息
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 此栏目展示当前游戏的状态，包括当前轮次、奖池中eth总数量等信息；
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 4、订单薄
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 当玩家拥有6枚奖章时，玩家可选择出售一枚奖章，挂单出售的订单信息将展示在这里，双击进行购买；
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 假如玩家钥匙Id=112的钥匙，最后失败后拥有的奖章数量为4，那么他可以在订单中购买一枚奖章，数量达到5，那么其变为胜利者，加入胜利方，最后参与瓜分胜利方分红；但不能通过最后购买奖章成为“<span>最后胜利者</span>”。
</p>
<p>
	<br />
</p>
<p>
	三、游戏详解
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 游戏倒计时时间为72小时，当倒计时最终变为0，游戏结束；用户每购买一枚钥匙则增加30秒，时间上限为距离当前时间后推72小时；
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 游戏奖池分为六部分：
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 1）玩家分红：奖池25%根据玩家参与的先后与购买数量分红；
</p>
<p>
	<br />
</p>
<p>
	&nbsp;&nbsp;&nbsp;&nbsp;2）胜利方分红： 奖池30%平分给胜利方所有账户；
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 3）最后获胜利者奖金：奖池5%归最后胜利者拥有，属于瓜分胜利方分红的额外奖励；
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 4）最后购买者奖金：奖池10%归最后购买钥匙者拥有；
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 5）进入下一轮：奖池20%进入下一轮；
</p>
<p>
	<br />
</p>
<p>
	&nbsp; &nbsp; 6）社区分红：奖池10%归社区拥有；
</p>
<p style="color:#515A6E;font-family:katong;font-size:13px;background-color:#FFFFFF;">
	<br />
</p>
<p style="color:#515A6E;font-family:katong;font-size:13px;background-color:#FFFFFF;">
	四、联系我们
</p>
<p style="color:#515A6E;font-family:katong;font-size:13px;background-color:#FFFFFF;">
	<br />
</p>
<p style="color:#515A6E;font-family:katong;font-size:13px;background-color:#FFFFFF;">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱地址：janponwar@126.com
</p>
<p style="color:#515A6E;font-family:katong;font-size:13px;background-color:#FFFFFF;">
	<br />
</p>
     </Content>

     <Content  v-else :style="{padding: '0 50px'}">
    <p>
	First, the preparation before start of the game:<br />
<br />
&nbsp; &nbsp; Browser :&nbsp; Chrome / Firefox / Opera<br />
<br />
&nbsp; &nbsp; Wallet&nbsp; :&nbsp; MetaMask<br />
<br />
<br />
Second, start quickly<br />
<br />
&nbsp; &nbsp; The game uses "Rock–paper–scissors" game strategy, how to combine with the Ethereum blockchain, the following details:<br />
<br />
&nbsp; &nbsp; There is a card pool in the game contract. When the game starts, a heuristic threshold (value agnostic) is randomly set. If the current player's purchase key's Id value is greater than this threshold, then the challenge will be randomly performed in the card pool. This card is consumed. The player initially has three medals, one win in one game, one lose in one game, the tie has to be lost, and the remaining two cards are placed in the card pool. Passive random challenges. When all three cards are consumed, the number of medals greater than 5 enters the winner, and vice versa.<br />
<br />
&nbsp; &nbsp; 1, purchase<br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; 1) Select the card rock,paper,scissors  cards can be repeated), how to choose the card to improve winning percentage, the player can <span style="color:#222222;font-family:arial, sans-serif;font-size:13px;background-color:#FFFFFF;">think about&nbsp;&nbsp;</span>according to the current game state;
</p>
<p>
	<br />
&nbsp; &nbsp; &nbsp; &nbsp; 2) Choose the number of chips to buy, the more the number of chips to buy, the earlier the purchase time, the greater the profit;<br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; 3) Click on the button, MetaMask wallet will prompt to pay eth, after entering the password to pay, the block chain confirmation time will give the purchase result prompt;<br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; 4) In the initial state after the player purchases, the player has three cards and three medals, one win in one game, one lose in one game, and the tie has to be lost;<br />
<br />
&nbsp; &nbsp; 2, user information
</p>
<p>
	<br />
&nbsp; &nbsp; &nbsp; &nbsp; The key purchased by the player, as well as the status, benefits and other information of the key can be found in the user information column;<br />
<br />
&nbsp; &nbsp; 3, game information<br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; This column shows the status of the current game, including the current round, the total number of eths in the prize pool, and so on;<br />
<br />
&nbsp; &nbsp; 4, order book<br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; When the player has 6 medals, the player can choose to sell a medal, the order information of the pending order will be displayed here, double click to purchase;<br />
<br />
&nbsp; &nbsp; &nbsp; &nbsp; If the key of the player key Id=112, the number of medals after the final failure is 4, then he can buy a medal in the order, the number reaches 5, then it becomes the winner, join the winner, and finally participate in the victory. Dividends; but they cannot be the "last winner" by the final purchase of the medal.<br />
<br />
Third, the game detailed<br />
<br />
&nbsp; &nbsp; The game countdown time is 72 hours. When the countdown finally becomes 0, the game ends. The user adds 30 seconds for each key purchased. The upper limit of the time is 72 hours after the current time.<br />
<br />
&nbsp; &nbsp; The game prize pool is divided into six parts:<br />
<br />
&nbsp; &nbsp; 1) Players Dividends: 25% of the prize pool for players base on buy amount and time;<br />
<br />
&nbsp; &nbsp; 2) Victory Party Dividend: 30% of the prize pool is equally divided into all accounts of the winner;<br />
<br />
&nbsp; &nbsp; 3) The final winner's bonus: 5% of the prize pool is owned by the last winner, and belongs to the additional bonus of the winner's dividend;<br />
<br />
&nbsp; &nbsp; 4) Final purchaser bonus: 10% of the prize pool is owned by the person who purchased the key;<br />
<br />
&nbsp; &nbsp; 5) Enter the next round: 20% of the prize pool enters the next round;<br />
<br />
&nbsp; &nbsp; 6) Community Dividend: 10% of the prize pool is owned by the community;]
</p>
<p>
	<br />
</p>
<p>
	Contact us
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
