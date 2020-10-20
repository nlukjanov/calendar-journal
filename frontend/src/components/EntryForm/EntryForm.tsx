import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type EntryForm = {
  formData: any;
  handleSubmit: any;
  handleChange: any;
};

const EntryForm = ({ formData, handleSubmit, handleChange }: EntryForm) => {
  console.log('formData', formData);
  return (
    <Card className='mx-auto mt-5 border-light' style={{ maxWidth: '25rem' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name='title'
            type='title'
            placeholder='Enter title'
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='entryText'>
          <Form.Label>Entry Text</Form.Label>
          <Form.Control
            type='textarea'
            name='entryText'
            placeholder='Entry Text'
            value={formData.entryText}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='date'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type='datetime-local'
            name='date'
            placeholder='Date'
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default EntryForm;
