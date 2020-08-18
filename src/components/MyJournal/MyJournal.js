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
    try {
      const res = await axios.get('http://localhost:4000/api/journal', headers);
      setJournalEntries(res.data);
      // add notification with res
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => console.log(journalEntries), [journalEntries]);
  return (
    <>
      <div>My journal</div>
      <div>
        {journalEntries &&
          journalEntries.map((entry, index) => {
            return (
              <div key={index}>
                <div>{entry.title}</div>
                <div>{entry.entryText}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MyJournal;
