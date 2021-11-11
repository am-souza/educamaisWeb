import {DataTable} from "primereact/datatable";
import React, {useState} from "react";
import {Column} from "primereact/column/column.cjs";
import {withRouter} from "react-router-dom";
import avatar from "../img/avatar/1.png";




export const PageHome = withRouter((props) => {

	const [usuarios, setUsuarios] = useState([]);
	
	return (
		<div className="p-grid">			
			<div className="p-col-7">
				<DataTable emptyMessage="Nenhum registro encontrado" value="" onRowDoubleClick={e => props.history.push(`/usuarios/${usuarios[e.index].id}`)}>
					<Column header="Login" field="username"/>
					<Column header="Nome" field="nome"/>
					<Column header="Perfil" field="perfil"/>				
					<Column header="Email" field="email"/>
				</DataTable>
			</div>		
			<div className="p-col-3 p-mt-6 p-offset-1">	
				<img src={avatar} alt="Sem Texto" width="250"/>							
			</div>
		</div>
		
	);
});
