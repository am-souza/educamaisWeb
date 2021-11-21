import React, {useEffect, useState} from "react";
import {buscar, json, salvar} from "../utilidades/Fetch";
import {withRouter} from "react-router-dom";
import {withUser} from "../utilidades/Auth";
import {Column} from "primereact/column/column.cjs";
import {DataTable} from "primereact/datatable";
import {InputText} from "../components/InputText";
import {PanelContent} from "../components/PanelContent";
import {Panel} from "primereact/panel";
import {Spacer} from "../components/Spacer";
import {Button} from "primereact/button";
import {PanelFooter} from "../components/PanelFooter";


export const PageNotas = withUser(withRouter(props => {
	
	const [avaliacoesconcluidas, setAvalicoesconcluidas] = useState([]);
	const [params, setParams] = useState({
		id: "",
		aluno: "",
		turma: "",
		avaliacao: "",						
		
	});

	useEffect(() => {
		buscar(`/avaliacoesalunos`).then(json).then(setAvalicoesconcluidas);
	},[]);

	function handleList() {
		const query = [];
		if (params.id) query.push(`id==${params.id}`);
		if (params.aluno?.length) query.push(`aluno.nome=ik=${params.aluno}`);
		if (params.turma?.length) query.push(`avaliacao.turma.nome=ik=${params.turma}`);
		if (params.avaliacao?.length) query.push(`avaliacao.atividade.nome=ik=${params.avaliacao}`);
		buscar(`/avaliacoesalunos?${query.join(";")}`).then(json).then(setAvalicoesconcluidas);		
	}

	return (
		<div>
			<Panel header="Notas">
				<PanelContent>
					<InputText label="ID" width={1} value={params.id} onChange={e => setParams({...params, id: e.target.value})}/>					
					<InputText label="Aluno" width={5} value={params.aluno} onChange={e => setParams({...params, aluno: e.target.value})}/>					
					<InputText label="Turma" width={6} value={params.turma} onChange={e => setParams({...params, turma: e.target.value})}/>					
					<InputText label="Avaliacao" width={6} value={params.avaliacao} onChange={e => setParams({...params, avaliacao: e.target.value})}/>					
				</PanelContent>	
				<PanelFooter>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={avaliacoesconcluidas}>
				<Column className="p-col-1" header="ID" field="id"/>
				<Column header="Aluno" field="aluno.nome"/>		
				<Column className="p-col-1" header="Nota" field="nota"/>		
				<Column header="Turma" field="avaliacao.turma.nome"/>				
				<Column header="Avaliação" field="avaliacao.atividade.nome"/>				
			</DataTable>				
		</div>
	);
}));
