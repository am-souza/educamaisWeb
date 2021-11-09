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
import {AutoComplete} from "../components/AutoComplete";
import {Fieldset} from 'primereact/fieldset';
import {Dropdown} from "../components/Dropdown";
import {InputNumber} from "../components/InputNumber";
import {InputMask} from "../components/InputMask";

const Turma_Periodo = [
	{label: "Nenhum", value: null},
	{label: "Integral", value: "INTEGRAL"},
	{label: "Matutino", value: "MATUTINO"},
	{label: "Vespertino", value: "VESPERTINO"},
	{label: "Noturno", value: "NOTURNO"}
];

export const PageTurma = withRouter((props) => {
	const [turmas, setTurmas] = useState([]);
	const [params, setParams] = useState({
		nome: "",
		periodo: "",
		numero: "",
		tutor: "",
		materia: "",				
	});
	function handleNew() {		
		props.history.push("/turmas/0");
	}
	function handleList() {
		const query = [];		
		if (params.nome?.length) query.push(`nome=ik=${params.nome}`);
		buscar(`/turmas?${query.join(";")}`).then(json).then(setTurmas);		
	}
	return (
		<div>
			<Panel header="Turmas">
				<PanelContent>
					<InputText label="Nome" width={6} value={params.nome} onChange={e => setParams({...params, nome: e.target.value})}/>					
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={turmas} onRowDoubleClick={e => props.history.push(`/turmas/${turmas[e.index].id}`)}>
				<Column header="Nome" field="nome"/>
				<Column header="Período" field="periodo"/>
				<Column header="Numero" field="numeroTurma"/>				
				<Column header="Matéria" field="materia.nome"/>								
			</DataTable>
		</div>
	);
});

export const EditTurma = withRouter((props) => {
	const { id } = useParams();
	const [turma, setTurma] = useState({
		nome: "",
		periodo: null,
		tutor: null,
		materia: null,
		alunos: []
	});
	const [tutores, setTutores] = useState([]);	
	const [materias, setMaterias] = useState([]);
	const [alunos, setAlunos] = useState([]);
	useEffect(() => id !== "0" && buscar(`/turmas/${id}`).then(json).then((turma) => setTurma(turma)), [id]);
	const handleVoltar = () => props.history.push("/turmas");
	const handleSalvar = () => salvar("/turmas", turma).then(handleVoltar);
	const handleExcluir = () => excluir(`/turmas/${turma.id}`).then(handleVoltar);
	const handleAutoCompleteTutor = (e) => buscar(`/usuarios?perfil==TUTOR;nome=ik=${e.query}`).then(json).then(setTutores);
	const handleAutoCompleteMateria = (e) => buscar(`/materias?nome=ik=${e.query}`).then(json).then(setMaterias);
	const handleAutoCompleteAluno = (e) => buscar(`/usuarios?perfil==ALUNO;nome=ik=${e.query}`).then(json).then(setAlunos);
	return (
		<Panel header="Turma">
			<Fieldset legend="Configuração geral" toggleable>
				<PanelContent>
					<InputText width={6} label="Nome" value={turma.nome} onChange={e => setTurma({...turma, nome: e.target.value})}/>
					<InputNumber label="Número" width={2} value={turma.numeroTurma} onValueChange={e => setTurma({...turma, numeroTurma: e.target.value})}/>
					<Dropdown label="Período" width={4} options={Turma_Periodo} value={turma.periodo} onChange={e => setTurma({...turma, periodo: e.value})}/>
					<AutoComplete width={8} field="nome" suggestions={materias} completeMethod={handleAutoCompleteMateria} label="Matéria" value={turma.materia} onChange={e => setTurma({...turma, materia: e.value})}/>
					<InputMask width={4} label="Data (Ano-Mês-Dia)" className="p-d-block" mask="9999-99-99" value={turma.data} placeholder="yyyy-mm-dd" slotChar="yyyy-mm-dd" onChange={e => setTurma({...turma, data: e.target.value})}/>
					<AutoComplete width={12} field="nome" suggestions={tutores} completeMethod={handleAutoCompleteTutor} label="Tutor" value={turma.tutor} onChange={e => setTurma({...turma, tutor: e.value})}/>
				</PanelContent>
			</Fieldset>
			<div style={{height: "1em"}}/>
			<Fieldset legend="Alunos" toggleable>
				<AutoComplete width={12}
				              field="nome"
				              suggestions={alunos}
				              completeMethod={handleAutoCompleteAluno}
				              label="Aluno"
				              value={turma.aluno}
				              onChange={e => setTurma({...turma, aluno: e.value})}
				              onSelect={e => setTurma({...turma, aluno: "", alunos: [...turma.alunos, e.value]})}
				/>
				<DataTable value={turma.alunos}>
					<Column header="Nome" field="nome"/>
					<Column header="E-mail" field="email"/>
					<Column header="Remover" body={a => <Button icon="pi pi-times" onClick={() => {
						setTurma({...turma, alunos: turma.alunos.filter(u => u.id !== a.id)});
					}}/>}/>
				</DataTable>
				<PanelFooter>
					<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
					<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>					
					<Button label="Delete" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
				</PanelFooter>
			</Fieldset>
		</Panel>
	);
});
