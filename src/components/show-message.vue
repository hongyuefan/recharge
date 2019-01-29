<template>
    <div id="meta">
        <Card >
               
                <div style="text-align:center;padding: 4%;">
                    <p slot="title" >
                         <h1>充值交易提交成功，请查看个人钱包确认充值结果！</h1>
                    </p>
                     <Divider/>
                    <Row>
                        <Col span="4" offset="7">
                            <Button  type="primary"  long @click="onRecharge" >继续充值</Button>
                        </Col>
                        <Col span="4" offset="2">
                            <Button  type="primary"  long @click="onReturn" >返回首页({{times}})</Button>
                        </Col>
                    </Row>
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
                timer:null,
                btnLoading:false,
                times:10
            }
        },
    methods:{
        onRecharge:function(){ 
            window.location.href= window.location;
        },
        onReturn:function(){
            window.location.href="http://janponwar.xyz/"; 
        }

     },
    mounted(){

        this.timer = setInterval( () => {
 　　　　　　    this.times = this.times -1;
                if (this.times == 0) {
                    clearInterval(this.timer)
                    window.location.href="http://janponwar.xyz/";
                }
 　　　　　　  }, 1000)
    },
    destroyed(){
            clearInterval(this.timer)
    }
}
</script>
