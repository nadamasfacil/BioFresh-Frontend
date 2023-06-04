import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { useDispatch } from 'react-redux';
import { getProductsByName } from '../../Redux/actions/actionsProducts';

const SearchBar = () => {

  const dispatch = useDispatch();
  const [ name, setName ] = useState('');

  const handlerChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (!name) window.alert('Input empty');
    else {
      const nameFound = await getProductsByName(name, true);
      if (nameFound.hasOwnProperty('error')) { 
        setName('');
        alert(nameFound.error);
      } else {
        setName('');
        dispatch(nameFound);
      };
    };
  };

  return (
      <Form onSubmit={handlerSubmit} className='col-sm-6 mx-auto mt-3' >
        <Stack direction="horizontal" >
          <Form.Control className="me-auto" placeholder="Product ..." name='name' onChange={handlerChange} />
          <Button variant="btn btn-outline-success" type='submit' >🔎</Button>
          <Button variant="btn btn-outline-danger" type='reset' ><strong>X</strong></Button>
        </Stack>
      </Form>
  )
}

export default SearchBar;