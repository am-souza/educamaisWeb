import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import React, {useEffect, useState} from "react";
import {Column} from "primereact/column/column.cjs";
import { Toast } from 'primereact/toast';
import {Spacer} from "../components/Spacer";
import {buscar, excluir, json, salvar} from "../utilidades/Fetch";
import {InputText} from "../components/InputText";
import {PanelContent} from "../components/PanelContent";
import {useParams, withRouter} from "react-router-dom";
import {Button} from "primereact/button";
import {PanelFooter} from "../components/PanelFooter";
import {AutoComplete} from "../components/AutoComplete";
import {Dropdown} from "../components/Dropdown";
import {InputNumber} from "../components/InputNumber";
import {Calendar} from "../components/Calendar";
import {TabPanel, TabView} from "primereact/tabview";
import { Image } from 'primereact/image';
import na from '../img/naruto.jpg';
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
			<div className="p-col-5">	
				<img src={avatar} alt="Sem Texto" width="250"/>							
			</div>
		</div>
		
	);
});
