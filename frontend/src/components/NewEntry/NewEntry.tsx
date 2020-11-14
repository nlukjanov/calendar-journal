import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import EntryForm from '../EntryForm/EntryForm';
import { getToken } from '../../lib/authHelper';

const NewEntry = (props: any) => {
  const history = useHistory();
  const { state } = props.location;
  const passedData = {
    date: state?.date ? new Date(state.date).toISOString().substr(0, 16) : '',
    title: state?.title || '',
    entryText: state?.entryText || '',
  };
  const [formData, setFormData] = useState(passedData);

  const handleSubmit = async (e: any) => {
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

  type Change = {
    target: Field;
  };

  type Field = {
    name: string;
    value: string;
  };
  const handleChange = ({ target: { name, value } }: Change) => {
    const formNewData = { ...formData, [name]: value };
    setFormData(formNewData);
  };

  // useEffect(() => {
  //   console.log(formData.date);
  // }, [formData.date]);

  return (
    <div>
      <h1 className='text-center'>New Journal Entry</h1>
      <EntryForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
};

export default NewEntry;
