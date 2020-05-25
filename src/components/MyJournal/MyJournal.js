import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../lib/authHelper';

const MyJournal = () => {
  const [journalEntries, setJournalEntries] = useState();

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    const headers = { headers: { Authorization: `Bearer ${getToken()}` } };
    console.log(headers);
    try {
      const res = await axios.get(
        'http://localhost:4000/api/myjournal',
        headers
      );
      console.log(res);
      setJournalEntries(res.body);
      // add notification with res
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => console.log(journalEntries), [journalEntries]);
  return <div>My Journal</div>;
};

export default MyJournal;
