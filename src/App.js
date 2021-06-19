import React, { Component } from 'react'
import AddBookForm from './components/form'
import TitlesTable from './components/titles'
import Web3 from 'web3'
import { LIBRARY_ABI, LIBRARY_ADDRESS } from './config'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.JPG';

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  /*
  componentDidMount(){
    this.timerID = setInterval(()=> loadTitles(),3000)
  }
  */

  async loadBlockchainData() {
    //const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545") //
    //change port number to your ganache port number
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    document.getElementById('connectedwallet').value = accounts[0];

    var accountnumber;
    // Modern DApp Browsers
    if (window.ethereum) {
      try {
        window.ethereum.enable().then(function () {
          const ethereum = window.ethereum
          //const [addr, setAddr] = this.setState(0)
          //if(ethereum){
          window.ethereum.on('accountsChanged', function (accounts) {
            accountnumber = ethereum.selectedAddress
            //this.setState({ account: accountnumber })
            document.getElementById('connectedwallet').value = accountnumber;
            document.getElementById('walletaccount').value = accountnumber;
          })
          //}
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert('You have to install MetaMask !');
    }

    //async function getContractPublicVariable() {
    /*
    const library = new web3.eth.Contract(LIBRARY_ABI, LIBRARY_ADDRESS)
    await library.methods.addbook(3, 'Book 2').send({from: accounts[0], value:100000000000000000}, function(error, transactionHash){ 
      alert('Transaction Hash : '+transactionHash); 
    });
    */
    //const numDrive1 = await library.methods.numDrive.call().call();
    //alert('numDrive : '+numDrive1); 
    //this.setState({ library })
    //const titles =  await library.methods.titles('string').call().call();
    //this.setState({ titles: titles }) 
    //alert(titles)
    //}
    //getContractPublicVariable();

    /*
    numDices = await thisdice.methods.addDrive().call().then(function(result){ 
      //console.log('numDices : '+result); 
      //alert('numDices : '+result); 
      //this.setState({ result })
    });
*/
    /*
    for (var i = 1; i <= taskCount; i++) {
      const task = await dice.methods.tasks(i).call()
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }
    */
  }


  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }
  }

  render() {
    return (
      <div className="container">
        <img src={logo} className="photo" />
        <div className="mb-3 font-weight-bold ">Connected Account: <input id='connectedwallet' readOnly className='inputfield' /></div>
        <AddBookForm />
        <TitlesTable />
      </div >
    );
  }
}

export default App;