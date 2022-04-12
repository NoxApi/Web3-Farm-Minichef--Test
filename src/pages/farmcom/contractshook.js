import { ethers } from 'ethers';
import '../../App.css';
import abi from './../../components/utils/MiniChefV2.json'
import abi2 from './../../components/utils/LoongTuu.json'
import abi3 from './../../components/utils/EvermoonToken.json'
import { useContext,useState,useEffect } from 'react'
import { MainContext } from '../../App';


const Contractshook = () => {
  //contract address
  const contractAddress = "0x01b6AABf4c744a2c1718067BEa1bcaB1312ed42B";
  const pooladdr = "0x9DF4E70D7eABA4A6348d9c971db083EAa17Cb201"
  const evmaddr= "0xf91375fbf40d920c31016E1473c6D44F334Af13F"
  //all abi
  const TokenABI = abi2.abi;
  const evmABI = abi3.abi;
  const minichefABI = abi.abi;
  const { ethereum } = window;
  
  var provider = "";
  var signer = "";
  //all contracts 
  var token = "";
  var evm = "";
  var farm = "";

  if (ethereum){
    var provider = new ethers.providers.Web3Provider(ethereum);
    var signer = provider.getSigner();
    var token = new ethers.Contract(pooladdr,TokenABI,signer);
    var evm = new ethers.Contract(evmaddr,evmABI,signer);
    var farm = new ethers.Contract(contractAddress, minichefABI, signer);
    }
// =======
//   let provider = "";
//   let signer = "";
//   let token  = "";
//   let evm = "";
//   let farm = "";
//   if (ethereum) {
//     provider = new ethers.providers.Web3Provider(ethereum);
//         signer = provider.getSigner();
//         //all contracts 
//         token = new ethers.Contract(pooladdr,TokenABI,signer);
//         evm = new ethers.Contract(evmaddr,evmABI,signer);
//         farm = new ethers.Contract(contractAddress, minichefABI, signer);
//   }


// >>>>>>> main
  //all context
  const {setIsMining,setIsFail,setIsSuccess,lp, setLp,amount,setAmount,currentAccount,setCurrentAccount,setEvma,setIsapprove,rerender,setRerender,evmearn,setEvmearn,evmstaked,setEvmstaked,setIsOpen,setIsOpen2,setBluramount} = useContext(MainContext)
  
  //close/Open modal 
  function closeModal() {
    setIsOpen(false)
    setBluramount("blur(0px)")
  }
  function closeModal2() {
    setIsOpen2(false)
    setBluramount("blur(0px)")
  }
  function Success() {
    setIsSuccess(true)
    setBluramount("blur(4px)")
  }
  function Fail() {
    setIsFail(true)
    setBluramount("blur(4px)")
  }
// <<<<<<< Fuck-Up
  function setup(){
    if (ethereum){
      var provider = new ethers.providers.Web3Provider(ethereum);
      var signer = provider.getSigner();
      var token = new ethers.Contract(pooladdr,TokenABI,signer);
      var evm = new ethers.Contract(evmaddr,evmABI,signer);
      var farm = new ethers.Contract(contractAddress, minichefABI, signer);
      }
// =======

//   function setup() {
//         //provider & signer
//         provider = new ethers.providers.Web3Provider(ethereum);
//         signer = provider.getSigner();
//         //all contracts 
//         token = new ethers.Contract(pooladdr,TokenABI,signer);
//         evm = new ethers.Contract(evmaddr,evmABI,signer);
//         farm = new ethers.Contract(contractAddress, minichefABI, signer);
//         console.log("setup done")
//         setRerender(rerender+1);

// >>>>>>> main
  }
  //geting info (ex.currency)
  const getevm = async () => {
    if (currentAccount.length !== 0) {
      try{
      const getevm = await evm.balanceOf(currentAccount)
      const formatedevm =ethers.utils.formatUnits(getevm)
      console.log(formatedevm)
      setEvma(formatedevm)
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  
  const getlp = async () => {
    if (currentAccount.length !== 0) {
      try{
        console.log(ethers.utils.formatUnits(await token.balanceOf(currentAccount)))
        setLp(ethers.utils.formatUnits(await token.balanceOf(currentAccount)))
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  const getstakedevm = async () => {
    if (currentAccount.length !== 0) {
      try{
        const x = await farm.userInfo(0,currentAccount);
        const y = await farm.pendingEvermoon(0,currentAccount)
        if (x[0]!=evmstaked){
        setEvmstaked(ethers.utils.formatUnits(x[0]))
        setIsapprove(2)
        }
        if (y!=evmearn){
        setEvmearn(ethers.utils.formatUnits(y))
        }
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  //contract's methord
  const appro = async () => {
    try{
    const tx = await token.approve(currentAccount,ethers.utils.parseUnits("500000000"+amount, 18))
    console.log(tx.hash)
    setIsMining("flex")
    const waitfortx = await provider.waitForTransaction(tx.hash)
    setIsMining("none")
    const tx2= await token.approve(contractAddress,ethers.utils.parseUnits("500000000"+amount, 18))
    setIsMining("flex")
    const waitfortx2 = await provider.waitForTransaction(tx2.hash)
    setIsMining("none")
    setIsapprove(1)
    setRerender(rerender+1)
    }
    catch (error) {
      console.log(error)
      Fail()
    }
  }
  const approveEVM = async () => {
    try{
    const tx = await evm.approve(currentAccount,ethers.utils.parseUnits("500000000", 18))
    console.log(tx.hash)
    setIsMining("flex")
    const waitfortx = await provider.waitForTransaction(tx.hash)
    setIsMining("none")
    const tx2 = await evm.approve("0xF0Ce8B8158bA00F923C29eE4e1290d3E5d4D61fA",ethers.utils.parseUnits("500000000", 18))
    console.log(tx2.hash)
    setIsMining("flex")
    const waitfortx2 = await provider.waitForTransaction(tx2.hash)
    setIsMining("none")
    setRerender(rerender+1)
    }
    catch (error) {
      console.log(error)
      Fail()
    }
  }
  const harvest = async () => {
    try{
      const farm = new ethers.Contract(contractAddress, minichefABI, signer);
      if (ethereum) {
        const tx = await farm.harvest(0,currentAccount)
        setIsMining("flex")
        const waitfortx = await provider.waitForTransaction(tx.hash)
        setRerender(rerender+1)
        setIsMining("none")
        Success()
        }
    }
    catch (error) {
      console.log(error)
      Fail()
    }
  }
  const withdraw = async () => {
    try{
      if (ethereum) {
        const tx = await farm.withdraw(0,ethers.utils.parseUnits(""+amount, 18),currentAccount)
        closeModal2()
        setIsMining("flex")
        await provider.waitForTransaction(tx.hash)
        setRerender(rerender+1)
        setIsMining("none")
        Success()
        }
    }
    catch (error) {
      closeModal2()
      console.log(error)
      Fail()
    }
  }
  const deposit = async () => {
    try{
      if (ethereum) {
        console.log(ethers.utils.parseUnits(""+amount, 18))
        const tx = await farm.deposit(0,ethers.utils.parseUnits(""+amount, 18),currentAccount)
        closeModal()
        setIsMining("flex")
        await provider.waitForTransaction(tx.hash)
        setRerender(rerender+1)
        setIsMining("none")
        Success()
        }
    }
    catch (error) {
      closeModal()
      console.log(error)
      Fail()
    }
  }
  //wallet related
  const check = async () => {
    if (currentAccount.length == 0) {
      try{
        const { ethereum } = window;
        if (ethereum) {
          console.log("etherum present")
          }
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  
  const checkIfWalletIsConnected = async () => {
    try {
      if (currentAccount.length == 0) {
        if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
        } else {
          console.log("We have the ethereum object", ethereum);
        }
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setup();
          setCurrentAccount(account);
          setRerender(rerender+1);
        } else {
          console.log("No authorized account found")
          setCurrentAccount("")
        }
      } 
    }
    catch (error) {
      console.log(error);
    }
  }    

  

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }
  const disconnectWallet = async () => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        console.log("disconnected")
        return;
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setup();
    check();
    checkIfWalletIsConnected();
    getlp();
    getevm();
    getstakedevm();
    console.log("loop done")
  }, [rerender,currentAccount])
    return {connectWallet ,harvest ,currentAccount,setAmount,appro,lp,amount,deposit,evmstaked,evmearn,withdraw,disconnectWallet,approveEVM}
  };
  
  export default Contractshook;