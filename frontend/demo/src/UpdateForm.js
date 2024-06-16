import React, { useState } from 'react';
import axios from 'axios';

const UpdateForm = ({ entry, onUpdate }) => {
  const [machineType, setMachineType] = useState(entry.machineType);
  const [treatmentType, setTreatmentType] = useState(entry.treatmentType);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/update/${entry._id}`, {
        machineType,
        treatmentType
      });
      alert(response.data.message);
      onUpdate(); // Refresh entries after update
    } catch (error) {
      console.error('Error updating entry:', error);
      alert('Failed to update entry. Please try again.');
    }
  };

  const styles = {
    formContainer: {
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px',
      margin: '20px auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      marginBottom: '20px',
      textAlign: 'center',
      color: '#333',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.heading}>Update Entry</h3>
      <label style={styles.label}>Machine Type:</label>
      <input
        type="text"
        value={machineType}
        onChange={(e) => setMachineType(e.target.value)}
        style={styles.input}
      />
      <label style={styles.label}>Treatment Type:</label>
      <input
        type="text"
        value={treatmentType}
        onChange={(e) => setTreatmentType(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={handleUpdate}
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        Update Entry
      </button>
    </div>
  );
};

export default UpdateForm;
