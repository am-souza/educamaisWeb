import React from "react";
import "./Components.scss";

export function ImageContent(props) {
	return (
		<div >
			<img src='{...props}' class="img-fluid" alt="Imagem responsiva"></img>
		</div>
	);
}