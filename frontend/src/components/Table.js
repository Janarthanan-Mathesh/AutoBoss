import React from 'react';

const Table = ({ headers, data, onEdit, onDelete }) => {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx} className="border border-gray-300 p-2">{header}</th>
          ))}
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {headers.map((header) => (
              <td key={header} className="border border-gray-300 p-2">{row[header.toLowerCase().replace(' ', '_')]}</td>
            ))}
            <td className="border border-gray-300 p-2">
              <button onClick={() => onEdit(row)} className="mr-2 bg-blue-500 text-white px-2 py-1">Edit</button>
              <button onClick={() => onDelete(row._id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;