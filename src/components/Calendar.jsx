import {Calendar as PCalendar} from "primereact/calendar";
import React from "react";
import moment from "moment";

export function Calendar(props) {
	function onChange(event) {
		if (props.showTime) {
			props.onChange({value: moment(event.value).format("YYYY-MM-DDTHH:mm:ss")});
		} else {
			props.onChange({value: moment(event.value).format("YYYY-MM-DD")});
		}
	}
	return (
		<div className={`input-text p-col-${props.width}`}>
			<label>{props.label}</label>
			<PCalendar dateFormat="dd/mm/yy" hourFormat="24" {...props} value={moment(props.value).toDate()} onChange={onChange}/>
		</div>
	);
}
