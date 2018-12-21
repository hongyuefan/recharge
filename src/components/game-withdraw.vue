<template>
<div  id="timestyle">
   <Row type="flex" justify="center">
   <Col span="24">
    <Card>
    <Form >
        <FormItem >
            <Select v-model="curSelect" v-if="language==1" style="width:200px" placeholder = "请选择"  @on-change="onChange">
                <Option v-for="item in allItems" :value="item" :key="item">{{item}}</Option>
            </Select>
            <Select v-model="curSelect" v-if="language==2" style="width:200px" placeholder = "please chose"  @on-change="onChange">
                <Option v-for="item in allItems" :value="item" :key="item">{{item}}</Option>
            </Select>
        </FormItem>
    
         <FormItem >
            <Input type="text" v-if="language == 1" size="large" v-model="amount"  readonly="readonly">
                <label value="amount" slot="prepend">筹码</label>
                <Poptip trigger="hover" content="当前钥匙购买的筹码数量" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
            <Input type="text" v-if="language == 2" size="large" v-model="amount"  readonly="readonly">
                <label value="amount" slot="prepend">Amount</label>
                <Poptip trigger="hover" content="this key buys amount" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem>    

        <FormItem v-if="language == 1">
            <Input type="text" v-model="benefit" size="large"  readonly="readonly">
                <label value="benefit" slot="prepend">分红</label>
                <Poptip trigger="hover" content="根据购买的时间与数量产生的分红(eth)" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem>

         <FormItem v-if="language == 2" >
            <Input type="text" v-model="benefit" size="large" readonly="readonly">
                <label value="benefit" slot="prepend">Bonus</label>
                <Poptip trigger="hover" content="Bonus based on the time and quantity of purchase.(eth)" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem>

        <FormItem v-if="language == 1">
            <Poptip trigger="hover" v-if="isBenefit==false" content="游戏结束后方可提现" >
                <Button  type="primary" v-if="gameState == true" disabled  :loading="btnLoading"  @click="onWithdraw">提现</Button>
                <Button  type="primary" v-else  :loading="btnLoading"  @click="onWithdraw">提现</Button>
            </Poptip>
            <Poptip trigger="hover" v-else content="你已经提现，不能重复发起" >
                <Button  type="primary"  disabled  :loading="btnLoading"  @click="onWithdraw">提现</Button>
            </Poptip>
        </FormItem>

         <FormItem v-if="language == 2">
             <Poptip trigger="hover" v-if="isBenefit==false" content="Please withdraw cash after game over">
                <Button  type="primary"  v-if="gameState == true" disabled  :loading="btnLoading"  @click="onWithdraw">withdraw</Button>
                <Button  type="primary"  v-else  :loading="btnLoading"  @click="onWithdraw">withdraw</Button>
             </Poptip>
            <Poptip trigger="hover" v-else content="you have already withdrew cash" >
                <Button  type="primary"  disabled  :loading="btnLoading"  @click="onWithdraw">withdraw</Button>
             </Poptip> 
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
            curSelect: null,
            amount:0,
            isBenefit:false,
            gameState:true,
            benefit:0,
            btnLoading:false,
            round:0,
        }
    },
    computed: mapState({
            language:state => state.language,
            allItems:state => state.totalData,
            team:state => state.team,
    }),

    methods:{
    
    onWithdraw: function(){
        this.btnLoading = true
        this.$store.state.contractInstance().withdrawBenefit(this.round,this.curSelect,{
              gas: 3000000,
              from: this.$store.state.web3.coinbase
            },(error,result)=>{
            if (error) {
                this.showNotice(false,error)
            }else{
                 let onWithdrawEvent = this.$store.state.contractInstance().onWithdrawBenefit()
                  onWithdrawEvent.watch((err, result) => {
                  if (err) {
                      this.showNotice(false,err)
                      this.btnLoading = false
                  } else {
                      this.showNotice(true,this.language==1?'提现成功':'withdraw success')
                      this.btnLoading = false
                  }
                })
            }
        })

    },
    
    showNotice: function(ok,dsc){
            if (ok){
                this.$Notice.success({
                    title: 'Success',
                    desc: dsc,
                    duration:6
                });
            }else{
                this.$Notice.error({
                    title: 'Error Info',
                    desc: dsc,
                    duration:6
                });
            }
      },

      getBenefitDetail: function(id){
          this.$store.state.contractInstance().getGameStatus((error,result)=>{
              if (error) {
                  this.showNotice(false,error);
              }else{
                   this.round = result[0].toNumber()
                   this.gameState = result[1]

                   this.$store.state.contractInstance().getBenefit(this.round,id,(error,result)=>{
                    if (error) {
                       this.showNotice(false,error)
                    }else{
                       this.amount = result[0].toNumber()
                       this.benefit = this.$store.state.web3.web3Instance().fromWei(result[1].toNumber(), 'ether')
                       this.isBenefit = result[2]
                    }
         })
              }
          })
         
      },

      onChange:function(){
          this.getBenefitDetail(this.curSelect)
      }

    }
}
</script>
