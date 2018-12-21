<template>
<div id="cardchose">
<Row type="flex" justify="center">
  <Col span="7" id="ColStype">
    <Carousel
        v-model="card1"
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow">
        <CarouselItem>
             <Card >
            <div style="text-align:center">
              <img id="jan"  style="max-width:100%;overflow:hidden;" src="../images/chose-0.png" >
              <h3 v-if="language==1"> 剪刀 </h3>
              <h3 v-if="language==2"> scissors </h3>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
             <Card >
            <div style="text-align:center">
              <img id="ken"  style="max-width:100%;overflow:hidden;" src="../images/chose-1.png" >
              <h3 v-if="language==1"> 石头 </h3>
              <h3 v-if="language==2"> rock </h3>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
             <Card >
            <div style="text-align:center">
              <img id="po"  style="max-width:100%;overflow:hidden;" src="../images/chose-2.png" >
              <h3 v-if="language==1"> 布 </h3>
              <h3 v-if="language==2"> paper </h3>
            </div>
          </Card>
        </CarouselItem>
        </Carousel>
      </Col>
      <Col span="7" id="ColStype">
    <Carousel
        v-model="card2"
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow">
        <CarouselItem>
             <Card >
            <div style="text-align:center">
              <img id="jan"  style="max-width:100%;overflow:hidden;" src="../images/chose-0.png" >
              <h3 v-if="language==1"> 剪刀 </h3>
              <h3 v-if="language==2"> scissors </h3>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
             <Card >
            <div style="text-align:center">
              <img id="ken"  style="max-width:100%;overflow:hidden;" src="../images/chose-1.png" >
              <h3 v-if="language==1"> 石头 </h3>
              <h3 v-if="language==2"> rock </h3>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
             <Card >
            <div style="text-align:center">
              <img id="po"  style="max-width:100%;overflow:hidden;" src="../images/chose-2.png" >
              <h3 v-if="language==1"> 布 </h3>
              <h3 v-if="language==2"> paper </h3>
            </div>
          </Card>
        </CarouselItem>
        </Carousel>
      </Col>
      <Col span="7" id="ColStype">
    <Carousel
        v-model="card3"
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow">
        <CarouselItem>
             <Card >
            <div style="text-align:center">
              <img id="jan"  style="max-width:100%;overflow:hidden;" src="../images/chose-0.png" >
              <h3 v-if="language==1"> 剪刀 </h3>
              <h3 v-if="language==2"> scissors </h3>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
             <Card >
            <div style="text-align:center">
              <img id="ken"  style="max-width:100%;overflow:hidden;" src="../images/chose-1.png" >
              <h3 v-if="language==1"> 石头 </h3>
              <h3 v-if="language==2"> rock </h3>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
             <Card >
            <div style="text-align:center">
              <img id="po"  style="max-width:100%;overflow:hidden;" src="../images/chose-2.png" >
              <h3 v-if="language==1"> 布 </h3>
              <h3 v-if="language==2"> paper </h3>
            </div>
          </Card>
        </CarouselItem>
        </Carousel>
      </Col>
</Row>
<div class="price">
<Row type="flex" justify="center">
  <Col>
 <Form style="margin:2%;">
                 <FormItem >
                     <Input v-model="value" size="large" readonly="readonly" style="width: auto">
                      <span slot="prepend">ETH</span>
                      <span slot="append">&#8776;{{value*ethPrice}}$</span>
                     </Input>
                 </FormItem>
  </Form>
</Col>
</Row>
</div>
<div id="slider">
  <Row>
    <Col span="20" offset="4">
      <Slider v-model="slider" :max="maxAmout" :min="minAmout" :tip-format="hideFormat" @on-change="onChange" show-input></Slider>
    </Col>
  </Row>
</div>
<Poptip trigger="hover" content="购买前注意选择你的卡牌"><Button  type="primary" v-if="language==1" long @click="onBuy" :loading="btnLoading">购买</Button></Poptip>
<Poptip trigger="hover" content="Please  chose  your  cards  before  buy"><Button  type="primary" v-if="language==2" long @click="onBuy" :loading="btnLoading">Buy</Button></Poptip>



</div>
</template>

<style>
    #cardchose{
        margin: 1%;
        border-style: solid;
        border-width: 1px;
        padding: 1%;
        border-color: rgb(245, 241, 241);
    }
    #ColStype{
        margin: 1%;
    }
    .price{
      text-align: center;
      margin-top: 1%;
    }
    #slider{
      text-align: center;
      border: 1px;
      margin-bottom: 1%;
    }
</style>


<script>

import {BigNumber} from 'bignumber.js'
import {mapState} from 'vuex'

export default {
        data () {
            return {
                card1: 0,
                card2: 0,
                card3: 0,
                price:0,
                ethPrice:200,
                value:0,
                amount:0,
                btnLoading:false,
                maxAmout:10,
                minAmout:0,
                slider:0,
                timer:null,
                setting: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: true,
                    trigger: 'click',
                    arrow: 'hover'
                }
            }
        },
        computed: mapState({
            language:state => state.language,
            balance: state => state.web3.balance,
        }),
        methods:{
          onChange: function(data){
            this.amount = data;
            this.value = this.price * this.amount;
          },
          hideFormat: function() {
            return null;
          },
          onBuy:function(){
            
            this.btnLoading = true

            var arrayCards = new Array()

            arrayCards[0] = this.card1
            arrayCards[1] = this.card2
            arrayCards[2] = this.card3

            this.$store.state.contractInstance().joinGame(arrayCards,this.amount,{
              gas: 3000000,
              value: this.$store.state.web3.web3Instance().toWei(this.value, 'ether'),
              from: this.$store.state.web3.coinbase
            }, (err, result) => {
              if (err) {
                this.showNotice(false,err)
                this.btnLoading = false
              } else {
                let onJoinGame = this.$store.state.contractInstance().onJoinGame()
                onJoinGame.watch((err, result) => {
                  if (err) {
                      this.showNotice(false,'could not get event onJoinGame()')
                      this.btnLoading = false
                      return;
                  } else {
                      this.setPrice(parseInt(result.args.curPrice, 10)) 
                      this.btnLoading = false
                      this.showNotice(true,this.language==1?'购买成功':'Buy Success')
                      return;
                  }
                })
              }
            })
            },
          setPrice: function(prc){
             this.price = this.$store.state.web3.web3Instance().fromWei(prc, 'ether')
             this.maxAmout = (this.balance-this.$store.state.web3.web3Instance().toWei(0.01, 'ether')) / prc;
          },
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
          getCurPrice: function(){
             this.$http.get("https://api.coinmarketcap.com/v1/ticker/ethereum/").then((res)=>{
               this.ethPrice = res.data[0].price_usd
            })
            this.$store.state.contractInstance().currentPrice((error,result)=>{
                this.setPrice(BigNumber(result).toNumber())
               })　
          }
        },
         mounted() {
           this.timer = setInterval( () => {
　　　　　　   this.getCurPrice()
　　　　　　  }, 5000)
        },
        destroyed(){
            clearInterval(this.timer)
        }
    }
</script>