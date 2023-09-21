import React, { ChangeEvent } from 'react';
import { Currency } from '../../state/context';

interface IDropdown {
  data: Currency[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedData: Currency | null;
}

const Dropdown: React.FC<IDropdown> = ({ data, onChange, selectedData }) => {
  console.log(selectedData);
  return (
    <select onChange={onChange} value={selectedData?.code}>
      {data.map((curr) => (
        <option key={curr.code} value={curr.code}>
          {curr.code}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
