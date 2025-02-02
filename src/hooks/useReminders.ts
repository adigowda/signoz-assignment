import { useEffect, useRef, useState } from "react";
import { useEvents } from "./useEvents";
import dayjs from "dayjs";
import { EventInput as IEvent } from "@fullcalendar/core";

const REMIND_BEFORE_MS = 600000; // 10 minutes

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
        const eventStartsAt = dayjs(start as Date).valueOf();
        return {
          title,
          eventStartsAt,
          currentReminderTimeout:
            eventStartsAt - currentTime - REMIND_BEFORE_MS,
        };
      })
      .filter(({ currentReminderTimeout }) => currentReminderTimeout > 0)
      .sort((a, b) => a.eventStartsAt - b.eventStartsAt);
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
      const alertMessage = reminders.eventsToNotify.reduce(
        (prevMessage, currentEvent) => {
          const message = `${currentEvent.title} will be starting in 10 mins`;
          return prevMessage + "\n" + message;
        },
        ""
      );
      window.alert(alertMessage);

      prepareNotifiableEvents();
    }, reminders.currentReminderTimeout);

    return () => clearInterval(reminderTimeoutRef.current as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminders]);
};
