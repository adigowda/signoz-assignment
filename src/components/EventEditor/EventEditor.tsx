import { EventInput as IEvent } from "@fullcalendar/core";
import dayjs from "dayjs";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/";
import { ColorPicker } from "../ColorPicker/ColorPicker"
import Cross from "../../../public/Icons/cross.svg"

interface EventEditorProps {
  eventDetails: IEvent;
  onClickSave: (event: IEvent) => void;
  onClickClose: () => void;
}

export function EventEditor(props: EventEditorProps): JSX.Element {
  const { eventDetails, onClickSave, onClickClose } = props;
  const [eventConfig, setEventConfig] = useState({
    ...eventDetails,
  });
  const { title, start, end, color } = eventConfig;

  const handleChange = (property: Partial<IEvent>) => {
    setEventConfig((prev) => ({
      ...prev,
      ...property,
    }));
  };

  return (
    <div className="bg-[#F0F4F9] shadow-2xl flex flex-col gap-6 z-10 p-6 w-[500px] absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl event-editor">
      <img src={Cross} className="w-4 relative left-full -translate-x-full cursor-pointer" onClick={onClickClose} />
      <input
        placeholder="Add title"
        value={title}
        onChange={(e) => handleChange({ title: e.target.value })}
        autoFocus
        className="text-[20px] left-1/2 w-full px-2 pb-1 border-b-[1px] border-b-[#C4C7C5] outline-none"
      />
      <DatePicker
        slotProps={{ textField: { size: "small", variant: "filled" } }}
        value={dayjs(start as Date)}
        format="dddd, D MMM"
        name="start"
        onChange={(value) => handleChange({ start: value?.toDate() })}
      />
      <div className="flex gap-2 items-center">
        <TimePicker
          format="h:ma"
          value={dayjs(start as Date)}
          slotProps={{ textField: { size: "small", variant: "filled" } }}
          sx={{ width: 140 }}
          onChange={(value) => handleChange({ start: value?.toISOString() })}
        />
        <p>to</p>
        <TimePicker
          value={dayjs(end as Date)}
          slotProps={{ textField: { size: "small", variant: "filled" } }}
          format="h:ma"
          onChange={(value) => handleChange({ end: value?.toISOString() })}
          sx={{ width: 140 }}
        />
      </div>
      <ColorPicker
        selectedColor={color}
        onColorChange={(color) => handleChange({ color })}
      />
      <button
        onClick={() => {
          onClickSave(eventConfig);
        }}
        className="relative bg-[#0b57d0] py-2 px-4 cursor-pointer text-white rounded-full w-fit left-full -translate-x-full"
      >
        Save
      </button>
    </div>
  );
}
