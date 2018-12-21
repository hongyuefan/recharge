<template>
<div  id="timestyle">
   <Row type="flex" justify="center">
   <Col span="24">
    <Card>
    <Form v-if="language==1">
        <FormItem >
            <Select v-model="curSelect" style="width:200px" placeholder = "请选择"  @on-change="onChange">
                <Option v-for="item in sucItems" :value="item" :key="item">{{item}}</Option>
            </Select>
        </FormItem>
        
         <FormItem >
           <Row type="flex" justify="center">
              <Col span="4" id="ColStype">
                <Card :padding= 1>
                  <div style="text-align:center">
                    <img style="max-width:50%;overflow:hidden;margin-top:10%;" v-bind:src="imgJan">
                  </div>
                </Card>
              </Col>

              <Col span="4" id="ColStype">
                <Card :padding= 1>
                  <div style="text-align:center">
                    <img style="max-width:50%;overflow:hidden;margin-top:10%;" v-bind:src="imgKen" >
                  </div>
                </Card>
              </Col>

              <Col span="4" id="ColStype">
                <Card :padding= 1>
                  <div style="text-align:center">
                    <img style="max-width:50%;overflow:hidden;margin-top:10%;" v-bind:src="imgPon" >
                  </div>
                </Card>
              </Col>
            </Row>
         </FormItem>

        <FormItem >
            <Input type="text" v-model="amount" size="large" readonly="readonly">
                <label value="amount" slot="prepend">筹码</label>
                <Poptip trigger="hover" content="当前钥匙购买的筹码数量" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem>  
        
        <FormItem >
            <Input type="text" v-model="star" size="large"  readonly="readonly">
                <label value="STAR" slot="prepend">奖章</label>
                <Poptip trigger="hover" content="当前钥匙拥有的奖章数量" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem>

        <FormItem >
            <Input type="text" v-model="reward" size="large" readonly="readonly">
                <label value="reward" slot="prepend">奖金</label>
                <Poptip trigger="hover" content="作为胜利者的奖金,游戏结束后可提现" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem>
        <Divider />
         <FormItem v-if="isSelling == false && star > 5 && gameState == true">
           <Input type="text" v-model="price" size="large" placeholder="ETH" >
                <label value="price" slot="prepend">价格</label>
                <Poptip trigger="hover" content="当奖章数等于6时，可出售1个，获取额外收益，交易额10%进入游戏资金池(单位：ETH)" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
         </FormItem >
         <FormItem v-else-if="isSelling == true && star > 5">
           <Input type="text" v-model="price" size="large" readonly="readonly">
                <label value="price" slot="prepend">价格</label>
                <Poptip trigger="hover" content="当奖章数等于6时，可出售1个，获取额外收益，交易额10%进入游戏资金池（单位：ETH）" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
         </FormItem>
         
         <FormItem v-if="isSelling && gameState == true">
           <Button  type="primary" size="large" :loading="btnLoading"  @click="canselOrder">撤单</Button>
         </FormItem>
         <FormItem v-else>
           <Button  type="primary" size="large" v-if="star >5" :loading="btnLoading"  @click="doOrder">挂单</Button>
         </FormItem>
         <FormItem v-if="gameState == false">
           <Button  type="primary" :loading="btnLoading"  @click="doReward">提现</Button>
         </FormItem>
    </Form>

     <Form v-if="language==2">
        <FormItem >
            <Select v-model="curSelect" style="width:200px" placeholder = "please chose"  @on-change="onChange">
                <Option v-for="item in sucItems" :value="item" :key="item">{{item}}</Option>
            </Select>
        </FormItem>
        
         <FormItem >
           <Row type="flex" justify="center">
              <Col span="4" id="ColStype">
                <Card :padding= 1>
                  <div style="text-align:center">
                    <img style="max-width:50%;overflow:hidden;margin-top:10%;" v-bind:src="imgJan" >
                  </div>
                </Card>
              </Col>

              <Col span="4" id="ColStype">
                <Card :padding= 1>
                  <div style="text-align:center">
                    <img style="max-width:50%;overflow:hidden;margin-top:10%;" v-bind:src="imgKen" >
                  </div>
                </Card>
              </Col>

              <Col span="4" id="ColStype">
                <Card :padding= 1>
                  <div style="text-align:center">
                    <img style="max-width:50%;overflow:hidden;margin-top:10%;" v-bind:src="imgPon" >
                  </div>
                </Card>
              </Col>
            </Row>
         </FormItem>

        <FormItem >
            <Input type="text" v-model="amount" size="large" readonly="readonly">
                <label value="amount" slot="prepend">AMOUNT</label>
                <Poptip trigger="hover" content="this key buys amount" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem> 

        <FormItem >
            <Input type="text" v-model="star" size="large"  readonly="readonly">
                <label value="STAR" slot="prepend">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STAR</label>
                <Poptip trigger="hover" content="this key has stars number" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem>

        <FormItem >
            <Input type="text" v-model="reward" size="large" readonly="readonly">
                <label value="reward" slot="prepend">REWARD</label>
                <Poptip trigger="hover" content="Winner's bonus,withdraw after game over" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem>
        <Divider />
         <FormItem v-if="isSelling == false && star > 5 && gameState == true">
           <Input type="text" v-model="price" size="large" placeholder="ETH" >
                 <label value="price" slot="prepend">&nbsp;&nbsp;&nbsp;&nbsp;PRICE</label>
                 <Poptip trigger="hover" content="when you have 6 stars,you can sell one to others,10% into pool.(ETH)" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
         </FormItem >
         <FormItem v-else-if="isSelling == true && star > 5">
           <Input type="text" v-model="price" size="large" readonly="readonly">
                <label value="price" slot="prepend">&nbsp;&nbsp;&nbsp;&nbsp;PRICE</label>
                <Poptip trigger="hover" content="when you have 6 stars,you can sell one to others,10% into pool.(ETH)" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
         </FormItem>

         <FormItem v-if="isSelling && gameState == true">
           <Button  type="primary" size="large" :loading="btnLoading"  @click="canselOrder">Cansel Order</Button>
         </FormItem>
         <FormItem v-else>
           <Button  type="primary" size="large" v-if="star >5" :loading="btnLoading"  @click="doOrder">Do Order</Button>
         </FormItem>

          <FormItem v-if="gameState == false">
           <Button  type="primary"  :loading="btnLoading"  @click="doReward">Withdraw</Button>
         </FormItem>
    </Form>
  </Card>
  </Col>
  </Row>
