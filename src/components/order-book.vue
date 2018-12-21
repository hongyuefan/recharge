<template>
<div>
    <Table height="337"  v-if="language == 1" border highlight-row stripe ref="currentRowTable" :columns="colCN" :data="data" @on-row-dblclick="onBtnBuy"></Table>
 
    <Table height="337"  v-if="language == 2" border highlight-row stripe ref="currentRowTable" :columns="colEN" :data="data" @on-row-dblclick="onBtnBuy"></Table>

    <Modal
      v-model="showModule"
      footer-hide   
    >
    <order-model :seller="curKey" :price="curPrice"> </order-model>
    </Modal>

</div>
</template>

<script>
import {BigNumber} from 'bignumber.js'
import {mapState} from 'vuex'
import OrderModel from '../components/order-model'

    export default {
        data () {
            return {
                curKey:null,
                curPrice:null,
                showModule:false,
                timer:null,
                colCN: [
                    {
                        title: '卖家 [双击购买]',
                        key: 'key',
                        align:'center'
                    },
                    {
                        title: '数量',
                        align: 'center',
                        render:(h, params) => {
                          return h('div', [
                                h('Icon', {
                                   props: {
                                        type:'ios-star'
                                    }
                                }
                                 ),
                                ]); 
                        }
                    },
                    {
                        title: '价格 (eth)',
                        key: 'price',
                        sortable: true
                    },
                
                ],
                colEN:[
                    {
                        title: 'Seller [Double Click]',
                        key: 'key',
                        align:'center'
                    },
                    {
                        title: 'Amount',
                        align: 'center',
                        render:(h, params) => {
                          return h('div', [
                                h('Icon', {
                                   props: {
                                        type:'ios-star'
                                    }
                                }
                                 ),
                                ]); 
                        }
                    },
                    {
                        title: 'Price (eth)',
                        key: 'price',
                        sortable: true
                    },
                ],
                data: new Array(),
                dataIndex: new Array()
            }
        },
        computed: mapState({
            language:state => state.language,
        }),
        methods:{
          onBtnBuy: function(data){
             this.curKey = data.key
             this.curPrice  = data.price
             this.showModule = true
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
          getOrders: function(){

              var tmpArray = new Array()

              this.$store.state.contractInstance().getOrders((error,result)=>{
                  if (error) {
                      this.showNotice(false,error)
                  }else{
                      result.forEach(element => {
                          if (tmpArray.indexOf(element.toNumber()) == -1){
                              tmpArray.push(element.toNumber())
                          }
                      });
                      tmpArray.forEach(element =>{
                          if (this.dataIndex.indexOf(element) == -1) {
                              this.$store.state.contractInstance().getSuccessDetail(element,(error,result)=>{
                              if (error) {
                                this.showNotice(error)
                              }else{
                                if (result[3] == true){
                                    this.dataIndex.push(element);
                                    this.data.push({key:element,price:this.$store.state.web3.web3Instance().fromWei(result[4].toNumber(),"ether")});
                                }
                               
                             }
                             })
                          }
                      });
                  }
               })
              
              
          }
            
        },
        components:{
          'order-model':OrderModel,
        },
        mounted(){
            this.timer = setInterval( ()=>{
                this.getOrders()
            },5000)
        },
        destroyed(){
            clearInterval(this.timer)
        }
    }
</script>