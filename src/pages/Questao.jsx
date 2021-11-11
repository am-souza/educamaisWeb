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
import {Checkbox} from "primereact/checkbox";
import {byKeyOrId} from "../utilidades/FilterUtils";
import {AutoComplete} from "../components/AutoComplete";

export function newQuestao() {
	return {
		_key: Math.random(),
		id: null,
		texto: "",
		materia: null,
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
		materia:"",
	});
	function handleNew() {
		props.history.push("/questoes/0");
	}
	function handleList() {
		const query = [];
		if (params.id?.length) query.push(`id=ik=${params.id}`);
		if (params.texto?.length) query.push(`texto==${params.texto}`);
		if (params.materia?.length) query.push(`materia==${params.materia}`);
		buscar(`/questoes?${query.join(";")}`).then(json).then(setQuestoes);
	}
	return (
		<div>
			<Panel header="Questões">
				<PanelContent>
					<InputText label="Nome" width={6} value={params.nome} onChange={e => setParams({...params, nome: e.target.value})}/>					
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={questoes} onRowDoubleClick={e => props.history.push(`/questoes/${questoes[e.index].id}`)}>
				<Column className="p-col-1" header="ID" field="id"/>
				<Column header="Matéria" field="materia.nome"/>
				<Column header="Pergunta" field="texto"/>				
			</DataTable>
		</div>
	);
});

export const EditQuestao = withRouter((props) => {
	const {id} = useParams();
	const [questao, setQuestao] = useState(newQuestao());
	const [materias, setMaterias] = useState([]);
	useEffect(() => id !== "0" && buscar(`/questoes/${id}`).then(json).then(setQuestao), [id]);
	const handleAutoCompleteMateria = (e) => buscar(`/materias?nome=ik=${e.query}`).then(json).then(setMaterias);
	const handleVoltar = () => props.history.push("/questoes");
	const handleSalvar = () => salvar("/questoes", questao).then(handleVoltar);
	const handleExcluir = () => excluir(`/questoes/${questao.id}`).then(handleVoltar);
	return (
		<Panel header="Questao">
			<PanelContent>
				<InputText width={12} label="Pergunta" value={questao.texto} onChange={e => setQuestao({...questao, texto: e.target.value})}/>
				<AutoComplete width={12} field="nome" suggestions={materias} completeMethod={handleAutoCompleteMateria} label="Matéria" value={questao.materia} onChange={e => setQuestao({...questao, materia: e.value})}/>
				<div className="p-col-12">
					<DataTable rows={5} value={questao.escolhas} paginator paginatorLeft={
						<Button icon="pi pi-plus" onClick={() => setQuestao({...questao, escolhas: [...questao.escolhas, newQuestaoEscolha()]})}/>
					}>
						<Column header="Resposta" body={r => (
							<InputText value={r.texto} onChange={e => {
								questao.escolhas.filter(q => byKeyOrId(q, r)).forEach(r => r.texto = e.target.value);
								setQuestao({...questao});
							}}/>
						)}/>
						<Column style={{textAlign: "center", width: "6em"}} header="Correta?" body={r => (
							<Checkbox checked={r.correta} onChange={() => {
								questao.escolhas.filter(q => byKeyOrId(q, r)).forEach(r => r.correta = !r.correta);
								setQuestao({...questao});
							}}/>
						)}/>
						<Column style={{textAlign: "center", width: "6em"}} header="Excluir" body={r => (
							<Button icon="pi pi-trash" className="p-button-danger" onClick={() => setQuestao({...questao, escolhas: questao.escolhas.filter(e => e.id !== r.id)})}/>
						)}/>
					</DataTable>
				</div>
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Excluir" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
			</PanelFooter>
		</Panel>
	);
});
