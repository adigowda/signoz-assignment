import { useRef } from "react";
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
    updateShouldShowEventDetails,
  } = useCalendar(calendarApi);

  return (
    <div className="p-10 max-sm:px-5 text-sm">
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, dayGridPlugin, interactPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
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
            dayHeaderFormat: {
              day: "numeric",
              month: "short",
              weekday: "short",
            },
          },
        }}
        unselect={() => updateShouldShowEventDetails(false)}
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
        scrollTime="09:00:00"
        scrollTimeReset={false}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "lowercase",
        }}
      />
      {shouldShowDetails && (
        <EventEditor
          onClose={() => updateShouldShowEventDetails(false)}
          eventDetails={eventDetails}
          onSave={onSaveEvent}
          onDelete={onDeleteEvent}
        />
      )}
    </div>
  );
}
