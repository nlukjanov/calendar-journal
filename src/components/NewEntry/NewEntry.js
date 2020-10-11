import React from 'react';
import EntryForm from '../EntryForm/EntryForm';

const NewEntry = (props) => {
  const date = props.location.state;
  return (
    <div>
      <h1>New Journal Entry</h1>
      <EntryForm {...date} />
    </div>
  );
};

export default NewEntry;
