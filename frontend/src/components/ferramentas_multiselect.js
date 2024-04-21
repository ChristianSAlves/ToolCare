import React from "react";
import Select from "react-select";

const options = [
    {value: "teste1", label:"teste1"},
    {value: "teste2", label:"teste2"},
    {value: "teste3", label:"teste3"},
    {value: "teste4", label:"teste4"}
];

export const MultiSelect = () => {
    return(
        <>
        <Select isMulti options={options}/>
        </>
    )
}

