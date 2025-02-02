import { DateSelectArg, EventInput as IEvent } from "@fullcalendar/core";
import { useState } from "react";
import { useEvents } from "./useEvents"

export const useCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<{
    showDetails: boolean;
    eventDetails: IEvent;
  }>({ showDetails: false, eventDetails: {} });

  const { getEventById } = useEvents();

  const onSelectCalendar = (info: DateSelectArg) => {
    const { start, end, allDay } = info;
    setSelectedEvent({
      showDetails: true,
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
    showDetails: true,
    eventDetails,
  });
};

  const updateShowEventDetails = (show: boolean) => {
    setSelectedEvent((prev) => ({ ...prev, showDetails: show }));
  };

  return {
    selectedEvent,
    onSelectCalendar,
    onSelectEvent,
    updateShowEventDetails
  };
};
