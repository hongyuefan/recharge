<template>
    <div id="show-price">
         <Card>
                <label style="font-family:font-size:120%;color:#464c5b">
                    <h2> 以太坊当前价格：{{ethPrice}} 美元 </h2>
                </label>
        </Card>
    </div>
</template>

<style>
    #show-price{
        text-align: center;
        margin: 3%;
        margin-top: 5%;
        border-style:solid 1px;
        padding: 1%; 
        background-color: rgb(222, 225, 228);
    }
</style>

<script>

import {mapState} from 'vuex'

export default {
        data () {
            return {
                 ethPrice:200,
                 timer:null
            }
        },
        computed: mapState({
            language:state => state.language
        }),
        methods:{
            getCurPrice: function(){
             this.$http.get("https://api.coinmarketcap.com/v1/ticker/ethereum/").then((res)=>{
               this.ethPrice = res.data[0].price_usd
            })
          }
        },
        mounted() {
           this.timer = setInterval( () => {
　　　　　　   this.getCurPrice()
　　　　　　  }, 3000)
        },
        destroyed(){
            clearInterval(this.timer)
        }

}
</script>