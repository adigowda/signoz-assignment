import {
  TimePicker as MUITimePicker,
  TimePickerProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export const TimePicker = (props: TimePickerProps<Dayjs>) => {
  return (
    <MUITimePicker
      format="h:ma"
      slotProps={{
        textField: { size: "small", variant: "filled" },
        popper: { className: "time-popover" },
      }}
      sx={{ width: 140 }}
      {...props}
    />
  );
};
