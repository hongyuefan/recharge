import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import getContract from '../util/getContract'


Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    updateTotalCoin(state,payload){
      state.team.totalCoin = payload
    },
    updateCurRound(state,payload){
      state.curRound = payload
    },
    updateSuccessData (state,payload) {
      state.successData = payload
    },
    updateFailedData (state,payload) {
      state.failedData = payload
    },
    updateTotalData (state,payload) {
      state.totalData = payload
    },
    setLanguage(state, payload) {
      state.language = payload
    },
    setGameState(state, payload) {
      state.gameState = payload
    },
    registerWeb3Instance (state, payload) {
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
      pollWeb3()
    },
    pollWeb3Instance (state, payload) {
      
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
    },
    registerContractInstance (state, payload) {  
      state.contractInstance = () => payload   
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      
      getWeb3.then(result => {     
        commit('registerWeb3Instance', result)
      }).catch(e => {
        
      })
    },
    pollWeb3 ({commit}, payload) {
      commit('pollWeb3Instance', payload)
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
        commit('registerContractInstance', result)
      }).catch(e => console.log(e))
    },
    updateCurRound({commit},payload){
        commit('updateCurRound',payload)
    },
    updateSuccessData ({commit},payload) {
        commit('updateSuccessData', payload)
    },
    updateFailedData ({commit},payload) {
        commit('updateFailedData', payload)
    },
    updateTotalData ({commit},payload) {
        commit('updateTotalData', payload)
    },
    setLanguage({commit},payload){
        commit('setLanguage',payload)
    },
    setGameState({commit},payload){
        commit('setGameState',payload)
    },
    updateTotalCoin({commit},payload){
        commit('updateTotalCoin',payload)
    }
  }
})
