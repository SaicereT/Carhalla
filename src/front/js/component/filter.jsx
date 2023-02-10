import React, { useState } from "react";

export const Filter = (props) => {
  return (
    <div className="filter">
      <h2>Make:</h2>
      <select
        value={props.selectedMakeOption}
        onChange={props.handleMakeFilterChange}
      >
        <option value="All">All</option>
        <option value="Toyota">Toyota</option>
        <option value="Nissan">Nissan</option>
        <option value="BMW">BMW</option>
      </select>
      <h2>Year:</h2>
      <select
        value={props.selectedYearOption}
        onChange={props.handleYearFilterChange}
      >
        <option value="All">All</option>
        <option value="2003">2003</option>
        <option value="2005">2005</option>
        <option value="1981">1981</option>
      </select>
    </div>
  );
};
