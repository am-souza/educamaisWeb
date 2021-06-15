import React from "react";
import { Dropdown as PDropdown } from "primereact/dropdown";
import "./Components.scss";

export function Dropdown(props) {
	return (
		<div className={`drop-down p-col-${props.width}`}>
			<label>{props.label}</label>
			<PDropdown {...props}/>
		</div>
	);
}
