'use client';

import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { 
    field: 'firstName', 
    headerName: 'First name', 
    width: 130,
    editable: true 
  },
  { 
    field: 'lastName', 
    headerName: 'Last name', 
    width: 130,
    editable: true 
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
    editable: true
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const initialRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [open, setOpen] = React.useState(false);
  const [newRow, setNewRow] = React.useState({
    firstName: '',
    lastName: '',
    age: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRow({ firstName: '', lastName: '', age: '' });
  };

  const handleAdd = () => {
    const id = Math.max(...rows.map(row => row.id)) + 1;
    setRows([...rows, { ...newRow, id, age: Number(newRow.age) || null }]);
    handleClose();
  };

  const handleCellEdit = (params) => {
    setRows(rows.map(row => 
      row.id === params.id ? { ...row, [params.field]: params.value } : row
    ));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="contained" onClick={handleClickOpen} sx={{ alignSelf: 'flex-end' }}>
        Add New Entry
      </Button>
      
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          onCellEditStop={handleCellEdit}
          slots={{ toolbar: GridToolbar }}
          sx={{ border: 0 }}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Entry</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="First Name"
              value={newRow.firstName}
              onChange={(e) => setNewRow({ ...newRow, firstName: e.target.value })}
            />
            <TextField
              label="Last Name"
              value={newRow.lastName}
              onChange={(e) => setNewRow({ ...newRow, lastName: e.target.value })}
            />
            <TextField
              label="Age"
              type="number"
              value={newRow.age}
              onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
