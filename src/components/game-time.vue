<template>
    <div  id="timestyle">
        <Card>
        <label v-if="gameState == true" style="font-family:font-size:120%;color:#464c5b">
            <h1>{{hour}}:{{min}}:{{sec}}</h1>
        </label>
        <label v-if="gameState == false" style="font-family:font-size:120%;color:#464c5b">
            <h1 v-if="language == 1">请安装 MetaMask 钱包,详情查看“帮助”</h1>
            <h1 v-if="language == 2">Please install MetaMask wallet，please read help</h1>
        </label>
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
</style>

<script>
import {BigNumber} from 'bignumber.js'
import {mapState} from 'vuex'

    export default {
        data(){
            return{
                hour :'00',
                min:'00',
                sec:'00',
                gameState:false,
                timer:null
            }
        },
        mounted(){
            this.timer = setInterval( () => {
　　　　　　    this.$store.state.contractInstance().getEndTime((error,result)=>{
                 var restSecend = BigNumber(result).toNumber() - parseInt(new Date().getTime()/1000)
                 var hour = parseInt(restSecend/3600)
                 if(hour < 10){
                     this.hour = '0' + hour
                 }else{
                     this.hour = hour
                 }
                 var min = parseInt((restSecend-hour*3600)/60)
                 if (min < 10){
                     this.min = '0' + min
                 }else{
                     this.min = min
                 }
                 var sec = parseInt(restSecend- hour*3600- min*60)
                 if (sec < 10){
                     this.sec = '0' + sec
                 }else{
                     this.sec = sec
                 }

                 if (sec < -3 || min < 0 || hour <0) {
                     this.gameState = false
                 }else {
                     this.gameState = true
                 }

               })　
　　　　　　  }, 1000)
        },
        computed: mapState({
            language: state => state.language
        }),
        destroyed(){
            clearInterval(this.timer)
        }
    }
</script>