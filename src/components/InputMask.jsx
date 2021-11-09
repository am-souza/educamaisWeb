import React from "react";
import { InputMask as PInputMask } from "primereact/inputmask";
import "./Components.scss";

export function InputMask(props) {
	return (
		<div className={`input-text p-col-${props.width}`}>
			<label>{props.label}</label>
			<PInputMask {...props}/>
		</div>
	);
}
