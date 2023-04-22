import React, { useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function App() {
  const [selectedOption, setSelectedOption] = useState('chocolate');

  return (
    <div className="App">
      <CreatableSelect
        isClearable={true}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}