let state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  team:{
    totalCoin:0,
    rateCom:10,
    rateWin:5,
    rateLast:10,
    rateBen:25,
    rateShare:30,
    rateNext:20
  },
  contractInstance: null,
  language: 1,
  masterAddress:"0x1A75532e3bb9Bf2E983EE3922d9269565D463B75"

}
export default state
