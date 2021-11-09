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

export const PageRespostas = withRouter((props) => {
	const [respostas, setRespostas] = useState([]);
	const [params, setParams] = useState({
		id: "",
		nome: "",		
	});

	function handleNew() {
		props.history.push("/respostas/0");
	}
	function handleList() {
		const query = [];		
		if (params.nome?.length) query.push(`nome=ik=${params.nome}`);	
		buscar(`/respostas?${query.join(";")}`).then(json).then(setRespostas);	
	}
	return (
		<div>
			<Panel header="Respostas">
				<PanelContent>
					<InputText label="Texto" width={6} value={params.nome} onChange={e => setParams({...params, nome: e.target.value})}/>					
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={respostas} onRowDoubleClick={e => props.history.push(`/respostas/${respostas[e.index].id}`)}>
				<Column header="ID" field="id"/>				
				<Column header="Resposta" field="nome"/>				
			</DataTable>           


		</div>
	);
});

export const EditRespostas = withRouter((props) => {
	const { id } = useParams();
	const [resposta, setResposta] = useState({
		nome: "",		
	});	
	useEffect(() => id !== "0" && buscar(`/respostas/${id}`).then(json).then(setResposta), [id]);
	const handleVoltar = () => props.history.push("/respostas");
	const handleSalvar = () => salvar("/respostas", resposta).then(handleVoltar);
	const handleExcluir = () => excluir(`/respostas/${resposta.id}`).then(handleVoltar);
	return (
		<Panel header="Resposta">
			<PanelContent>
				<InputText width={8} label="Texto" value={resposta.nome} onChange={e => setResposta({...resposta, nome: e.target.value})}/>				
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Excluir" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
			</PanelFooter>
		</Panel>
	);
});