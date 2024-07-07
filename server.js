const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let data = [
  { id: 1, quantity: 100, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status: 'Pending', Impact: 'High' },
  { id: 2, quantity: 10, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type2', actionNumber: '001', actionName: 'Action2', status: 'Pending', Impact: 'Mid' },
  { id: 3, quantity: 120, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status: 'Pending', Impact: 'Low' },
  { id: 4, quantity: 132, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type3', actionNumber: '001', actionName: 'Action3', status: 'Pending', Impact: 'High' },
  { id: 5, quantity: 10, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type2', actionNumber: '001', actionName: 'Action3', status: 'Pending', Impact: 'Low' },
];

app.get('/data', (req, res) => {
  res.json(data);
});

app.post('/data', (req, res) => {
  const newRecord = req.body;
  newRecord.id = data.length + 1;
  newRecord.postingYear = new Date().getFullYear();
  newRecord.postingMonth = new Date().toLocaleString('default', { month: 'long' });
  data.push(newRecord);
  res.status(201).json(newRecord);
});

app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  const updatedRecord = req.body;
  data = data.map(item => (item.id === parseInt(id) ? updatedRecord : item));
  res.json(updatedRecord);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