</div>
</template>

<style>
    #timestyle{
        text-align: center;
        border-style:solid 1px;
        margin: 1%;
    }
</style>

<script>
import {mapState} from 'vuex'
export default {
   
    data(){
        return{
            curSelect:null,
            mItem:new Map(),
            star:0,
            reward:0,
            card: new Array(),
            isSelling:false,
            price:null,
            amount:0,
            round:1,
            btnLoading:false,
            CNStarContant:"",
            ENStarContant:"",
            CNPriceContant:"",
            ENPriceContant:"",
            timer:null,

            imgJan:"",
            imgKen:"",
            imgPon:"",
        }
    },
    computed: mapState({
            sucItems:state => state.successData,
            language:state => state.language,
            gameState:state => state.gameState,
    }),
    methods:{
      showNotice: function(ok,dsc){
            if (ok){
                this.$Notice.success({
                    title: this.language==1?'成功':'Success',
                    desc: dsc,
                    duration:6
                });
            }else{
                this.$Notice.error({
                    title: this.language==1?'失败':'Error',
                    desc: dsc,
                    duration:6
                });
            }
          },

      getSuccessDetail: function(id){
        this.getSuccessReward();
        this.$store.state.contractInstance().getSuccessDetail(id,(error,result)=>{
            if (error) {
                       this.showNotice(false,error)
            }else{
                       result[1].forEach(element => {
                         this.card.push(element)
                       });
                       this.imgJan = require("../images/chose-" + this.card[0] + ".png");
                       this.imgKen = require("../images/chose-" + this.card[1] + ".png");
                       this.imgPon = require("../images/chose-" + this.card[2] + ".png");

                       this.star = result[2].toNumber()
                       this.isSelling = result[3]
                       this.price =this.$store.state.web3.web3Instance().fromWei( result[4].toNumber(),"ether")
                       this.amount = result[5].toNumber()
                  }
         })
      },

      getSuccessReward(){
        this.$store.state.contractInstance().getGameStatus((error,result)=>{
              if (error) {
                  this.showNotice(false,error);
              }else{
                  this.round = result[0].toNumber();
              }
        })
        this.$store.state.contractInstance().getWithdrawShare(this.round,(error,result)=>{
             if (error) {
                this.showNotice(false,error);
             }else{
                this.reward = this.$store.state.web3.web3Instance().fromWei(result.toNumber(),"ether");
             }
        })
      },

      doReward: function(){
        this.btnLoading = true
        this.$store.state.contractInstance().withdrawShare(this.round,this.curSelect,{
              gas: 3000000,
              from: this.$store.state.web3.coinbase
            },(error,result)=>{
            if (error) {
                this.showNotice(false,error)
            }else{
                this.showNotice(true,this.language==1?'提取奖金成功，稍后查看钱包':'withdraw success,please check your wallet')
            }
            })
      },

      doOrder: function(){
        this.btnLoading = true
        this.$store.state.contractInstance().doOrder(this.curSelect,this.$store.state.web3.web3Instance().toWei(this.price, 'ether'),{
              gas: 3000000,
              from: this.$store.state.web3.coinbase
            },(error,result)=>{
            if (error) {
                       this.showNotice(false,error)
                       this.btnLoading = false
            }else{
                  let onSellOrder = this.$store.state.contractInstance().onSellOrder()
                  onSellOrder.watch((err, result) => {
                  if (err) {
                      this.showNotice(false,err)
                      this.btnLoading = false
                  } else {
                      this.showNotice(true,this.language==1?'挂单成功，请到订单薄查看挂单信息':'Do order success,please go to star order book look for detail')
                      this.btnLoading = false
                  }
                })
            }
         })
        
      },
      
      canselOrder: function(id){
        this.btnLoading = true
        this.$store.state.contractInstance().cancelOrder(this.curSelect,{
              gas: 3000000,
              from: this.$store.state.web3.coinbase
            },(error,result)=>{
            if (error) {
                       this.showNotice(false,error)
                       this.btnLoading = false
            }else{
                let onCancelOrder = this.$store.state.contractInstance().onCancelOrder()
                onCancelOrder.watch((err, result) => {
                if (err) {
                      this.showNotice(false,err)
                      this.btnLoading = false
                } else {
                      this.showNotice(true,this.language==1?'撤单成功':'Cancel Order Success')
                      this.btnLoading = false
                }
                })
            }
         })
         
      },

      onChange:function(){ 
          this.getSuccessDetail(this.curSelect)
        }
      },
}
</script>
