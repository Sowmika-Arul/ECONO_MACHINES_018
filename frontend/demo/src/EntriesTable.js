import React from 'react';

const EntriesTable = ({ entries, onUpdateClick, onDeleteClick }) => {
  const handleDelete = (id) => {
    onDeleteClick(id);
  };

  return (
    <div className="entries-table-container">
      <h2>Entries</h2>
      <table>
        <thead>
          <tr>
            <th>Machine Type</th>
            <th>Treatment Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.machineType}</td>
              <td>{entry.treatmentType}</td>
              <td className="action-buttons">
                <button className="update-button" onClick={() => onUpdateClick(entry)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(entry._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Inline CSS styles */}
      <style jsx>{`
        .entries-table-container {
          margin-top: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
          background-color: #fff;
        }

        th, td {
          padding: 12px 15px;
          text-align: left;
        }

        th {
          background-color: #007bff;
          color: white;
        }

        tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .update-button, .delete-button {
          padding: 8px 12px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .delete-button {
          background-color: #dc3545;
        }

        .update-button:hover {
          background-color: #218838;
        }

        .delete-button:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
};

export default EntriesTable;
