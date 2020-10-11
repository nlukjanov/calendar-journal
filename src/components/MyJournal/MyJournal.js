import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useHistory } from 'react-router-dom';

import { getToken } from '../../lib/authHelper';

const MyJournal = () => {
  const history = useHistory();
  const headerToolbarOptions = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,list',
  };
  const [journalEntries, setJournalEntries] = useState();
  const getEntries = async () => {
    const headers = { headers: { Authorization: `Bearer ${getToken()}` } };
    try {
      const res = await axios.get('http://localhost:4000/api/journal', headers);
      const events = res.data.map((entry) => {
        return {
          title: entry.title,
          date: entry.date,
        };
      });
      setJournalEntries(events);
      // add notification with res
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEntries();
  }, []);

  useEffect(() => console.log(journalEntries), [journalEntries]);

  const dateClick = (info) => {
    return history.push('/new-entry', { date: info.dateStr });
  };

  return (
    <>
      <div>My journal</div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView='dayGridMonth'
        headerToolbar={headerToolbarOptions}
        events={journalEntries}
        weekNumbers={true}
        dateClick={dateClick}
      />
    </>
  );
};

export default MyJournal;
