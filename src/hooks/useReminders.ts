import { useEffect, useRef, useState } from "react";
import { useEvents } from "./useEvents";
import dayjs from "dayjs";
import { EventInput as IEvent } from "@fullcalendar/core";

export const useReminders = () => {
  const { events } = useEvents();
  const reminderTimeoutRef = useRef<number | null>(null);

  const [reminders, setReminders] = useState<{
    eventsToNotify: IEvent[];
    currentReminderTimeout: number;
  }>({
    eventsToNotify: [],
    currentReminderTimeout: 0,
  });

  const getFutureEvents = () => {
    const currentTime = dayjs(new Date()).valueOf();
    return events
      .map(({ title, start }) => {
        const timeStamp = dayjs(start as Date).valueOf();
        return {
          title,
          timeStamp,
          currentReminderTimeout: timeStamp - currentTime,
        };
      })
      .filter(({ currentReminderTimeout }) => currentReminderTimeout > 0)
      .sort((a, b) => a.timeStamp - b.timeStamp);
  };

  const prepareNotifiableEvents = () => {
    const futureEvents = getFutureEvents();
    if (!futureEvents.length) {
      return;
    }

    const upcomingNotifiableEvents = [];
    for (let eventIndex = 0; eventIndex < futureEvents.length; eventIndex++) {
      // group all events with same start time
      if (
        futureEvents[eventIndex].currentReminderTimeout ===
        futureEvents[0].currentReminderTimeout
      ) {
        upcomingNotifiableEvents.push(futureEvents[eventIndex]);
      } else {
        break;
      }
    }

    setReminders({
      eventsToNotify: upcomingNotifiableEvents,
      currentReminderTimeout:
        upcomingNotifiableEvents[0].currentReminderTimeout,
    });
  };

  useEffect(() => {
    prepareNotifiableEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  useEffect(() => {
    if (reminders.currentReminderTimeout === 0) {
      return;
    }
    if (reminderTimeoutRef.current) {
      clearTimeout(reminderTimeoutRef.current);
    }

    reminderTimeoutRef.current = setTimeout(() => {
      //  TODO: Stitch same events into one single alert
      reminders.eventsToNotify.forEach(({ title }) => window.alert(title));

      prepareNotifiableEvents();
    }, reminders.currentReminderTimeout);

    return () => clearInterval(reminderTimeoutRef.current as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminders]);
};
