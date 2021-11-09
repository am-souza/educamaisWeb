import React from "react";
import { AutoComplete as PAutoComplete } from "primereact/autocomplete";

export function AutoComplete(props) {
    return (
        <div className={`auto-complete p-col-${props.width}`}>
			<label>{props.label}</label>
			<PAutoComplete {...props}/>
		</div>
    );
}
