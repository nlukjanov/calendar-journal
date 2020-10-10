import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { getToken } from '../../lib/authHelper';

const MyJournal = () => {
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
  return (
    <>
      <div>My journal</div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView='dayGridMonth'
        headerToolbar={headerToolbarOptions}
        events={journalEntries}
        weekNumbers={true}
        dateClick={function (info) {
          alert(
            `Clicked on: ${info.dateStr}, Coordinates: ${
              info.jsEvent.pageX + ',' + info.jsEvent.pageY
            }, Current view: ${info.view.type}`,
          );
          // change the day's background color just for fun
          // info.dayEl.style.backgroundColor = 'red';
        }}
      />
    </>
  );
};

export default MyJournal;
