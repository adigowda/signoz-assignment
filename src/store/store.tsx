import { atomWithStorage } from "jotai/utils";
import { EventInput as IEvent } from "@fullcalendar/core";
import { withImmer } from "jotai-immer";

export const eventsAtom = withImmer(
  atomWithStorage<{ [key: string]: IEvent }>("events-data", {})
);

