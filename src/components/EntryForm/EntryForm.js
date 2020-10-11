import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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
      <input
        id='date'
        name='date'
        type='datetime-local'
        onChange={handleChange}
        value={formData.date}
      />
      <button type='submit'>Create Entry</button>
    </form>
  );
};

export default EntryForm;
