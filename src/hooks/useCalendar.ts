import {
  CalendarApi,
  DateSelectArg,
  EventDropArg,
  EventInput as IEvent,
} from "@fullcalendar/core";
import { useEffect, useState } from "react";
import { useEvents } from "./useEvents";
import { EventResizeDoneArg } from "@fullcalendar/interaction/index.js";
import dayjs from "dayjs";

export const useCalendar = (calendarApi?: CalendarApi) => {
  const { getEventById, createEvent, updateEvent, deleteEvent } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<{
    shouldShowDetails: boolean;
    eventDetails: IEvent;
  }>({ shouldShowDetails: false, eventDetails: {} });

  useEffect(() => {
    calendarApi?.scrollToTime(dayjs(Date.now()).format("HH:[00]"));
  }, [calendarApi]);

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

  const updateShouldShowEventDetails = (show: boolean) => {
    setSelectedEvent((prev) => ({ ...prev, shouldShowDetails: show }));
    calendarApi?.unselect();
  };

  const onEventDragEnd = (eventInfo: EventDropArg | EventResizeDoneArg) => {
    const {
      event: { id, start, end },
    } = eventInfo;
    const eventDetails = getEventById(id);

    updateEvent(id, {
      ...eventDetails,
      start,
      end,
    } as IEvent);
  };

  const onSaveEvent = (event: IEvent) => {
    if (event.id) {
      updateEvent(event.id, event);
    } else {
      createEvent(event);
    }
    calendarApi?.gotoDate(event.start as Date);
    updateShouldShowEventDetails(false);
  };

  const onDeleteEvent = (event: IEvent) => {
    if (!event.id) {
      return;
    }
    deleteEvent(event.id);
    updateShouldShowEventDetails(false);
  };

  return {
    selectedEvent,
    onSelectCalendar,
    onSelectEvent,
    onEventDragEnd,
    onSaveEvent,
    onDeleteEvent,
    updateShouldShowEventDetails,
  };
};
