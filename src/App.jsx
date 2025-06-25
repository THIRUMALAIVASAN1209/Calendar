import React, { useState } from "react";
import Calendar from "./calendar";
import eventsData from "./events.json";

const App = () => {
  const [events, setEvents] = useState(eventsData);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="app">
      <h1>My Calendar</h1>
      <Calendar events={events} addEvent={addEvent} />
    </div>
  );
};

export default App;
