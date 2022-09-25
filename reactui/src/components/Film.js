import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import { styled, experimental_sx as sx } from "@mui/system";

import * as services from "~/src/services";

import { MyDatePicker } from "./MyDatePicker";


export class FilmList extends React.PureComponent {
  static columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    {
      field: 'name',
      headerName: 'Film Name',
      width: 250,
      editable: true,
    },
    {
      field: 'created',
      headerName: 'Created',
      width: 150,
      editable: true,
      type: "date",
      renderEditCell: (params) => {
        // const { GridEditDateInput } = this;
        const { api, id, field, value } = params;

        return (
          <MyDatePicker
            value={value}
            renderInput={(options) => <TextField {...options} />}
            onChange={(newValue) => {
              api.setEditCellValue({ id, field, value: newValue });
            }}
          />
        );
      },
    },
    {
      field: 'actors',
      headerName: 'Actors',
      width: 110,
      editable: true,
    },
  ];

  static DataGridComponent = styled(DataGrid)(sx({
    height: "100vh",
  }));

  static gridExperimentalFeatures = {
    newEditingApi: true,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      films: [],
      count: 0,
      loading: true,
    };
  }

  async componentDidMount() {
    const data = await services.film.list();
    this.setState({
      films: data.results,
      count: data.count,
      loading: false,
    });
  }

  processRowUpdate = async (newRow) => {
    const { id, ...other } = newRow;
    return await services.film.update(id, other);
  }

  onProcessRowUpdateError = (error) => {
    console.error(error)
  }


  render() {
    const { DataGridComponent, gridExperimentalFeatures, columns } = this.constructor;
    return (
      <DataGridComponent
        columns={columns}
        rows={this.state.films}
        processRowUpdate={this.processRowUpdate}
        onProcessRowUpdateError={this.onProcessRowUpdateError}
        experimentalFeatures={gridExperimentalFeatures}
        loading={this.state.loading}
      />
    )
  }
}
