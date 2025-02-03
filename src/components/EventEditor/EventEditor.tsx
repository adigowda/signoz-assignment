import { EventInput as IEvent } from "@fullcalendar/core";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import Cross from "../../../public/Icons/cross.svg";
import Edit from "../../../public/Icons/edit.svg";
import Delete from "../../../public/Icons/delete.svg";
import { IEventEditorProps } from "./EventEditor.types";
import classNames from 'classnames'

export function EventEditor(props: IEventEditorProps): JSX.Element {
  const { eventDetails, onClose, onSave, onDelete } = props;
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [event, setEvent] = useState(eventDetails);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (property: Partial<IEvent>) => {
    setIsEditing(true);
    setEvent((prev) => ({
      ...prev,
      ...property,
    }));
  };

  const startDate = dayjs(event.start as Date);
  const endDate = dayjs(event.end as Date);
  const isMultiDayEvent = endDate.diff(startDate, "days") > 0;

  return (
    <div
      className="bg-[#F0F4F9] border-[#039ae5] border-l-[20px] shadow-2xl flex flex-col gap-6 z-10 p-6 w-[500px] absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl event-editor"
      style={{
        borderColor: event.color,
      }}
    >
      <div className="flex items-center gap-4 justify-end">
        {event.id && (
          <>
            <img
              src={Edit}
              className="w-5 cursor-pointer"
              onClick={() => {
                setIsEditing(true);
                titleInputRef.current?.focus();
              }}
            />
            <img
              src={Delete}
              className="w-5 cursor-pointer"
              onClick={() => onDelete(event)}
            />
          </>
        )}
        <img
          src={Cross}
          className="w-5 cursor-pointer ml-4"
          onClick={onClose}
        />
      </div>
      <input
        ref={titleInputRef}
        placeholder="Add title"
        value={event.title}
        onChange={(e) => handleChange({ title: e.target.value })}
        className="text-[20px] left-1/2 w-full px-2 pb-1 border-b-[1px] border-b-[#C4C7C5] outline-none"
      />
      <div className="flex gap-4 items-center">
        <DatePicker
          slotProps={{
            textField: { size: "small", variant: "filled" },
            popper: { className: "date-popover" },
          }}
          value={startDate}
          format="dddd, D MMM"
          onChange={(value) => handleChange({ start: value?.toDate() })}
        />
        {isMultiDayEvent && (
          <>
            <span> - </span>
            <DatePicker
              slotProps={{
                textField: { size: "small", variant: "filled" },
                popper: { className: "date-popover" },
              }}
              value={endDate}
              format="dddd, D MMM"
              onChange={(value) => handleChange({ end: value?.toDate() })}
            />
          </>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <TimePicker
          format="h:ma"
          value={startDate}
          slotProps={{
            textField: { size: "small", variant: "filled" },
            popper: { className: "time-popover" },
          }}
          sx={{ width: 140 }}
          onChange={(value) => handleChange({ start: value?.toISOString() })}
        />
        <p>to</p>
        <TimePicker
          value={endDate}
          slotProps={{
            textField: { size: "small", variant: "filled" },
            popper: { className: "time-popover" },
          }}
          format="h:ma"
          onChange={(value) => handleChange({ end: value?.toISOString() })}
          sx={{ width: 140 }}
        />
      </div>
      <ColorPicker
        selectedColor={event.color}
        onColorChange={(color) => handleChange({ color })}
      />
      <button
        onClick={() => onSave(event)}
        className={classNames(
          "relative bg-[#0b57d0] py-2 px-4 cursor-pointer text-white rounded-full w-fit left-full -translate-x-full invisible",
          {
            visible: isEditing,
          }
        )}
      >
        Save
      </button>
    </div>
  );
}
