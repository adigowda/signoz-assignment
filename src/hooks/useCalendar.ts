import { DateSelectArg, EventInput as IEvent } from "@fullcalendar/core";
import { useState } from "react";
import { useEvents } from "./useEvents"

export const useCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<{
    shouldShowDetails: boolean;
    eventDetails: IEvent;
  }>({ shouldShowDetails: false, eventDetails: {} });

  const { getEventById, createEvent, updateEvent } = useEvents();

  const onSelectCalendar = (info: DateSelectArg) => {
    const { start, end, allDay } = info;
    setSelectedEvent({
      shouldShowDetails: true,
      eventDetails: {
        start,
        end,
        allDay,
      },
    });
  };

const onSelectEvent = (id: string) => {
  const eventDetails = getEventById(id);
  setSelectedEvent({
    shouldShowDetails: true,
    eventDetails,
  });
};

  const updateShowEventDetails = (show: boolean) => {
    setSelectedEvent((prev) => ({ ...prev, shouldShowDetails: show }));
  };

  const onClickEventSave = (event: IEvent) => {
    if (event.id) {
      updateEvent(event.id, event);
    } else {
      createEvent(event);
    }
    updateShowEventDetails(false);
  };

  return {
    selectedEvent,
    onSelectCalendar,
    onSelectEvent,
    onClickEventSave,
    updateShowEventDetails
  };
};
