import React from 'react';
import MultipleChoice from "../Components/MultibleChoise";
import "./MC_Container.css";

const MC_Container = ({name,headline, options, anzahl, selectedOptions, onSelectionChange}) => {
  
  return (
    <div>
      <h2 className='MC_head'>{headline}</h2>
      <MultipleChoice
        name={name}
        options={options}
        maxSelection={anzahl}
        selectedOptions={selectedOptions} // Übergabe der ausgewählten Optionen
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
};

export default MC_Container;
