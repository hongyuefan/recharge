<template>
<div  id="timestyle">
   <Row type="flex" justify="center">
   <Col span="24">
    <Card>
    <Form >
        <FormItem >
            <Select v-model="curSelect" v-if="language==1" style="width:200px" placeholder = "请选择"  @on-change="onChange">
                <Option v-for="item in falItems" :value="item" :key="item">{{item}}</Option>
            </Select>
            <Select v-model="curSelect" v-if="language==2" style="width:200px" placeholder = "please chose"  @on-change="onChange">
                <Option v-for="item in falItems" :value="item" :key="item">{{item}}</Option>
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
            <Input type="text" v-if="language == 1" size="large" v-model="amount"  readonly="readonly">
                <label value="amount"  slot="prepend">筹码</label>
                <Poptip trigger="hover" content="当前钥匙购买的筹码数量" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
            <Input type="text" v-if="language == 2" size="large" v-model="amount"  readonly="readonly">
                <label value="amount"  slot="prepend">AMOUNT</label>
                <Poptip trigger="hover" content="this key buys amount" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
        </FormItem>     
        <FormItem >
            <Input type="text" v-model="star"  readonly="readonly">
                <label value="STAR" v-if="language == 1" slot="prepend">奖章</label>
                <label value="STAR" v-if="language == 2" slot="prepend">STAR</label>
                <Poptip trigger="hover" v-if="language == 1" content="当前钥匙拥有的star数量,如果数目小于5则失败" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
                <Poptip trigger="hover" v-if="language == 2" content="this key has stars number,if less than 5,you lost" slot="append"><Icon type="ios-information-circle"></Icon></Poptip>
            </Input>
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
     @font-face{
		font-family: katong;     
		src:url('../theme/katong.ttf');  
    }

    div{
        font-family: katong;
        font-size: 100%;
    }
    
</style>

<script>
import {mapState} from 'vuex'
export default {
   
    data(){
        return{
            curSelect: null,
            star:0,
            amount:0,
            card: new Array(),

            imgJan:"",
            imgKen:"",
            imgPon:"",
        }
    },
    computed: mapState({
            falItems:state => state.failedData,
            language:state => state.language,
    }),
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

      getFailedDetail: function(id){
         this.$store.state.contractInstance().getFailedDetail(id,(error,result)=>{
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
                       this.amount = result[3].toNumber()
                   }
         })
      },

      onChange:function(){
          this.getFailedDetail(this.curSelect)
      }

    }
}
</script>
