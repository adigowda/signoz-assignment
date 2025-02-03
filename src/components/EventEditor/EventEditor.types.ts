import { EventInput as IEvent } from "@fullcalendar/core";

export interface IEventEditorProps {
  onClose: () => void;
  onSave: (event: IEvent) => void;
  onDelete: (event: IEvent) => void;
  eventDetails: IEvent;
}
