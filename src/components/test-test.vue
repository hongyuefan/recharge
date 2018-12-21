<template>
<div>
    
    <Button style="primary" :loading="btnLoading1" @click="onBtnBuy">BTN</Button>

    <Modal
      v-model="showModule"
      footer-hide   
    > 
    <Button style="primary" :loading="btnLoading2" @click="onClick">BTN</Button>
    </Modal>

</div>
</template>

<style>
    div{
        font-size: 15px;
    }
</style>


<script>

    export default {
        data () {
            return {
                btnLoading1:false,
                btnLoading2:false,
                showModule:false,
            }
        },
        methods:{
          onBtnBuy: function(){
             this.btnLoading1 = true
             this.showModule = true
          },
          onClick: function(){
              this.btnLoading2 = true    
          }
            
        },
    }
</script>