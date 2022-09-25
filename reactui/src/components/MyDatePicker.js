import React from "react";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export class MyDatePicker extends React.PureComponent {
  handleChange = (newVal) => {
    const newDate = newVal.toISOString().split("T")[0];
    this.props.onChange(newDate);
  }

  render() {
    return (
      <DatePicker
        open
        value={this.props.value}
        renderInput={this.props.renderInput}
        onChange={this.handleChange}
      />
    );
  }
}
