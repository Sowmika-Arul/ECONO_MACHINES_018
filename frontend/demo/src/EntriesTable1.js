import React from 'react';

function EntriesTable({ entries }) {
  return (
    <div className="entries-table-container">
      <table>
        <thead>
          <tr>
            <th>Machine Type</th>
            <th>Treatment Type</th>
          </tr>
        </thead>
        <tbody>
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.machineType}</td>
                <td>{entry.treatmentType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No entries found</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Inline CSS styles */}
      <style jsx>{`
        .entries-table-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        table {
          width: 100%;
          max-width: 800px;
          border-collapse: collapse;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        th, td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #4CAF50;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        tr:hover {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
}

export default EntriesTable;
