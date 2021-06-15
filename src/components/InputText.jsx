import React from "react";
import { InputText as PInputText } from "primereact/inputtext";
import "./Components.scss";

export function InputText(props) {
	return (
		<div className={`input-text p-col-${props.width}`}>
			<label>{props.label}</label>
			<PInputText {...props}/>
		</div>
	);
}
