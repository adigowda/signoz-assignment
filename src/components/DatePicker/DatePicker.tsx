import {
  DatePicker as MUIDatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export const DatePicker = (props: DatePickerProps<Dayjs>) => {
  return (
    <MUIDatePicker
      slotProps={{
        popper: { className: "date-popover" },
      }}
      format="dddd, D MMM"
      {...props}
    />
  );
};
