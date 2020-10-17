import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getToken } from '../../lib/authHelper';

const EntryForm = ({ date }) => {
  const history = useHistory();
  const passedDate = date ? new Date(date).toISOString().substr(0, 16) : '';
  const [formData, setFormData] = useState({
    title: '',
    entryText: '',
    date: passedDate,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/journal', formData, {
        headers: { Authorization: `Bearer ${getToken('token')}` },
      });
      history.push('/myjournal');
      // add notification with res
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    const formNewData = { ...formData, [name]: value };
    setFormData(formNewData);
  };

  useEffect(() => {
    console.log(formData.date);
  }, [formData.date]);

  return (
    <Card className='mx-auto mt-5 border-light' style={{ maxWidth: '25rem' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name='title'
            type='title'
            placeholder='Enter title'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='entryText'>
          <Form.Label>Entry Text</Form.Label>
          <Form.Control
            type='textarea'
            name='entryText'
            placeholder='Entry Text'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='date'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type='datetime-local'
            name='date'
            placeholder='Date'
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Create Entry
        </Button>
      </Form>
    </Card>
  );
};

export default EntryForm;
