import {
  DatePicker as MUIDatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export const DatePicker = (props: DatePickerProps<Dayjs>) => {
  return (
    <MUIDatePicker
      slotProps={{
        textField: { size: "small" },
        popper: { className: "date-popover" },
      }}
      format="ddd, D MMM"
      {...props}
    />
  );
};
