import React from "react";
import { InputNumber as PInputNumber } from "primereact/inputnumber";
import "./Components.scss";

export function InputNumber(props) {
	return (
		<div className={`input-text p-col-${props.width}`}>
			<label>{props.label}</label>
			<PInputNumber {...props}/>
		</div>
	);
}
