import React from 'react';

interface PageSizeSelectorProps {
  pageSize: number;
  rowsPerPageOptions: number[];
  onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, rowsPerPageOptions, onPageSizeChange }) => (
  <div className="flex items-center mt-4 bg-dark-1 p-4 rounded">
    <label htmlFor="page-size" className="mr-2 text-white">Page Size:</label>
    <select
      id="page-size"
      value={pageSize}
      onChange={onPageSizeChange}
      className="p-2 border rounded bg-dark-2 text-white"
    >
      {rowsPerPageOptions.map((size) => (
        <option key={size} value={size} className="bg-dark-2 text-white">
          {size}
        </option>
      ))}
    </select>
  </div>
);

export default PageSizeSelector;
