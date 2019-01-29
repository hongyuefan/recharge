<template>
    <div id="meta">
        <Card v-if="showMeta">
               
                <div style="text-align:center;padding: 4%;">
                    <p slot="title" >
                         <h3>使用MetaMask钱包充值，请确认充值表单并核对信息！</h3>
                    </p>
                     <Divider/>
                     <Form   :label-width="80">
                        <FormItem label="登录用户" prop="name">
                            <Input v-model="username" size="large" readonly="readonly">
                            <Icon type="ios-person" slot="append"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem label="充值地址" prop="name">
                            <Input v-model="address" size="large" readonly="readonly">
                            <Icon type="ios-card" slot="append"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem label="充值金额" prop="name">
                            <Input v-model="amount" size="large" >
                            <span slot="append">&nbsp;eth</span>
                            </Input>
                        </FormItem>
                     </Form>
                     <Poptip trigger="hover" content=" 充值成功后请返回个人页面查看金额" placement="right"><Button  type="primary"  long @click="onRecharge" :loading="btnLoading">{{strBtn}}</Button></Poptip>
                </div>

        </Card>

        <show-message v-if="showMessage"></show-message>
    </div>
</template>

<style>
    #meta{
        text-align: center;
        margin: 5%;
        border-style:solid 1px;
    }
</style>

<script>

import Message from '../components/show-message'

export default {
    data () {
            return {
                username:"",
                userid:0,
                address:"",
                amount:0,
                append:0,
                timer:null,
                btnLoading:false,
                strBtn:"充值",
                showMessage:false,
                showMeta:true,
                hash:"",
            }
        },
    methods:{
        getRand:function(){
            this.append =Math.round(Math.random()*100) ;
        },
        GetQueryString:function(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null){
                 this.username = unescape(r[2]); 
            } 
        },
        GetQueryId:function(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null){
                 this.userid = unescape(r[2]); 
            }
        },
        showNotice: function(ok,dsc){
            if (ok){
                this.$Notice.success({
                    title: this.language==1?'成功':'Success',
                    desc: dsc,
                    duration:10
                });
            }else{
                this.$Notice.error({
                    title: this.language==1?'失败':'Error',
                    desc: dsc,
                    duration:10
                });
            }
        },
        onRecharge:function(){
             this.btnLoading = true;
             this.$store.state.web3.web3Instance().eth.sendTransaction({
                value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
                from: this.$store.state.web3.coinbase,
                to: this.$store.state.masterAddress,
             },(err,res) => {
                 if (err) {
                     this.showNotice(false,err);
                     this.btnLoading = false;
                     this.strBtn = "继续充值";
                     return;
                 }else{

                    this.hash = res;

                    var url = "/api/v1/recharge/add/record"
                    this.$axios({
                    method:"post",
                    url:url,
                    data:{
                        type:1,
                        username:this.username,
                        userid:parseInt(this.userid),
                        amount:this.amount.toString()   ,
                        hash:this.hash,
                        address:this.$store.state.web3.coinbase,
                        time:parseInt(new Date().getTime()/1000)
                    }
                    }).then(
                    (res)=>{
                        if (res.data.isSuccess == true) {
                             this.showNotice(true,"充值成功,交易哈希:"+this.hash);
                             this.btnLoading = false;
                             this.strBtn = "继续充值";
                             this.showMeta =false;
                             this.showMessage =true;
                        }else{
                            this.showNotice(false,res.message);
                            this.btnLoading = false;
                            this.strBtn = "继续充值";
                        }
                     }
                    )

                    
                     return;
                 }
             });
        }

     },
    mounted(){

        this.GetQueryString("username");

        this.GetQueryId("userid");

        this.timer = setInterval( () => {
 　　　　　　    this.address = this.$store.state.web3.coinbase;
 　　　　　　  }, 3000)
    },
    destroyed(){
            clearInterval(this.timer)
    },
    components: {
            "show-message":Message,
    }
}
</script>
