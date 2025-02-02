import "./App.css";
import { Calendar } from "./components/Calendar/Calendar";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Calendar />
      </LocalizationProvider>
    </>
  );
}

export default App;
