import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactPlugin from "@fullcalendar/interaction";
import { EventEditor } from "../EventEditor/EventEditor";
import { useEvents } from "../../hooks/useEvents";
import { useCalendar } from "../../hooks/useCalendar";
import { useReminders } from "../../hooks/useReminders";

export function Calendar(): JSX.Element {
  useReminders();
  const calendarRef = useRef<FullCalendar>(null);
  const calendarApi = calendarRef.current?.getApi();
  const { events } = useEvents();
  const {
    selectedEvent: { shouldShowDetails, eventDetails },
    onSelectCalendar,
    onSelectEvent,
    onEventDragEnd,
    onSaveEvent,
    onDeleteEvent,
    updateShowEventDetails,
  } = useCalendar();

  const [calendarTitle, setCalendarTitle] = useState("");

  useEffect(() => {
    if (!calendarTitle && calendarApi?.view.title) {
      setCalendarTitle(calendarApi?.view.title);
    }

    calendarApi?.on("datesSet", (event) => {
      setCalendarTitle(event.view.title);
    });

    calendarApi?.scrollToTime(dayjs(Date.now()).format("hh:[00]"));
  }, [calendarApi, calendarTitle]);

  return (
    <div className="p-10 max-sm:px-5 text-sm">
      <p className="text-2xl mb-5 text-center">{calendarTitle}</p>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, dayGridPlugin, interactPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
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
            dayHeaderFormat: {
              day: "numeric",
              month: "short",
              weekday: "short",
            },
          },
        }}
        unselect={() => updateShowEventDetails(false)}
        unselectCancel={".event-editor,.date-popover,.time-popover,.dropdown-popover"}
        selectable={!shouldShowDetails}
        events={events}
        editable
        eventDrop={onEventDragEnd}
        eventResize={onEventDragEnd}
        select={onSelectCalendar}
        eventClick={({ event: { id } }) => onSelectEvent(id)}
        nowIndicator
        navLinks
        eventMinHeight={20}
        height="90vh"
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "lowercase",
        }}
      />
      {shouldShowDetails && (
        <EventEditor
          onClose={() => updateShowEventDetails(false)}
          eventDetails={eventDetails}
          onSave={onSaveEvent}
          onDelete={onDeleteEvent}
        />
      )}
    </div>
  );
}
