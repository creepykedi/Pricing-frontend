import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class CreatePaymentForm extends Component {
  
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      message: "",
      inquiryForm: {
        id: Number,
        inquiry_id: Number,
        nmc_id: Number,
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({name: e.target.value},
    this.sendFormData)
  }

sendFormData() {

  const formData = JSON.stringify({
      id: this.refs.id.value,
      inquiry_id: this.refs.inquiry_id.value,
      nmc_id: this.refs.nmc_id.value
      });
 

     fetch('http://127.0.0.1:8000/payment/create/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      }).then((response) => {
        if (response.status===201){
          this.setState({message: "Успешно создано!"})
          console.log(response)
        } else if(response.status===400){
          this.setState({message: "Некорректные данные!"})
        }
      });
}

  render() {

    return (
      <div className="home-create-inquiry-form">
       <div className="my-3">
        <h3>Заполнить расчет</h3>
        {this.state.message}
        <form onSubmit={this.handleSubmit}>

          <p> <label for="inquiry_id">Номер запроса</label>
          <input id="inquiry_id" type="number" ref="inquiry_id"/></p>
    
         
          <p> <label for="nmc_id">НМЦ</label>
          <input id="nmc_id" type="number" ref="nmc_id"/></p>
        
          <p> <label for="payment_id">Номер расчета</label>
          <input id="payment_id" type="number" ref="id" /></p>
          
          <p><input type="submit" /></p>
        </form>
      </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePaymentForm);
