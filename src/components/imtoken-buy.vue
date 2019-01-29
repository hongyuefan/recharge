<template>
    <div id="meta">
        <Card v-if="showToken">
               
                <div style="text-align:center;padding: 4%;">
                    <p slot="title" >
                         <h3>打开手机钱包扫描二维码转账，并填写相应信息到表单中！</h3>
                    </p>
                     <Divider/>
                     <img style="max-width:100%;overflow:hidden;" src="../images/address.png">
                     <p slot="title" >
                         <h3>0xFe8E9198CEb395Bd748Aaff3b6f8d8015E34dC01</h3>
                    </p>
                    <Divider/>
                     <Form   :label-width="80">
                        <FormItem label="登录用户" prop="name">
                            <Input v-model="username" size="large" readonly="readonly">
                            <Icon type="ios-person" slot="append"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem label="充值地址" prop="name">
                            <Input v-model="address" size="large" >
                            <Icon type="ios-card" slot="append"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem label="充值金额" prop="name">
                            <Input v-model="amount" size="large" >
                            <span slot="append">&nbsp;eth</span>
                            </Input>
                        </FormItem>
                     </Form>
                     <Poptip trigger="hover" content=" 请确保充值地址与你的钱包地址一致、金额与实际信息相符！ " placement="right"><Button  type="primary"  long @click="onRecharge" :loading="btnLoading">确定</Button></Poptip>
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
                amount:"0",
                address:"",
                append:0,
                showMessage:false,
                showToken:true,
                btnLoading:false,
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
        onRecharge:function()
        {
            this.btnLoading = true;

            var url = "/api/v1/recharge/add/record"

            this.$axios({
                    method:"post",
                    url:url,
                    data:{
                        type:2,
                        username:this.username,
                        userid:parseInt(this.userid),
                        amount:this.amount,
                        hash:"",
                        address:this.address,
                        time:parseInt(new Date().getTime()/1000)
                    }
                    }).then(
                    (res)=>{
                        if (res.data.isSuccess == true) {
                             this.showNotice(true,"提交信息成功");
                             this.btnLoading = false;
                             this.showToken =false;
                             this.showMessage =true;
                             this.showMessage = true;
                             this.showToken = false;
                        }else{
                            this.showNotice(false,res.message);
                            this.btnLoading = false;
                        }
                     }
                    )
        }
    },
    mounted() {
           this.GetQueryString("username");
           this.GetQueryId("userid");
    },
    components: {
            "show-message":Message,
    }
}
</script>
