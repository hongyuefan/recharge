<template>
    <div id="meta">
        <Card >
               
                <div style="text-align:center;padding: 4%;">
                    <p slot="title" >
                         <h3>打开 Imtoken 钱包扫描二维码转账，并填写相应信息到表单中！</h3>
                    </p>
                     <Divider/>
                     <img style="max-width:100%;overflow:hidden;" src="../images/address.png">
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
                     <Poptip trigger="hover" content=" 请确保充值地址、金额与实际信息相符！ " placement="right"><Button  type="primary"  long @click="onBuy" :loading="btnLoading">确定</Button></Poptip>
                </div>

        </Card>
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
export default {
    data () {
            return {
                username:"",
                amount:0,
                append:0
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
    },
    mounted() {
           this.GetQueryString("username");
    }
}
</script>
