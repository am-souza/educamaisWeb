import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import React, {useEffect, useState} from "react";
import {Column} from "primereact/column";
import {Spacer} from "../components/Spacer";
import {buscar, excluir, json, salvar} from "../utilidades/Fetch";
import {InputText} from "../components/InputText";
import {PanelContent} from "../components/PanelContent";
import {useParams, withRouter} from "react-router-dom";
import {Button} from "primereact/button";
import {PanelFooter} from "../components/PanelFooter";

function newAtividade() {
	return {
		_key: Math.random(),
		id: null,
		dtInicio: null,
		dtFim: null,
		nome: "",
		questoes: []
	};
}

export const PageAtividade = withRouter((props) => {
	const [atividades, setAtividades] = useState([]);
	const [params, setParams] = useState({
		texto: "",		
	});

	function handleNew() {
		props.history.push("/atividades/0");
	}
	function handleList() {
		const query = [];
		if (params.identif?.length) query.push(`id=ik=${params.identif}`);
		if (params.texto?.length) query.push(`texto==${params.texto}`);
		buscar(`/atividades?${query.join(";")}`).then(json).then(setAtividades);
	}
	return (
		<div>
			<Panel header="Atividades">
				<PanelContent>
					<InputText label="ID" width={6} value={params.identif} onChange={e => setParams({...params, identif: e.target.value})}/>					
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={atividades} onRowDoubleClick={e => props.history.push(`/atividades/${atividades[e.index].id}`)}>
				<Column header="ID" field="ID"/>
				<Column header="Texto" field="texto"/>				
			</DataTable>
		</div>
	);
});

export const EditAtividade = withRouter((props) => {
	const { id } = useParams();
	const [atividade, setAtividade] = useState(newAtividade());
	useEffect(() => id !== "0" && buscar(`/atividades/${id}`).then(json).then(setAtividade), [id]);
	const handleVoltar = () => props.history.push("/atividades");
	const handleSalvar = () => salvar("/atividades", atividade).then(handleVoltar);
	const handleExcluir = () => excluir(`/atividades/${atividade.id}`).then(handleVoltar);
	return (
		<Panel header="Atividade">
			<PanelContent>
				<InputText width={12} label="Atividade" value={atividade.texto} onChange={e => setAtividade({...atividade, texto: e.target.value})}/>
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Excluir" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
			</PanelFooter>
		</Panel>
	);
});
