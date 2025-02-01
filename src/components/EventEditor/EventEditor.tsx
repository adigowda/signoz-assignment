import { EventInput as IEvent } from "@fullcalendar/core";

interface EventEditorProps {
  eventDetails: IEvent;
}

export function EventEditor(props: EventEditorProps): JSX.Element {
  const { eventDetails } = props;
  const { title } = eventDetails;
  return (
    <div className="bg-[#A6F1E0] z-10 p-6 w-[600px] absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl">
      <input
        placeholder="Add title"
        value={title}
        className="text-[16px] left-1/2 w-full px-2 pb-1 border-b-[1px] border-b-[#73C7C7] outline-none"
      />
    </div>
  );
}
