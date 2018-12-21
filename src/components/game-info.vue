<template>
    <div  id="timestyle" >
        <Card v-if="language == 1">
            <Form   :label-width="80">
                 <FormItem label="用户地址" prop="name">
                     <Input v-model="address" size="large" readonly="readonly">
                     <Icon type="ios-person" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="钥匙列表" prop="name">
                     <Input v-model="roles" size="large" readonly="readonly">
                      <Icon type="ios-key"  slot="prepend"></Icon>
                      <Button  type="default" slot="append" @click="showWithdrawModel=true">详情</Button>
                     </Input>
                      <Modal
                        v-model="showWithdrawModel"
                        footer-hide   
                        >
                        <game-withdraw/>
                     </Modal>
                 </FormItem>
                 <FormItem label="胜利钥匙" >
                     <Input v-model="success" size="large" readonly="readonly">
                     <Icon type="md-happy" slot="prepend"></Icon>
                     <Button  type="default" slot="append" @click="showSucModel=true">详情</Button>
                     </Input>  
                     <Modal
                        v-model="showSucModel"
                        footer-hide   
                        >
                        <game-success/>    
                     </Modal>
                 </FormItem>
                 <FormItem label="失败钥匙" prop="name">
                     <Input v-model="failed" size="large" readonly="readonly">
                     <Icon type="md-sad" slot="prepend"></Icon>
                      <Button  type="default" slot="append" @click="showFalModel=true">详情</Button>
                     </Input>  
                     <Modal
                        v-model="showFalModel"
                        footer-hide   
                        >
                        <game-failed/>    
                     </Modal>
                 </FormItem>
            </Form>
        </Card>
        <Card v-if="language == 2">
            <Form   :label-width="80">
                 <FormItem label="address" prop="name">
                     <Input v-model="address" size="large" readonly="readonly">
                     <Icon type="ios-person" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="all keys" prop="name">
                     <Input v-model="roles" size="large" readonly="readonly">
                     <Icon type="ios-key"  slot="prepend"></Icon>
                     <Button  type="default" slot="append" @click="showWithdrawModel=true">Detail</Button>
                     </Input>
                      <Modal
                        v-model="showWithdrawModel"
                        footer-hide   
                        >
                        <game-withdraw/>    
                     </Modal>
                 </FormItem>
                 <FormItem label="win keys" >
                     <Input v-model="success" size="large" readonly="readonly">
                     <Icon type="md-happy" slot="prepend"></Icon>
                     <Button  type="default" slot="append" @click="showSucModel=true">Detail</Button>
                     </Input>  
                     <Modal
                        v-model="showSucModel"
                        footer-hide   
                        >
                        <game-success/>    
                     </Modal>
                 </FormItem>
                 <FormItem label="lose keys" prop="name">
                     <Input v-model="failed" size="large" readonly="readonly">
                     <Icon type="md-sad" slot="prepend"></Icon>
                      <Button  type="default" slot="append" @click="showFalModel=true">Detail</Button>
                     </Input>  
                     <Modal
                        v-model="showFalModel"
                        footer-hide   
                        >
                        <game-failed/>    
                     </Modal>
                 </FormItem>
            </Form>
        </Card>
    </div>
</template>

<style>
    #timestyle{
        text-align: center;
        margin: 1%;
        border-style:solid 1px;
        padding: 1%; 
    }
    div{
        font-size: 150%;
    }
</style>

<script>
import BigNumber from 'bignumber.js';
import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'
import GameSuccess from '../components/game-success'
import GameFailed from '../components/game-failed'
import GameWithdraw from '../components/game-withdraw'

    export default {
        data(){
            return{
                roles: '',
                success: '',
                failed:'',
                timer:null,
                showSucModel:false,
                showFalModel:false,
                showWithdrawModel:false,
            }
        },
        methods:{
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
          getPlayerInfo: function(){

              var arraySuc = new Array()
              var arrayFal = new Array()
              var arrayAll = new Array()
              
              this.$store.state.contractInstance().getGameStatus((error,result)=>{
                   if (error) {
                       this.showNotice(false,error)
                   }else{
                       this.$store.dispatch('updateCurRound',result[0].toNumber())
                       this.$store.dispatch('setGameState',result[1])
                   }
              })
              this.$store.state.contractInstance().getSuccessAndFailedIds((error,result)=>{
                   if (error) {
                       this.showNotice(false,error)
                   }else{
                       result[0].forEach(element =>{
                           arraySuc.push(BigNumber(element).toNumber())
                       })
                       result[1].forEach(element =>{
                           arrayFal.push(BigNumber(element).toNumber())
                       })     
                   }
               })　
              this.$store.state.contractInstance().getPlayerIds(this.address,(error,result)=>{
                 if (error) {
                     this.showNotice(false,error)
                 }else{
                     this.roles = ''
                     this.success = ''
                     this.failed = ''

                     result.forEach(element => {

                         this.roles = this.roles + ' ' + BigNumber(element).toString()

                         arrayAll.push(BigNumber(element).toNumber())

                         arraySuc.forEach(es =>{
                             if (BigNumber(element).toNumber() == es){
                                 this.success = this.success + ' ' + BigNumber(element).toString()
                                 this.$store.dispatch('updateSuccessData',arraySuc)
                             }
                         })
                         arrayFal.forEach(ef =>{
                             if (BigNumber(element).toNumber() == ef){
                                 this.failed = this.failed + ' ' + BigNumber(element).toString()
                                 this.$store.dispatch('updateFailedData',arrayFal)
                             }
                         })
                     });

                    this.$store.dispatch('updateTotalData',arrayAll)
                  
                 }
               })
               
               
          }
        },
        computed: mapState({
            curRound: state => state.curRound,
            address: state => state.web3.coinbase,
            language: state => state.language
        }),
        mounted(){

             this.timer = setInterval( () => {
 　　　　　　    this.getPlayerInfo()
 　　　　　　  }, 5000)
        },
        destroyed(){
            clearInterval(this.timer)
        },
         components: {
            'game-success':GameSuccess,
            'game-failed':GameFailed,
            'game-withdraw':GameWithdraw
         }
    
    }
</script>