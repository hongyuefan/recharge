<template>
     <Card>
         <Row>
             <Col span="12">
             <div style="text-align: center;padding:5px 0 0 0">
                <label v-if="language==1">请选择为你的哪一个钥匙购买奖章：</label>
                <label v-if="language==2">please chose your key for buy:</label>
             </div>
             </Col>
             <Col span="6"> 
             <div style="text-align: center;">
         <Select v-model="curSelect" v-if="language==1"  placeholder = "请选择" >
                <Option v-for="item in sucItems" :value="item" :key="item">{{item}}</Option>
         </Select>
         <Select v-model="curSelect" v-if="language==2"  placeholder = "please chose">
                <Option v-for="item in sucItems" :value="item" :key="item">{{item}}</Option>
         </Select>
             </div>
            </Col>
            <Col span="6">
            <div style="text-align: center;">
            <Button size="default" v-if="language==1" type="primary" :loading="btnLoading"  @click="onBuy">购买</Button>
            <Button size="default" v-if="language==2" type="primary" :loading="btnLoading"  @click="onBuy">Buy</Button>
            </div>
            </Col>
         </Row>
     </Card>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            curSelect:null,
            btnLoading:false,
        }
    },
    props:['seller','price'],
    computed: mapState({
            sucItems:state => state.failedData,
            language:state => state.language,
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
        onBuy:function(){
            this.btnLoading = true
            this.$store.state.contractInstance().buyOrder(this.curSelect,this.seller,{
              gas: 3000000,
              value: this.$store.state.web3.web3Instance().toWei(this.price, 'ether'),
              from: this.$store.state.web3.coinbase
            }, (err, result) => {
              if (err) {
                this.showNotice(false,err)
                this.btnLoading = false
              } else {
                let onBuyOrder = this.$store.state.contractInstance().onBuyOrder()
                onBuyOrder.watch((err, result) => {
                  if (err) {
                      this.showNotice(false,err)
                      this.btnLoading = false
                  } else {
                      this.showNotice(true,this.language==1?'购买成功':'Buy Success')
                      this.btnLoading = false
                  }
                })
              }
            })
            
        }
    }
}
</script>
