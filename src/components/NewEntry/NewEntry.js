import React from 'react';
import EntryForm from '../EntryForm/EntryForm';

const NewEntry = (props) => {
  const { state } = props.location;
  return (
    <div>
      <h1 className='text-center'>New Journal Entry</h1>
      <EntryForm {...state} />
    </div>
  );
};

export default NewEntry;
