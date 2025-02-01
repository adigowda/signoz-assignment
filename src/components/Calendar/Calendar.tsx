import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

export function Calendar(): JSX.Element {
  return (
    <div>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
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
        views={{
          timeGridWeek: {
            dayHeaderFormat: { day: "2-digit", month: "short" },
          },
        }}
      />
    </div>
  );
}
