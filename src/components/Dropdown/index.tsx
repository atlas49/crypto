import React, { ChangeEvent } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Currency } from '../../state/context';
import style from './style.module.scss';

interface IDropdown {
  data: Currency[];
  onChange: (value: string) => void;
  selectedData: Currency | null;
}

// const Dropdown: React.FC<IDropdown> = ({ data, onChange, selectedData }) => {
//   return (
//     <select onChange={onChange} value={selectedData?.code} className={style.select}>
//       {data.map((curr) => (
//         <option key={curr.code} value={curr.code}>
//           {curr.code}
//         </option>
//       ))}
//     </select>
//   );
// };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      padding: '12px 0px',
    },
  },
};

const Dropdown: React.FC<IDropdown> = ({ data, onChange, selectedData }) => {
  return (
    <FormControl
      sx={{ m: 1, width: 300, mt: 3 }}
      style={{ width: '150px', color: 'white', margin: '0px', height: '38px', backgroundColor: '#302935', borderRadius: '8px' }}
    >
      <Select
        displayEmpty
        value={selectedData?.code}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        style={{ color: 'white', width: '100%' }}
      >
        {data.map((name) => (
          <MenuItem key={name.code} value={name.code}>
            {name.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
