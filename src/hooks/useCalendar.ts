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

  const updateShowEventDetails = (show: boolean) => {
    setSelectedEvent((prev) => ({ ...prev, showDetails: show }));
  };

  return {
    selectedEvent,
    onSelectCalendar,
    updateShowEventDetails
  };
};
