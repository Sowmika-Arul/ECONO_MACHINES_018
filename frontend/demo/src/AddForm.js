import React, { useState } from 'react';
import axios from 'axios';

function AddForm({ onAdd }) {
  const [machineType, setMachineType] = useState('');
  const [treatmentType, setTreatmentType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/add', { machineType, treatmentType });
      setMessage(response.data.message);
      if (response.status === 200) {
        onAdd(); // Refresh the list or handle the add event
      }
    } catch (error) {
      setMessage('Failed to add entry');
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Machine Type:</label>
          <input
            type="text"
            value={machineType}
            onChange={(e) => setMachineType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Treatment Type:</label>
          <input
            type="text"
            value={treatmentType}
            onChange={(e) => setTreatmentType(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddForm;
