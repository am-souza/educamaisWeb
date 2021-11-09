import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import React, {useEffect, useState} from "react";
import {Column} from "primereact/column/column.cjs";
import {Spacer} from "../components/Spacer";
import {buscar, excluir, json, salvar} from "../utilidades/Fetch";
import {InputText} from "../components/InputText";
import {PanelContent} from "../components/PanelContent";
import {useParams, withRouter} from "react-router-dom";
import {Button} from "primereact/button";
import {PanelFooter} from "../components/PanelFooter";

export const PageCurso = withRouter((props) => {
	const [cursos, setCursos] = useState([]);
	const [params, setParams] = useState({
		id: "",
		nome: "",		
	});
	function handleNew() {
		props.history.push("/cursos/0");
	}
	function handleList() {
		const query = [];
		//if (params.id?.length) query.push(`id=ik=${params.id}`);
		//if (params.texto?.length) query.push(`nome==${params.texto}`);
		//buscar(`/cursos?${query.join(";")}`).then(json).then(setCursos);

		if (params.nome?.length) query.push(`nome=ik=${params.nome}`);
		buscar(`/cursos?${query.join(";")}`).then(json).then(setCursos);
	}
	return (
		<div>
			<Panel header="Cursos">
				<PanelContent>
					<InputText label="Nome do Curso" width={6} value={params.nome} onChange={e => setParams({...params, nome: e.target.value})}/>					
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={cursos} onRowDoubleClick={e => props.history.push(`/cursos/${cursos[e.index].id}`)}>
				<Column header="ID" field="id"/>				
				<Column header="Nome" field="nome"/>
			</DataTable>  
		</div>
	);
});

export const EditCurso = withRouter((props) => {
	const { id } = useParams();
	const [curso, setCurso] = useState({
		nome: "",		
	});	
	useEffect(() => id !== "0" && buscar(`/cursos/${id}`).then(json).then(setCurso), [id]);
	const handleVoltar = () => props.history.push("/cursos");
	const handleSalvar = () => salvar("/cursos", curso).then(handleVoltar);
	const handleExcluir = () => excluir(`/cursos/${curso.id}`).then(handleVoltar);
	return (
		<Panel header="Curso">
			<PanelContent>
				<InputText width={12} label="Nome" value={curso.nome} onChange={e => setCurso({...curso, nome: e.target.value})}/>
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Delete" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
			</PanelFooter>
		</Panel>
	);
});
