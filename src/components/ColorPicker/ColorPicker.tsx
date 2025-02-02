import { MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { colors } from "../../constants/colors"

interface ColorPickerProps {
  selectedColor?: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker(props: ColorPickerProps): JSX.Element {
  const { selectedColor = '#039ae5', onColorChange } = props;

  const handleChange = (event: SelectChangeEvent) => {
    onColorChange(event.target.value);
  };

  return (
    <div>
      <Select
        variant="filled"
        value={selectedColor}
        size="small"
        onChange={handleChange}
        MenuProps={{
          classes: {
            list: "grid grid-cols-2 gap-1",
          },
        }}
      >
        {colors.map(({ hex, name }) => (
          <MenuItem title={name} value={hex} className="!p-[6px]">
            <div style={{ background: hex }} className="rounded-full w-4 h-4" />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
