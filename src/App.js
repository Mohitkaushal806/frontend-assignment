// App.js
import React, { useState } from 'react';
import './App.css';
import CustomDropdown from './component/CustomDropdown';

const App = () => {
  const [rows, setRows] = useState([
    {
      selSingleOption: null,
      selMultiOption: []
    }
  ]);

  const [singleSelectOptions, setSingleSelectOptions] = useState([
    'Option 1',
    'Option 2',
    'Option 3',
  ]);
  const [multiSelectOptions, setMultiSelectOptions] = useState([
    'Option 1',
    'Option 2',
    'Option 3',
  ]);
  const [filterSingleSelectOptions, setFilterSingleSelectOptions] = useState(singleSelectOptions);
  const [filterMultiSelectOptions, setFilterMultiSelectOptions] = useState(multiSelectOptions);

  const handleMultiSelectChange = (index, value, isMulti) => {
    const updatedRows = [...rows];
    if (!isMulti) {
      updatedRows[index].selSingleOption = value;
      const selOpt = [...rows.map(r => r.selSingleOption), value];
      setFilterSingleSelectOptions([...singleSelectOptions.filter(v => !selOpt.includes(v))])
    } else {
      const existingIdx = updatedRows[index].selMultiOption.findIndex(v => v == value);
      console.log('updatedRows[index].selMultiOption: ', updatedRows[index].selMultiOption);
      console.log('existingIdx: ', existingIdx);
      if (existingIdx != -1) {
        updatedRows[index].selMultiOption.splice(existingIdx, 1);
        setFilterMultiSelectOptions([...filterMultiSelectOptions, value])
      } else {
        updatedRows[index].selMultiOption.push(value);
        setFilterMultiSelectOptions([...filterMultiSelectOptions.filter(v => v != value)])
      }
    }
    setRows(updatedRows);
  };

  const handleAddNewMultiSelectOption = (newOption, isMulti) => {
    if (isMulti) {
      setMultiSelectOptions([...multiSelectOptions, newOption]);
      setFilterMultiSelectOptions([...filterMultiSelectOptions, newOption])
    } else {
      setSingleSelectOptions([...singleSelectOptions, newOption]);
      setFilterSingleSelectOptions([...filterSingleSelectOptions, newOption])
    }
  };

  const removeSelected = (index, value, isMulti) => {
    let oldRows = rows;
    if(isMulti) {
      oldRows[index].selMultiOption = oldRows[index].selMultiOption.filter(v => v != value);
      setFilterMultiSelectOptions([...filterMultiSelectOptions, value]);
    } else {
      oldRows[index].selSingleOption = null;
      setFilterSingleSelectOptions([...filterSingleSelectOptions, value]);
    }
    setRows([...oldRows]);
  }

  const renderSelectDropdown = (index, isMulti) => {
    return (
      <CustomDropdown
        options={isMulti ? filterMultiSelectOptions : filterSingleSelectOptions}
        selectedValues={isMulti ? rows[index]?.selMultiOption : rows[index].selSingleOption ? [rows[index].selSingleOption] : []}
        onChange={(value, isMulti) => handleMultiSelectChange(index, value, isMulti)}
        onAddOption={handleAddNewMultiSelectOption}
        isMulti={isMulti}
        removeSelected={(val, isMulti) => removeSelected(index, val, isMulti)}
      />
    );
  };

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
              <td>{renderSelectDropdown(index, false)}</td>
              <td>{renderSelectDropdown(index, true)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-row-button" onClick={() => setRows([...rows, {
        selSingleOption: null,
        selMultiOption: []
      }])}>
        Add New Row
      </button>
    </div>
  );
};

export default App;