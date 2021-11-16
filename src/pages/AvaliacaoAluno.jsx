import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import React, {useEffect, useState, Row} from "react";
import {Column} from "primereact/column/column.cjs";
import {buscar, excluir, json, salvar} from "../utilidades/Fetch";
import {InputText} from "../components/InputText";
import {PanelContent} from "../components/PanelContent";
import {useParams, withRouter} from "react-router-dom";
import {Button} from "primereact/button";
import {PanelFooter} from "../components/PanelFooter";
import {Checkbox} from "primereact/checkbox";
import {byKeyOrId} from "../utilidades/FilterUtils";
import {AutoComplete} from "../components/AutoComplete";



export const PageAvaliacaoAluno = withRouter((props) => {

	const  id  = props.match.params.id;
	const [avaliacao, setAvaliacao] = useState([]);
	const [atividade, setAtividade] = useState([]);
	const [questoes, setQuestoes] = useState([]);	 
	const [escolhas, setEscolhas] = useState([]);  
	const [questao, setQuestao] = useState([]);


	useEffect(() => buscar(`/avaliacoes/${id}`).then(json).then(setAvaliacao),
		//buscar(`/atividades/${avaliacao.atividade.id}`).then(json).then(setAtividade),
		//setAtividade(avaliacao.atividade),
		//setQuestoes(atividade.questoes),
		console.log(avaliacao),
		console.log(id),
		[id]);


	function handleIniciar(){
		buscar(`/avaliacoes/${id}`).then(json).then(setAvaliacao);		
		buscar(`/atividades/${avaliacao.atividade.id}`).then(json).then(setAtividade);	
		setQuestoes(atividade.questoes);		
	}	
	
	return (
		<Panel header="Prova">
			<Button label="Iniciar" icon="pi pi-fw pi-search" onClick={handleIniciar}/>
			<br></br>
			{avaliacao.atividade.questoes.map(q => 	
				<div>
					<h3>{q.texto}</h3>	
					<DataTable emptyMessage="Nenhum registro encontrado" value={q.escolhas}>
						<Column className="p-col-1" header="Respostas" field="texto"/>
						<Column className="p-col-1" header="Correta?">
							<Checkbox></Checkbox>
						</Column>
 					</DataTable>				
				</div>
			)}	
	</Panel>
	);
});
