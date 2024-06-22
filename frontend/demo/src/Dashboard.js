import React, { useState, useEffect } from 'react';
import AddForm from './AddForm';
import EntriesTable from './EntriesTable';
import UpdateForm from './UpdateForm';
import axios from 'axios';

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Function to fetch entries from backend
  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:4000/entries');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []); // Fetch entries on initial render

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleAddFormClose = () => {
    setShowForm(false);
    fetchEntries(); // Refresh entries after adding a new one
  };

  const handleUpdateClick = (entry) => {
    setSelectedEntry(entry);
    setShowUpdateForm(true);
  };

  const handleUpdateFormClose = () => {
    setShowUpdateForm(false);
    setSelectedEntry(null);
    fetchEntries(); // Refresh entries after updating
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${id}`);
      setEntries(entries.filter(entry => entry._id !== id)); // Update state to remove deleted entry
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Machines and Treatments</h1>
      <button className="add-button" onClick={handleAddClick}>Add New Entry</button>
      {showForm && (
        <div className="form-container">
          <AddForm onAdd={handleAddFormClose} />
        </div>
      )}
      {showUpdateForm && selectedEntry && (
        <UpdateForm entry={selectedEntry} onUpdate={handleUpdateFormClose} />
      )}
      <EntriesTable entries={entries} onUpdateClick={handleUpdateClick} onDeleteClick={handleDelete} />
      
      {/* Inline CSS styles */}
      <style jsx>{`
        .dashboard-container {
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        h1 {
          text-align: center;
          color: #333;
        }

        .add-button {
          display: block;
          margin: 20px auto;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .add-button:hover {
          background-color: #0056b3;
        }

        .form-container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
          max-width: 600px;
          margin: 20px auto;
        }

        .form-container form {
          display: flex;
          flex-direction: column;
        }

        .form-container label {
          margin-bottom: 5px;
          font-weight: bold;
        }

        .form-container input {
          margin-bottom: 15px;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .form-container button {
          padding: 10px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        .form-container button:hover {
          background-color: #218838;
        }

        .entries-table button.update-button {
          padding: 5px 10px;
          background-color: #ffc107;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          margin-right: 10px; /* Add margin to the right of the update button */
        }

        .entries-table button.update-button:hover {
          background-color: #e0a800;
        }

        .entries-table button.delete-button {
          padding: 5px 10px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }

        .entries-table button.delete-button:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
