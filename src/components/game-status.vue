 <template>
    <div  id="timestyle">
        <Row type="flex" justify="center">
        <Col span="24">
        <Card v-if="language == 1"> 
            <Form  :label-width="100">
                 <FormItem label="轮次" prop="round">
                     <Input v-model="round" size="large" readonly="readonly">
                     <Icon type="md-aperture" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="以太币总量" prop="name">
                     <Input v-model="ether" size="large" readonly="readonly">
                     <Icon type="ios-compass" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="游戏钥匙数" prop="name">
                     <Input v-model="roles" size="large" readonly="readonly">
                     <Icon type="ios-key"  slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="胜利钥匙数" prop="name">
                     <Input v-model="success" size="large" readonly="readonly">
                     <Icon type="md-happy" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="最新的钥匙" prop="name">
                     <Input v-model="lastBuyer" size="large" readonly="readonly">
                     <Icon type="md-happy" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="最后胜利者" prop="name">
                     <Input v-model="lastWiner" size="large" readonly="readonly">
                     <Icon type="ios-ionitron" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
               
                
            </Form>
        </Card>
        <Card v-if="language == 2"> 
            <Form  :label-width="100">
                 <FormItem label="round" prop="round">
                     <Input v-model="round" size="large" readonly="readonly">
                     <Icon type="md-aperture" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="total ether" prop="name">
                     <Input v-model="ether" size="large" readonly="readonly">
                     <Icon type="ios-compass" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="total keys" prop="name">
                     <Input v-model="roles" size="large" readonly="readonly">
                     <Icon type="ios-key"  slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="win keys" prop="name">
                     <Input v-model="success" size="large" readonly="readonly">
                     <Icon type="md-happy" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                  <FormItem label="last key" prop="name">
                     <Input v-model="lastBuyer" size="large" readonly="readonly">
                     <Icon type="md-happy" slot="prepend"></Icon>
                     </Input>
                 </FormItem>
                 <FormItem label="last winner" prop="name">
                     <Input v-model="lastWiner" size="large" readonly="readonly">
                     <Icon type="ios-ionitron" slot="prepend"></Icon>
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
        margin: 1%;
        border-style:solid 1px;
        padding: 1%; 
    }
</style>

<script>

import BigNumber from 'bignumber.js';
import {mapState} from 'vuex';

    export default {
        data(){
            return{
                round: 1,
                ether:0,
                roles:'0',
                success:'0',
                failed:'0',
                timer:null,
                lastBuyer:null,
                lastWiner:null,
            }
        },
        computed: mapState({
            language: state => state.language
        }),
        mounted() {
             this.timer = setInterval( () => {
　　　　　　    this.$store.state.contractInstance().getGameInfo((error,result)=>{
                  this.round = BigNumber(result[0]).toNumber()
                  this.roles = BigNumber(result[1]).toString(10)
                  this.success = BigNumber(result[2]).toString(10)
                  this.failed = BigNumber(result[3]).toString(10)
                  this.ether = this.$store.state.web3.web3Instance().fromWei(BigNumber(result[4]).toNumber(),'ether')
               })
               this.$store.state.contractInstance().getLastKey(this.round,(error,result)=>{
                   this.lastBuyer = result.toNumber()
               })

               this.$store.state.contractInstance().getLastWiner(this.round,(error,result)=>{
                   this.lastWiner = result
               })
　　　　　　  }, 5000)
        },
        destroyed(){
            clearInterval(this.timer)
        }
    }
</script>