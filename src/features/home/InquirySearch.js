import React from 'react';
import { useShowFilter, useCheckboxCreated } from './redux/hooks'
// import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';


export default function InquirySearch() {

  const showFilters = useShowFilter();
  const created = useCheckboxCreated();

  return (
    <div className="home-inquiry-search">
            <Form inline className="mb-4">
            <InputGroup>
            <Form.Control placeholder="Поиск запроса" className="col-9"/>
              <InputGroup.Append>
              <Button onClick={showFilters} variant="outline-info">По статусу</Button>
      
              </InputGroup.Append>
            <Button type="submit" className="ml-3">Найти</Button>
            </InputGroup> 
          </Form>
          <div id="inq-status">
            <div>
              <Form.Check inline label="Создан" type="checkbox" onClick={created} id="inline-checkbox-1"/>
              <Form.Check inline label="Принят" type="checkbox" id="inline-checkbox-2"/>
              <Form.Check inline label="Сформирован" type="checkbox" id="inline-checkbox-3"/>
            </div>
            <div>
              <Form.Check inline label="Возвращен" type="checkbox" id="inline-checkbox-4"/>
              <Form.Check inline label="Просрочен" type="checkbox" id="inline-checkbox-5" />
              <Form.Check inline label="Снят с расчета" type="checkbox" id="inline-checkbox-6"/>
            </div>
          </div>
    </div>
  );
};

InquirySearch.propTypes = {};
InquirySearch.defaultProps = {};
