import React from "react";
import {withRouter} from "react-router-dom";
import avatar from "../img/avatar/17.png";



export const PageLoja = withRouter((props) => {
	
		return (
		<div>	Store!		 
			<img src={avatar} alt="Sem Texto" width="250"/>;		
        </div>

		
	);
});