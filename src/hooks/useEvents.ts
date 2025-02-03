import { useAtom } from "jotai";
import { eventsAtom } from "../store/store";
import { v4 as uuidv4 } from "uuid";
import { EventInput as IEvent } from "@fullcalendar/core";
import { useMemo } from "react";

export const useEvents = () => {
  const [calendarEvents, setCalendarEvents] = useAtom(eventsAtom);
  
  const createEvent = (event: IEvent) => {
    const id = uuidv4();
    setCalendarEvents((calendarEvents) => {
      calendarEvents[id] = { ...event, id };
    });
  };

  const updateEvent = (id: string, updatedEvent: IEvent) => {
    setCalendarEvents((calendarEvents) => {
      calendarEvents[id] = updatedEvent;
    });
  };

  const deleteEvent = (id: string) => {
    setCalendarEvents((calendarEvents) => {
      const updatedEvents = { ...calendarEvents };
      delete updatedEvents[id];
      return updatedEvents;
    });
  };

  const getEventById = (id: string) => {
    return calendarEvents[id];
  };

  const events = useMemo(
    () =>
      Object.keys(calendarEvents).map((key) => ({
        id: key,
        ...calendarEvents[key],
      })),
    [calendarEvents]
  );

  return {
    events,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById
  };
};
