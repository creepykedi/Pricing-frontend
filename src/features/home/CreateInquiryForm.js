import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom'
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
      payment_id: this.refs.payment_id.value,
      product: this.refs.product.value,
      amount: this.refs.amount.value,
      okei: this.refs.okei.value,
      okpd: this.refs.okpd.value
    };

   fetch('http://127.0.0.1:8000/inquiry/create/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      }).then((response) => {
        if (response.status==201){
          this.setState({message: "Успешно создано!"})
          console.log(response)
        } else if(response.status==400){
          this.setState({message: "Некорректные данные!"})
        }
      
      });

}
  render() {

    return (
      <div className="home-create-inquiry-form">
        <Link to={'/'} className="Homelink">Главная</Link> 
       <div className="my-3">
        <h3>Создать запрос</h3>
        <p className="alert">{this.state.message}</p>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
         
          <p> <label for="name">Название*</label>
          <input id="name" type="text" ref="name"/>
          </p>

          <p> 
          <label for="Status">Статус*</label>
          <select name="status" id="status" ref="status">
            <option value="Created">Создан</option>
            <option value="Recieved">Принят в работу исполнителем</option>
            <option value="Payment formed">Сформирован расчет</option>
            <option value="Returned">Возвращен исполнителю</option>
            <option value="Taken down">Исполнитель с расчета снят</option>
            <option value="Overdue">Просрочен</option>
          </select></p>

          <p> <label for="payment_id">ID расчета</label>
          <input id="payment_id" type="text" ref="payment_id" /></p>
          <p> <label for="deadline">Дедлайн</label>
          <input id="deadline" type="text" ref="deadline" /></p>
          <p> <label for="resolution">Резолюция</label>
          <input id="resolution" type="text" ref="resolution" /></p>
          <p> <label for="contractor_id">ID исполнителя*</label>
          <input id="contractor_id" type="text" ref="contractor_id" /></p>
          <p className="helptext">* - обязательное поле</p>
          <div className="details"> 
            <h5>Добавить детали запроса(опционально)</h5>
            <div className="form-group">
            <p> <label for="product">Товар*</label>
            <input id="product" type="text" ref="product"/>
            </p>
            <p> 
            <label for="amount">Количество*</label>
            <input id="amount" type="text" ref="amount"/></p>
            <p> <label for="okei">ОКЕИ*</label>
            <input id="okei" type="text" ref="okei" /></p>
            <p> <label for="okpd">ОКПД2*</label>
            <input id="okpd" type="text" ref="okpd" /></p>
            <p><input type="submit" /></p>
          </div>
        </div>
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
