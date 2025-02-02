import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import intercatPlugin from "@fullcalendar/interaction";
import { EventEditor } from "../EventEditor/EventEditor";
import { useEvents } from "../../hooks/useEvents";
import { useCalendar } from "../../hooks/useCalendar";

export function Calendar(): JSX.Element {
  const { events } = useEvents();
  const {
    selectedEvent: { shouldShowDetails, eventDetails },
    onSelectCalendar,
    onSelectEvent,
    onEventDragEnd,
    onClickEventSave,
    updateShowEventDetails,
  } = useCalendar();

  return (
    <div>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, intercatPlugin]}
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
            dayHeaderFormat: {
              day: "numeric",
              month: "short",
              weekday: "short",
            },
          },
        }}
        unselect={() => updateShowEventDetails(false)}
        unselectCancel={".event-editor,.MuiPickersPopper-root,.MuiPopover-root"}
        selectable={!shouldShowDetails}
        events={events}
        editable
        eventDrop={onEventDragEnd}
        eventResize={onEventDragEnd}
        select={onSelectCalendar}
        eventClick={({ event: { id } }) => onSelectEvent(id)}
      />
      {shouldShowDetails && (
        <EventEditor
          onClickClose={() => updateShowEventDetails(false)}
          eventDetails={eventDetails}
          onClickSave={onClickEventSave}
        />
      )}
    </div>
  );
}
