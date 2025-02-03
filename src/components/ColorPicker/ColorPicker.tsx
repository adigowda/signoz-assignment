import { MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { EVENT_COLORS, DEFAULT_EVENT_COLOR } from "../../constants/colors";
import { IColorPickerProps } from "./ColorPicker.types";

export function ColorPicker(props: IColorPickerProps): JSX.Element {
  const { selectedColor = DEFAULT_EVENT_COLOR, onColorChange } = props;

  const handleChange = (event: SelectChangeEvent) => {
    onColorChange(event.target.value);
  };

  return (
    <div>
      <Select
        value={selectedColor}
        size="small"
        onChange={handleChange}
        MenuProps={{
          classes: {
            list: "grid grid-cols-2 gap-1 dropdown-popover",
          },
        }}
      >
        {EVENT_COLORS.map(({ hex, name }) => (
          <MenuItem key={hex} title={name} value={hex} className="!p-[6px]">
            <div
              style={{ background: hex }}
              className="mt-1 rounded-full w-4 h-4"
            />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
