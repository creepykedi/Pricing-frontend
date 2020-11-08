import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CreatePaymentForm from './CreatePaymentForm'
export class Payments extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-payments">
      <Button onClick={this.props.actions.getPaymentDetails} className="mb-2">Все расчеты</Button>
      <CreatePaymentForm/>
        <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Номер расчета</th>
                  <th>Запрос</th>
                  <th>Позиция</th>
                  <th>Цена</th>
                  <th>Исполнитель</th>
                </tr>
              </thead>
              <tbody>
              {this.props.home.payments.map(item =>(
                <tr>
                  <td key={item.id}>{item.payment_id}</td>
                  <td>{item.inquiry.name}</td>
                  <td>{item.NMC.position}</td>
                  <td>{item.NMC.price}</td>
            
                  <td>{item.inquiry.current_status.contractor.username}</td>
                  
                </tr>))}
                </tbody>
        </Table>
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
)(Payments);
