import Web3 from 'web3'
import {address, ABI} from './constants/jkpContract'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let jkpContract = web3.eth.contract(ABI)
  let jkpContractInstance = jkpContract.at(address)
    resolve(jkpContractInstance)
})

export default getContract
