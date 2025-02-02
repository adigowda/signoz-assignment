import { MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ColorPickerProps {
  selectedColor?: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker(props: ColorPickerProps): JSX.Element {
  const { selectedColor = '#039ae5', onColorChange } = props;
  const colors = [
    {
      hex: "#e67c73",
      name: "Flamingo",
    },
    {
      hex: "#d50000",
      name: "Tomato",
    },
    {
      hex: "#f4501e",
      name: "Tangerine",
    },
    {
      hex: "#33b679",
      name: "Sage",
    },
    {
      hex: "#039ae5",
      name: "Peacock",
    },
    {
      hex: "#7987cb",
      name: "Lavender",
    },
    {
      hex: "#616161",
      name: "Graphite",
    },
    {
      hex: "#f6bf26",
      name: "Banana",
    },
    {
      hex: "#0b8044",
      name: "Basil",
    },
    {
      hex: "#3f51b5",
      name: "Blueberry",
    },
    {
      hex: "#8d24aa",
      name: "Grape",
    },
  ];

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
