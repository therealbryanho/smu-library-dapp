import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import Web3 from 'web3'
import { LIBRARY_ABI, LIBRARY_ADDRESS } from '../config'

class AddBookForm extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          title: '', 
          copies: 0,
          walletaccount: 0
        };
    }
    mySubmitHandler = (event) => {
      event.preventDefault();
      alert("You are submitting " + this.state.title + " with " +this.state.copies+ " copies.");
      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      const library = new web3.eth.Contract(LIBRARY_ABI, LIBRARY_ADDRESS)
        this.setState({ library })
        let walletaccount = document.getElementById('connectedwallet').value
        library.methods.addbook(this.state.copies, this.state.title).send({from: walletaccount, value:100000000000000000}, function(error, transactionHash){ 
            alert('Book Added by '+walletaccount+'. Transaction Hash : '+transactionHash); 
            //this.setState({ result })
        });
        /*
        library.methods.addbook(this.state.copies, this.state.title).call().then(function(result){ 
            alert('Book Added : '+result); 
        });
        */
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});    
    }
    render() {
      return (
        <form onSubmit={this.mySubmitHandler}>
            <input
          type='hidden'
          name='walletaccount'
          id='walletaccount'
          onChange={this.myChangeHandler}
          value={this.props.account}
        />
        <p>Title:</p>
        <input
          type='text'
          name='title'
          onChange={this.myChangeHandler}
        />
        <p>Number of Copies:</p>
        <input
          type='text'
          name='copies'
          onChange={this.myChangeHandler}
        />
        <br/>
        <input
          type='submit'
        />
        </form>
      );
    }
  }
  
  export default AddBookForm;
