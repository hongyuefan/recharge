<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: rgb(255, 255, 255);
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .pagination { 
    text-align: center; 
    font-size: 0;
    letter-spacing: -4px; 
    word-spacing: -4px; 
    }
     @font-face{
		font-family: katong;     
		src:url('../theme/katong.ttf');  
    }

    div{
        font-family: katong;  
        font-size:13px; 
    }


</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" @on-select="onClick" active-name="1">
            <Row>
                <Col span="4" offset="6">
                     <div class="layout-nav">
                        <MenuItem v-if="language==1" name="metamask">
                            MetaMask钱包
                            <Icon type="ios-cash"></Icon>
                        </MenuItem>
                        <MenuItem v-if="language==2" name="metamask">
                            MetaMask&nbsp;Wallet
                            <Icon type="ios-cash"></Icon>
                        </MenuItem>
                    </div>
                </Col>

                <Col span="8" >
                     <div class="layout-nav">
                        <MenuItem v-if="language==1" name="imtoken">
                            ImToken钱包
                            <Icon type="md-cash"></Icon>
                        </MenuItem>
                        <MenuItem v-if="language==2" name="imtoken">
                            ImToken&nbsp;Wallet
                            <Icon type="md-cash"></Icon>
                        </MenuItem>
                    </div>
                </Col>

            <Col span="4" >
            <div class="layout-nav">
                <MenuItem v-if="language==1" name="contract">
                     合约源码
                     <Icon type="ios-navigate"></Icon>
                </MenuItem>
                <MenuItem v-if="language==2" name="contract">
                     Contract Source
                     <Icon type="ios-navigate"></Icon>
                </MenuItem>
               
                <MenuItem v-if="language==1" name="help">                
                     帮助
                     
                    <Poptip  trigger="hover" content="充值帮助在这里！">
                        <Icon type="md-help"></Icon>
                    </Poptip>
                </MenuItem>
               
                <MenuItem v-if="language==2" name="help">    
                     Help
                     <Icon type="md-help"></Icon>
                </MenuItem>
                
            </div>
            </Col>
            <Col span="2" >
            <div style="margin:0 10px 0 0;">
                <Select v-model="curSelect" size="small" @on-change="onChange">
                        <Option value="中文">中文</Option>
                        <Option value="English">English</Option>
                </Select> 
            </div>
            </Col>
            </Row>
        </Menu> 
        
         <Modal v-model="helpShow" v-if="language==1" fullscreen footer-hide title="帮助中心">
                <game-help/>
         </Modal>
         <Modal v-model="helpShow" v-if="language==2" fullscreen footer-hide title="Help">
                <game-help/>
         </Modal>

        <div class="layout-content" style="min-height: 800px;">
            <Row>
                <Col span="8" offset="8">
                    <show-price/>
                </Col>
             </Row>
             <Row>
                <Col span="18" offset="3">
                    <meta-buy v-if="showMetamask == true"/>
                    <imtoken-buy v-if="showImtoken == true"/>
                </Col>
             </Row>
        </div>

        <div class="layout-copy">
            
        </div>
    </div>
</template>
<script>


import PrinceShow from '../components/show-price'
import GameHelp from '../components/game-help'
import MetaBuy from '../components/meta-buy'
import ImtokenBuy from '../components/imtoken-buy'
import {mapState} from 'vuex'

export default {
        data(){
            return{
                curSelect:"中文",
                language:1,
                helpShow:false,
                ethPrice:0,
                showMetamask:true,
                showImtoken:false,
            }
        },
        beforeCreate () {
            this.$store.dispatch('registerWeb3')
            this.$store.dispatch('getContractInstance')
        },

        methods:{
            onChange(){
                this.getLanguage()
                this.$store.dispatch('setLanguage',this.getLanguage())
            },
            getLanguage(){
                if (this.curSelect == "中文"){
                    this.language = 1;    
                }else{
                    this.language = 2;
                }
                return this.language
            },
            onClick(name){
                switch(name)
                {
                    case "metamask":
                        this.showMetamask = true;
                        this.showImtoken = false;
                        break;
                    case "imtoken":
                        this.showImtoken = true;
                        this.showMetamask = false;
                        break;
                    case "contract":
                        window.location.href="https://etherscan.io/address/0xd4276563d170073482f65b305559e4b73f7a089f#code";
                        break;
                    case "help":
                        this.helpShow = true;
                        break;
                }
            }
            
        },
        components: {
            'show-price': PrinceShow,
            'game-help':GameHelp,
            'meta-buy':MetaBuy,
            "imtoken-buy":ImtokenBuy
         }
    }
</script>
