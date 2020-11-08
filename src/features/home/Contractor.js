import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import Inquiries from './Inquiries'
import Payments from './Payments'
import { Link } from 'react-router-dom'
export class Contractor extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      
      <div className="home-contractor">
        <Link to={'/'} className="Homelink">Главная</Link> 
        <h3 className="center">Кабинет исполнителя</h3>
       <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <ListGroup horizontal>
          <ListGroup.Item action href="#inquiries" onClick={this.props.actions.getContractorsList} variant="info">
            Запросы 
          </ListGroup.Item>
          <ListGroup.Item action href="#payments" onClick={this.props.actions.getInquiriesList} variant="info">
            Расчеты
          </ListGroup.Item>
        </ListGroup>
    

        <div className="col-9 mt-3">
        <Tab.Content>
          <Tab.Pane eventKey="#inquiries">
            <Inquiries/>
          </Tab.Pane>
          <Tab.Pane eventKey="#payments">
            <Payments/>
          </Tab.Pane>
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
)(Contractor);
