import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import Inquiries from './Inquiries'

import * as actions from './redux/actions';

export class Admin extends Component {
  
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };


  render() {
    return (
      <div className="home-admin">
      <Link to={'/'} className="Homelink">Главная</Link> 
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <ListGroup horizontal>
          <ListGroup.Item action href="#contractors" onClick={this.props.actions.getContractorsList} variant="info">
            Исполнители 
          </ListGroup.Item>
          <ListGroup.Item action href="#inquiries" onClick={this.props.actions.getInquiriesList} variant="info">
            Запросы
          </ListGroup.Item>
          <ListGroup.Item action href="admin/createInquiry" variant="info">
            Создать Запрос
          </ListGroup.Item>
        </ListGroup>
     

      <div className="col-9 mt-3">
      <Tab.Content>
        <Tab.Pane eventKey="#contractors">
        <h3 className="mb-4">Исполнители</h3>
          <Form inline className="mb-4">
            <Form.Control placeholder="Поиск исполнителя" className="col-9"/>
            <Button type="submit" className="ml-3">Найти</Button>
          </Form>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th >#</th>
                  <th>Имя</th>
                </tr>
              </thead>
              <tbody>
              {this.props.home.contractorsList.map(item =>(
                <tr>
                  <td key={item.id}>{item.id}</td>
                  <td>{item.username}</td>
                </tr>))}
                </tbody>
            </Table>
        </Tab.Pane>
   
      <Inquiries/>
       

        </Tab.Content>
        
        </div>
        

         </Tab.Container>
         
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
)(Admin);