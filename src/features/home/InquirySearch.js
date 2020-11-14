import React, {useState} from 'react';
import { useShowFilter, useCheckboxCreated } from './redux/hooks'
// import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FilterCheckboxes from './FilterCheckboxes'

export default function InquirySearch() {


  let [showfilter, setShowFilter] = useState(false)

  const created = useCheckboxCreated();



  return (
    <div className="home-inquiry-search">
            <Form inline className="mb-4">
            <InputGroup>
            <Form.Control placeholder="Поиск запроса" className="col-9"/>
              <InputGroup.Append>
              <Button onClick={() => setShowFilter} variant="outline-info">По статусу</Button>
              </InputGroup.Append>
            <Button type="submit" className="ml-3">Найти</Button>
            </InputGroup> 
            {showfilter? (
              <FilterCheckboxes/>) : ("")
            }
          </Form>
          

    </div>
  );}
  

InquirySearch.propTypes = {};
InquirySearch.defaultProps = {};
