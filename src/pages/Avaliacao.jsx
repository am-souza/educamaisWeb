import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Column } from "primereact/column/column.cjs";
import { Spacer } from "../components/Spacer";
import { buscar, json, salvar, excluir } from "../utilidades/Fetch";
import { InputText } from "../components/InputText";
import { PanelContent } from "../components/PanelContent";
import { useParams, withRouter, Route } from "react-router";
import { Button } from "primereact/button";
import { PanelFooter } from "../components/PanelFooter";
import { Dropdown } from "../components/Dropdown";


export const PageAvaliacao = withRouter((props) => {
	const [questoes, setQuestoes] = useState([]);
	const [params, setParams] = useState({
		identif: "",
		texto: "",		
	});

	function handleNew() {
		props.history.push("/questoes/0");
	}
	function handleList() {
		const query = [];
		if (params.identif?.length) query.push(`id=ik=${params.identif}`);
		if (params.texto?.length) query.push(`texto==${params.texto}`);
		buscar(`/questoes?${query.join(";")}`).then(json).then(setQuestoes);
	}
	return (
		<div>
			<Panel header="Avaliações">
				<PanelContent>
					<InputText label="ID" width={6} value={params.identif} onChange={e => setParams({...params, identif: e.target.value})}/>					
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={questoes} onRowDoubleClick={e => props.history.push(`/questoes/${questoes[e.index].id}`)}>
				<Column header="ID" field="ID"/>
				<Column header="Texto" field="texto"/>				
			</DataTable>
		</div>
	);
});

export const EditQuestao = withRouter((props) => {
	const { id } = useParams();
	const [questao, setQuestao] = useState({
		identif: "",
		texto: "",
	});
	useEffect(() => id !== "0" && buscar(`/questoes/${id}`).then(json).then(setQuestao), [id]);
	const handleVoltar = () => props.history.push("/questoes");
	const handleSalvar = () => salvar("/questoes", questao).then(handleVoltar);
	const handleExcluir = () => excluir("/questoes").then(handleVoltar);
	return (
		<Panel header="Questao">
			<PanelContent>
				<InputText width={12} label="Questao" value={questao.texto} onChange={e => setQuestao({...questao, texto: e.target.value})}/>
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Delete" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
			</PanelFooter>
		</Panel>
	);
});

