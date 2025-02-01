import { DateSelectArg, EventInput as IEvent } from "@fullcalendar/core";
import { useState } from "react";

export const useCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<{
    showDetails: boolean;
    eventDetails: IEvent;
  }>({ showDetails: false, eventDetails: {} });

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

  return {
    selectedEvent,
    onSelectCalendar,
  };
};
