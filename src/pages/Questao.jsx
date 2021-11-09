import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import React, {useEffect, useState} from "react";
import {Column} from "primereact/column/column.cjs";
import {Spacer} from "../components/Spacer";
import {buscar, excluir, json, salvar} from "../utilidades/Fetch";
import {InputText} from "../components/InputText";
import {PanelContent} from "../components/PanelContent";
import {useParams, withRouter} from "react-router";
import {Button} from "primereact/button";
import {PanelFooter} from "../components/PanelFooter";
import {Checkbox} from "primereact/checkbox";
import {byKeyOrId} from "../utilidades/FilterUtils";

export function newQuestao() {
	return {
		_key: Math.random(),
		id: null,
		texto: "",
		escolhas: []
	};
}

export function newQuestaoEscolha() {
	return {
		_key: Math.random(),
		id: null,
		texto: "",
		correta: false
	};
}

export const PageQuestao = withRouter((props) => {
	const [questoes, setQuestoes] = useState([]);
	const [params, setParams] = useState({
		id: "",
		texto: "",
	});
	function handleNew() {
		props.history.push("/questoes/0");
	}
	function handleList() {
		const query = [];
		if (params.id?.length) query.push(`id=ik=${params.id}`);
		if (params.texto?.length) query.push(`texto==${params.texto}`);
		buscar(`/questoes?${query.join(";")}`).then(json).then(setQuestoes);
	}
	return (
		<div>
			<Panel header="Questões">
				<PanelContent>
					<InputText label="ID" width={6} value={params.identif} onChange={e => setParams({...params, id: e.target.value})}/>					
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={questoes} onRowDoubleClick={e => props.history.push(`/questoes/${questoes[e.index].id}`)}>
				<Column header="ID" field="id"/>
				<Column header="Texto" field="texto"/>				
			</DataTable>
		</div>
	);
});

export const EditQuestao = withRouter((props) => {
	const {id} = useParams();
	const [questao, setQuestao] = useState(newQuestao());
	useEffect(() => id !== "0" && buscar(`/questoes/${id}`).then(json).then(setQuestao), [id]);
	const handleVoltar = () => props.history.push("/questoes");
	const handleSalvar = () => salvar("/questoes", questao).then(handleVoltar);
	const handleExcluir = () => excluir(`/questoes/${questao.id}`).then(handleVoltar);
	return (
		<Panel header="Questao">
			<PanelContent>
				<InputText width={12} label="Pergunta" value={questao.texto} onChange={e => setQuestao({...questao, texto: e.target.value})}/>
				<DataTable rows={5} value={questao.escolhas} paginator paginatorLeft={
					<Button icon="pi pi-plus" onClick={() => setQuestao({...questao, escolhas: [...questao.escolhas, newQuestaoEscolha()]})}/>
				}>
					<Column header="Resposta" body={r => (
						<InputText value={r.texto} onChange={e => {
							questao.escolhas.filter(q => byKeyOrId(q, r)).forEach(r => r.texto = e.target.value);
							setQuestao({...questao});
						}}/>
					)}/>
					<Column header="Correta?" body={r => (
						<Checkbox checked={r.correta} onChange={() => {
							questao.escolhas.filter(q => byKeyOrId(q, r)).forEach(r => r.correta = !r.correta);
							setQuestao({...questao});
						}}/>
					)}/>
					<Column header="Remover" body={r => (
						<Button icon="pi pi-times" onClick={() => setQuestao({...questao, escolhas: questao.escolhas.filter(e => e.id !== r.id)})}/>
					)}/>
				</DataTable>
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Delete" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
			</PanelFooter>
		</Panel>
	);
});
