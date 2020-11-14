import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import InquirySearch from './InquirySearch'


export class Inquiries extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-inquiries">
       <Tab.Pane eventKey="#inquiries">
          <h3 className="mb-4">Запросы</h3>
          <InquirySearch/>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th >#</th>
                  <th>Название</th>
                  <th>Статус</th>
                  <th>Исполнитель</th>
                  <th eventKey="payments">Расчет</th>
                  <th>Создан</th>
                </tr>
              </thead>
              
              <tbody>
            
             {this.props.home.inquiriesList.map(item =>(
               <tr> 
               <td key={item.id}><a href={'http://127.0.0.1:8000/inquiry/'+item.id+'/details'}>{item.id}</a></td>
               <td>{item.name}</td>
               <td>{item.current_status.status}</td> 
              <td>{item.current_status.contractor.username}</td> 
               <td>{item.payment_m}</td>
               <td>{(new Date(item.date_created)).toLocaleDateString()}</td>
               </tr>))}
                </tbody>
            </Table>
        </Tab.Pane>
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
)(Inquiries);
