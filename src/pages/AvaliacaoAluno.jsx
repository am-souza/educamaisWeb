import {Panel} from "primereact/panel";
import React, {useEffect, useState} from "react";
import {buscar, json, salvar} from "../utilidades/Fetch";
import {PanelContent} from "../components/PanelContent";
import {withRouter} from "react-router-dom";
import {Checkbox} from "primereact/checkbox";
import {withUser} from "../utilidades/Auth";
import {PanelFooter} from "../components/PanelFooter";
import {Button} from "primereact/button";

export const PageAvaliacaoAluno = withUser(withRouter(props => {
	const id = props.match.params.id;
	const [avaliacao, setAvaliacao] = useState({
		avaliacao: null,
		aluno: null,
		nota: 0,
		respostas: []
	});
	useEffect(() => {
		buscar(`/avaliacoes/${id}`).then(json).then(avaliacao => {
			setAvaliacao({
				avaliacao,
				aluno: props.usuario,
				respostas: avaliacao.atividade.questoes.map(questao => ({questao, alternativaEscolhida: null})),
				nota: 0
			});
		});
	}, [id, props.usuario]);
	function printQuestaoEscolha(questao, questaoEscolha) {
		return (
			<div key={questaoEscolha.id}>
				<Checkbox onChange={() => {
					avaliacao.respostas.filter(r => r.questao.id === questao.id).forEach(r => {
						r.alternativaEscolhida = {id: questaoEscolha.id}
					});
					setAvaliacao({...avaliacao});
				}} checked={avaliacao.respostas.filter(r => r.questao.id === questao.id).some(r => r.alternativaEscolhida?.id === questaoEscolha.id)}/>
				{questaoEscolha.texto}
			</div>
		);
	}
	function printQuestao(questao) {
		return (
			<div key={questao.id}>
				<div>{questao.texto}</div>
				<div>
					{questao.escolhas.map(questaoEscolha => printQuestaoEscolha(questao, questaoEscolha))}
				</div>
			</div>
		);
	}
	function handleSave() {
		salvar("/avaliacoesalunos", avaliacao).then(() => {
			props.history.push("/");
		});
	}
	return (
		<Panel header="Prova">
			<PanelContent>
				{avaliacao.avaliacao?.atividade.questoes.map(printQuestao)}
			</PanelContent>
			<PanelFooter>
				<Button icon="pi pi-save" label="Concluir" onClick={handleSave}/>
			</PanelFooter>
		</Panel>
	);
}));
