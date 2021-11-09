import {Calendar as PCalendar} from "primereact/calendar";
import React from "react";
import moment from "moment";

export function Calendar(props) {
	function onChange(event) {
		props.onChange({value: moment(event.value).format("YYYY-MM-DD")});
	}
	return (
		<div className={`input-text p-col-${props.width}`}>
			<label>{props.label}</label>
			<PCalendar dateFormat="dd/mm/yy" {...props} value={moment(props.value).toDate()} onChange={onChange}/>
		</div>
	);
}
