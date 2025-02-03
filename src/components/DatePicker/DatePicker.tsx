import {
  DatePicker as MUIDatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export const DatePicker = (props: DatePickerProps<Dayjs>) => {
  return (
    <MUIDatePicker
      slotProps={{
        textField: { size: "small", variant: "filled" },
        popper: { className: "date-popover" },
      }}
      format="dddd, D MMM"
      {...props}
    />
  );
};
