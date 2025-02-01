import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export function Calendar(): JSX.Element {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        buttonText={{
          day: "Day",
          month: "Month",
          week: "Week",
          today: "Today",
        }}
      />
    </div>
  );
}
