import React from 'react';
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
export default function Home() {
  return (

    <div className="home-home">
      <Button variant="success"><Link to={'/admin'} >Кабинет Администратора</Link></Button>
      <Button variant="success"> <Link to={'/contractor'} >Кабинет Исполнителя</Link></Button>
    </div>

  );
};

Home.propTypes = {};
Home.defaultProps = {};
