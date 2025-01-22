import React, { useState } from 'react';
import './App.css';
import CustomDropdown from './component/CustomDropdown';

const App = () => {
  const [rows, setRows] = useState([{ selSingleOption: null, selMultiOption: [] }]);

  const [singleSelectOptions, setSingleSelectOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
  const [multiSelectOptions, setMultiSelectOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
  const [filterSingleSelectOptions, setFilterSingleSelectOptions] = useState(singleSelectOptions);
  const [filterMultiSelectOptions, setFilterMultiSelectOptions] = useState(multiSelectOptions);

  // Handle Dropdown Click
  const handleDropdownClick = (index, value, isMulti) => {
    const updatedRows = [...rows];
    if (!isMulti) {
      // Handling Single Select Dropdown Click
      updatedRows[index].selSingleOption = value;
      const selOpt = [...rows.map(r => r.selSingleOption), value];
      setFilterSingleSelectOptions([...singleSelectOptions.filter(v => !selOpt.includes(v))])
    } else {
      // Handling Multi Select Dropdown Click
      updatedRows[index].selMultiOption.push(value);
      setFilterMultiSelectOptions([...filterMultiSelectOptions.filter(v => v != value)])
    }
    setRows(updatedRows);
  };

  // Handle Add New Value Callback
  const handleAddNewValue = (newOption, isMulti) => {
    if (isMulti) {
      // Adding New Value in Multi-select options
      setMultiSelectOptions([...multiSelectOptions, newOption]);
      setFilterMultiSelectOptions([...filterMultiSelectOptions, newOption])
    } else {
      // Adding New Value in Single-select options
      setSingleSelectOptions([...singleSelectOptions, newOption]);
      setFilterSingleSelectOptions([...filterSingleSelectOptions, newOption])
    }
  };


  // Handle Value Remove
  const removeSelected = (index, value, isMulti) => {
    let oldRows = rows;
    if(isMulti) {
      // Removing From Selected Multi-select options
      oldRows[index].selMultiOption = oldRows[index].selMultiOption.filter(v => v != value);
      setFilterMultiSelectOptions([...filterMultiSelectOptions, value]);
    } else {
      // Removing From Selected Single-select options
      oldRows[index].selSingleOption = null;
      setFilterSingleSelectOptions([...filterSingleSelectOptions, value]);
    }
    setRows([...oldRows]);
  }

  return (
    <div className="app">
      <h1>Tables with dropdowns</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{width: "30%"}}>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr key={index}>
              <td>
                <CustomDropdown
                  options={filterSingleSelectOptions}
                  selectedValues={rows[index].selSingleOption ? [rows[index].selSingleOption] : []}
                  onClick={(value, isMulti) => handleDropdownClick(index, value, isMulti)}
                  onAddOption={handleAddNewValue}
                  isMulti={false}
                  removeSelected={(val, isMulti) => removeSelected(index, val, false)}
                />
              </td>
              <td>
                <CustomDropdown
                  options={filterMultiSelectOptions}
                  selectedValues={rows[index]?.selMultiOption || []}
                  onClick={(value, isMulti) => handleDropdownClick(index, value, isMulti)}
                  onAddOption={handleAddNewValue}
                  isMulti={true}
                  removeSelected={(val, isMulti) => removeSelected(index, val, true)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-row-button" onClick={() => setRows([...rows, {
        selSingleOption: null,
        selMultiOption: []
      }])}>
        Add New
      </button>
    </div>
  );
};

export default App;