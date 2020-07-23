import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const EntryForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ title: '', entryText: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/journal', formData);
      history.push('/myjournal');
      // add notification with res
    } catch (error) {
      console.log(error);
      // setSignupErrors(error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    const formNewData = { ...formData, [name]: value };
    setFormData(formNewData);
  };

  return (
    <form data-testid='entry-form' onSubmit={handleSubmit}>
      <label htmlFor='title'>Title</label>
      <input
        id='title'
        name='title'
        placeholder='Entry title'
        type='text'
        onChange={handleChange}
        value={formData.title}
      />
      <label htmlFor='entryText'>Entry text</label>
      <input
        id='entryText'
        name='entryText'
        placeholder='Entry text'
        type='text'
        onChange={handleChange}
        value={formData.entryText}
      />
      <button type='submit'>Create Entry</button>
    </form>
  );
};

export default EntryForm;
