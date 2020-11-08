import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class CreateInquiryForm extends Component {

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
        name: 'имя',
        status: '',
        deadline: Date,
        payment_id: Number,
        resolution: '',
        contractor_id: Number,
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({name: e.target.value},
    this.sendFormData)
  }

  sendFormData() {

  const formData = {
      name: this.refs.name.value,
      status: this.refs.status.value,
      resolution: this.refs.resolution.value,
      contractor_id: this.refs.contractor_id.value,
      deadline: this.refs.deadline.value,
      payment_id: this.refs.payment_id.value};

   fetch('http://127.0.0.1:8000/inquiry/create/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

}
  render() {

    return (
      <div className="home-create-inquiry-form">
       <div className="my-3">
        <h3>Создать запрос</h3>
        {this.state.message}
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
         <p>*обязательное поле</p>
          <p> <label for="name">Название*</label>
          <input id="name" type="text" ref="name"/>
          </p>
          <p> 
          <label for="Status">Статус*</label>
          <input id="status" type="text" ref="status"/></p>
          <p> <label for="payment_id">ID расчета</label>
          <input id="payment_id" type="text" ref="payment_id" /></p>
          <p> <label for="deadline">Дедлайн</label>
          <input id="deadline" type="text" ref="deadline" /></p>
          <p> <label for="resolution">Резолюция</label>
          <input id="resolution" type="text" ref="resolution" /></p>
          <p> <label for="contractor_id">ID исполнителя*</label>
          <input id="contractor_id" type="text" ref="contractor_id" /></p>
          <p><input type="submit" /></p>
        </div>
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
)(CreateInquiryForm);
