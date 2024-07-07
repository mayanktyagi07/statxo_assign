import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './App.css';

// Login Component
const Login = ({ setLoggedInAsAdmin }) => {
  return (
    <div>
      <Button onClick={() => setLoggedInAsAdmin(false)}>Login as User</Button>
      <Button onClick={() => setLoggedInAsAdmin(true)}>Login as Admin</Button>
    </div>
  );
};

// DataTable Component
const DataTable = ({ data, setData, loggedInAsAdmin }) => {
  const handleSave = async () => {
    try {
      const promises = data.map((item) => axios.put(`http://localhost:3001/data/${item.id}`, item));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Action Name</TableCell>
            <TableCell>Action Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Impact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={row.amount}
                  onChange={(e) => {
                    const newData = data.map((item) =>
                      item.id === row.id ? { ...item, amount: e.target.value } : item
                    );
                    setData(newData);
                  }}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={row.actionName}
                  onChange={(e) => {
                    const newData = data.map((item) =>
                      item.id === row.id ? { ...item, actionName: e.target.value } : item
                    );
                    setData(newData);
                  }}
                >
                  <MenuItem value="Action1">Action1</MenuItem>
                  <MenuItem value="Action2">Action2</MenuItem>
                  <MenuItem value="Action3">Action3</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={row.actionType}
                  onChange={(e) => {
                    const newData = data.map((item) =>
                      item.id === row.id ? { ...item, actionType: e.target.value } : item
                    );
                    setData(newData);
                  }}
                >
                  <MenuItem value="Type1">Type1</MenuItem>
                  <MenuItem value="Type2">Type2</MenuItem>
                  <MenuItem value="Type3">Type3</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                {loggedInAsAdmin ? (
                  <Select
                    value={row.status}
                    onChange={(e) => {
                      const newData = data.map((item) =>
                        item.id === row.id ? { ...item, status: e.target.value } : item
                      );
                      setData(newData);
                    }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                  </Select>
                ) : (
                  row.status
                )}
              </TableCell>
              <TableCell>
                <Select
                  value={row.Impact}
                  onChange={(e) => {
                    const newData = data.map((item) =>
                      item.id === row.id ? { ...item, Impact: e.target.value } : item
                    );
                    setData(newData);
                  }}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Mid">Mid</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleSave}>Save</Button>
    </TableContainer>
  );
};

// Form Component
const AddForm = ({ fetchData }) => {
  const [newRecord, setNewRecord] = useState({ amount: '', actionName: '', actionType: '', Impact: 'Low' });

  const handleAddNewRecord = async () => {
    try {
      await axios.post('http://localhost:3001/data', newRecord);
      fetchData();
      setNewRecord({ amount: '', actionName: '', actionType: '', Impact: 'Low' });
    } catch (error) {
      console.error('Error adding new record:', error);
    }
  };

  return (
    <div>
      <h3>Add New Record</h3>
      <FormControl>
        <TextField
          label="Amount"
          type="number"
          value={newRecord.amount}
          onChange={(e) => setNewRecord({ ...newRecord, amount: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Action Name</InputLabel>
        <Select
          value={newRecord.actionName}
          onChange={(e) => setNewRecord({ ...newRecord, actionName: e.target.value })}
        >
          <MenuItem value="Action1">Action1</MenuItem>
          <MenuItem value="Action2">Action2</MenuItem>
          <MenuItem value="Action3">Action3</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Action Type</InputLabel>
        <Select
          value={newRecord.actionType}
          onChange={(e) => setNewRecord({ ...newRecord, actionType: e.target.value })}
        >
          <MenuItem value="Type1">Type1</MenuItem>
          <MenuItem value="Type2">Type2</MenuItem>
          <MenuItem value="Type3">Type3</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Impact</InputLabel>
        <Select
          value={newRecord.Impact}
          onChange={(e) => setNewRecord({ ...newRecord, Impact: e.target.value })}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Mid">Mid</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handleAddNewRecord}>Add Record</Button>
    </div>
  );
};

// Main App Component
const App = () => {
  const [data, setData] = useState([]);
  const [loggedInAsAdmin, setLoggedInAsAdmin] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/table">Data Table</Link>
            </li>
            <li>
              <Link to="/add">Add Record</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Login setLoggedInAsAdmin={setLoggedInAsAdmin} />} />
          <Route path="/table" element={<DataTable data={data} setData={setData} loggedInAsAdmin={loggedInAsAdmin} />} />
          <Route path="/add" element={<AddForm fetchData={fetchData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
