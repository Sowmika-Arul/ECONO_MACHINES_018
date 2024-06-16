import React, { useState, useEffect } from 'react';
import EntriesTable from './EntriesTable1';
import axios from 'axios';

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);

  // Function to fetch entries from backend
  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:4000/entries');
      setEntries(response.data);
      setFilteredEntries(response.data); // Initially show all entries
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []); // Fetch entries on initial render

  // Filter entries based on search term
  useEffect(() => {
    const results = entries.filter(entry =>
      entry.machineType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.treatmentType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(results);
  }, [searchTerm, entries]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <EntriesTable entries={filteredEntries} />
      {/* Inline CSS styles */}
      <style jsx>{`
        .dashboard-container {
          padding: 40px;  /* Increase padding for more space */
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 1200px;  /* Increase max-width for larger dashboard */
          margin: 0 auto;
        }

        h1 {
          text-align: center;
          color: #333;
        }

        .search-container {
          margin-bottom: 20px;
          text-align: center;
        }

        .search-container input {
          width: 80%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          font-size: 16px;
        }

        .search-container input:focus {
          outline: none;
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
