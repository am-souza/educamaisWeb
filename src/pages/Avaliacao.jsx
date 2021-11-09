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

function newAvaliacao() {
	return {
		_key: Math.random(),
		id: null,
		atividade: null,
		turma: null,
		inicio: null,
		fim: null
	};
}

export const PageAvaliacao = withRouter((props) => {
	const [avaliacoes, setAvaliacoes] = useState([]);
	const [params, setParams] = useState({
		identif: "",
		texto: "",		
	});
	function handleNew() {
		props.history.push("/avaliacoes/0");
	}
	function handleList() {
		const query = [];
		if (params.identif?.length) query.push(`id=ik=${params.identif}`);
		if (params.texto?.length) query.push(`texto==${params.texto}`);
		buscar(`/avaliacoes?${query.join(";")}`).then(json).then(setAvaliacoes);
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
			<DataTable emptyMessage="Nenhum registro encontrado" value={avaliacoes} onRowDoubleClick={e => props.history.push(`/avaliacoes/${avaliacoes[e.index].id}`)}>
				<Column header="ID" field="ID"/>
				<Column header="Texto" field="texto"/>				
			</DataTable>
		</div>
	);
});

export const EditAvaliacao = withRouter((props) => {
	const { id } = useParams();
	const [avaliacao, setAvaliacao] = useState(newAvaliacao());
	useEffect(() => id !== "0" && buscar(`/avaliacoes/${id}`).then(json).then(setAvaliacao), [id]);
	const handleVoltar = () => props.history.push("/avaliacoes");
	const handleSalvar = () => salvar("/avaliacoes", avaliacao).then(handleVoltar);
	const handleExcluir = () => excluir("/avaliacoes").then(handleVoltar);
	return (
		<Panel header="Avaliação">
			<PanelContent>
				<InputText width={12} label="Avaliacao" value={avaliacao.texto} onChange={e => setAvaliacao({...avaliacao, texto: e.target.value})}/>
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Excluir" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
			</PanelFooter>
		</Panel>
	);
});
