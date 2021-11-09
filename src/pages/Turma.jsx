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
import { AutoComplete } from "../components/AutoComplete";
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { Fieldset } from 'primereact/fieldset';



const Usuario_Perfil = [
	{label: "Nenhum", value: null},
	"ADMINISTRADOR",
	"TUTOR",
	"ALUNO"
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
		tutor: "",
		materia: "",
		aluno: "",
	});

	const [params, setParams] = useState({
		username: "",
		nome: "",
		email: "",
		perfil: null
	});

	const [usuarios, setUsuarios] = useState([]);
	const [tutores, setTutores] = useState([]);	
	const [materias, setMaterias] = useState([]);
	const [alunos, setAlunos] = useState([]);	


	useEffect(() => id !== "0" && buscar(`/turmas/${id}`).then(json).then(setTurma), [id]);

	const handleVoltar = () => props.history.push("/turmas");
	const handleSalvar = () => salvar("/turmas", turma).then(handleVoltar);
	const handleExcluir = () => excluir(`/turmas/${turma.id}`).then(handleVoltar);

	const handleAutoCompleteTutor = (e) => buscar(`/usuarios?perfil==TUTOR;nome=ik=${e.query}`).then(json).then(setTutores);
	const handleAutoCompleteMateria = (e) => buscar(`/materias?nome=ik=${e.query}`).then(json).then(setMaterias);
	const handleAutoCompleteAluno = (e) => buscar(`/usuarios?perfil==ALUNO;nome=ik=${e.query}`).then(json).then(setAlunos);

	
	function handleList() {
		const query = [];
		if (params.username?.length) query.push(`username=ik=${params.username}`);
		if (params.nome?.length) query.push(`nome=ik=${params.nome}`);
		if (params.perfil?.length) query.push(`perfil==${params.perfil}`);
		buscar(`/usuarios?${query.join(";")}`).then(json).then(setUsuarios);
	}


	function adicionarAluno() {		
		
	}

	function removerAluno() {		
		const query = [];
		query.push(`perfil==ALUNO`);
		salvar(`/usuarios?${query.join(";")}`).then(json).then(setAlunos);
	}	

	return (
		<Panel header="Turma">
			<Fieldset legend="Configuração geral" toggleable>

				<InputText width={8} label="Nome" value={turma.nome} onChange={e => setTurma({...turma, nome: e.target.value})}/>				
							
				<div className="p-field p-col-6 p-md-3">
					<div className="p-text-left">Período</div>
					<InputNumber value={turma.periodo} onValueChange={e => setTurma({...turma, periodo: e.target.value})}/>
				</div>	

				<div className="p-field p-col-6 p-md-3">
					<div className="p-text-left">Número</div>
					<InputNumber width={4} value={turma.numeroTurma} onValueChange={e => setTurma({...turma, numeroTurma: e.target.value})}/>
				</div>
				
				<AutoComplete width={12} field="nome" suggestions={materias} completeMethod={handleAutoCompleteMateria} label="Matéria" value={turma.materia} onChange={e => setTurma({...turma, materia: e.value})}/>				
				<AutoComplete width={12} field="nome" suggestions={tutores} completeMethod={handleAutoCompleteTutor} label="Tutor" value={turma.tutor} onChange={e => setTurma({...turma, tutor: e.value})}/>
				
				<div className="p-field p-col-12 p-md-3">
					<div className="p-text-left">Data (Ano-Mês-Dia)</div>					
					<InputMask className="p-d-block"  label="Data" mask="9999-99-99" value={turma.data} placeholder="yyyy-mm-dd" slotChar="yyyy-mm-dd" onChange={e => setTurma({...turma, data: e.target.value})}></InputMask>
				</div>

				<PanelFooter>
					<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
					<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
					<Button label="Delete" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
				</PanelFooter>

			</Fieldset>

			<Fieldset legend="Alunos" toggleable>	

			<AutoComplete width={12} field="nome" suggestions={alunos} completeMethod={handleAutoCompleteAluno} label="Aluno" value={turma.aluno} onChange={e => setTurma({...turma, aluno: e.value})}/>
			<Button label="Adicionar" icon="pi pi-fw pi-save" className="p-justify-end p-button-success" onClick={adicionarAluno}/>
			<Button label="Remover" icon="pi pi-fw pi-trash" className="p-justify-end p-button-danger" onClick={removerAluno}/>

				<div className="p-col-3 p-text-left">
					<Button label="Atualizar" icon="pi pi-fw pi-refresh" onClick={handleList}/>
				</div>	
				<div className="p-col-3 p-text-left">Alunos Matriculados</div>			
				<DataTable emptyMessage="Nenhum registro encontrado" value={turma.aluno}>	
					<Column header="Nome" field="aluno"/>	
				</DataTable>

				<PanelFooter>
					<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>					
					<Button label="Delete" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
				</PanelFooter>

			</Fieldset>	

			<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>		
		</Panel>
	);
});