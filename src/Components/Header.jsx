import React from "react";
import DateInput from "./Date";

export default function Header({head,handleChange}){
    return(        
        <div className="CardHead">
            <h2>{head}</h2>
            <DateInput onChange={handleChange} />
        </div>
  );
}