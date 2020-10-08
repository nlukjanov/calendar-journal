import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getToken } from '../../lib/authHelper';

const MyJournal = () => {
  const headerToolbarOptions = {
    start: 'title', // will normally be on the left. if RTL, will be on the right
    center: '',
    end: 'today prevYear prev,next nextYear', // will normally be on the right. if RTL, will be on the left
  };
  const [journalEntries, setJournalEntries] = useState();
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
  useEffect(() => {
    getEntries();
  }, []);

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
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        headerToolbar={headerToolbarOptions}
        events={[
          { title: 'event 1', date: '2020-10-02' },
          { title: 'event 2', date: '2020-10-02' },
        ]}
      />
    </>
  );
};

export default MyJournal;
