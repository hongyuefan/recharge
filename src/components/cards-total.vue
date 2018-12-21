<template>
  <div id="cardtotal">
   <Row type="flex" justify="center">

       <Col span="4" id="ColStype">
        <Card >
        <div style="text-align:center">
            <img style="max-width:100%;overflow:hidden;" src="../images/scissors-show.png" >
            <h2>{{janNum}}</h2>
        </div>
        </Card>
       </Col>

        <Col span="4" id="ColStype">
        <Card >
        <div style="text-align:center">
            <img style="max-width:100%;overflow:hidden;" src="../images/rock-show.png" >
            <h2>{{kenNum}}</h2>
        </div>
        </Card>
        </Col>

         <Col span="4" id="ColStype">
        <Card >
        <div style="text-align:center">
            <img style="max-width:100%;overflow:hidden;" src="../images/paper-show.png" >
            <h2>{{poNum}} </h2>
        </div>
        </Card>
        </Col>

   </Row>
   </div>
</template>

<style>
    #cardtotal{
        margin: 1%;
        border-style: solid;
        border-width: 1px;
        padding: 0%;
        border-color: rgb(245, 241, 241);
    }
    #ColStype{
        margin: 1%;
    }
</style>


<script>
import {BigNumber} from 'bignumber.js'

 export default {

         data(){
            return{
            janNum:'0',
            kenNum:'0',
            poNum:'0',
            timer:null
            }
        },
        methods:{
            getTotalCardCount: function(){
                this.$store.state.contractInstance().getJKPCount((error,result)=>{
                 this.janNum = BigNumber(result[0]).toString(10)
                 this.kenNum = BigNumber(result[1]).toString(10)
                 this.poNum =  BigNumber(result[2]).toString(10)
               })　
            }
        },
        mounted() {
             this.timer = setInterval(() => {
　　　　　　    this.getTotalCardCount()
　　　　　　  }, 3000)
        },
        destroyed(){
            clearInterval(this.timer)
        }
        
    }
</script>