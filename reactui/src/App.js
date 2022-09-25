import React from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { FilmList } from "./components/Film";

export class App extends React.PureComponent {
  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FilmList />
      </LocalizationProvider>
    );
  }
}
