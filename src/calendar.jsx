import { useState } from "react";
import './calendar.css';

const Calendar = ({ events, addEvent }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };
  const getEventForDay = (day) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === currentDate.getFullYear() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getDate() === day
      );
    });
  };
  const handleDayClick = (day) => {
    const title = prompt("Enter event title:");
    const startTime = prompt("Enter start time (HH:MM):");
    const endTime = prompt("Enter end time (HH:MM):");
    const color = prompt("Enter color:");

    if (title && startTime && endTime && color) {
      const dateStr = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      addEvent({ title, startTime, endTime, color, date: dateStr });
    }
  };

  const days = [];
  const firstDayIndex = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const totalDays = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<div key={"empty-" + i} className="calendar_day empty"></div>);
  }
  for (let d = 1; d <= totalDays; d++) {
    const dayEvents = getEventForDay(d);
    const isToday =
      d === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    days.push(
      <div
        key={d}
        className={`calendar_day${isToday ? " today" : ""}`}
        onClick={() => handleDayClick(d)}
      >
        <div className="date_number">{d}</div>
        {dayEvents.map((event, index) => (
          <div
            key={index}
            className="event"
            style={{ backgroundColor: event.color }}
            title={`${event.title} (${event.startTime} - ${event.endTime})`}
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="calendar_wrapper">
      <div className="calendar_header">
        <button onClick={goToPrevMonth}>Prev</button>
        <div className="calendar_month_year">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <div className="calendar_grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar_day_name">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

export default Calendar;
