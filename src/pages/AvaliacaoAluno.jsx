import {Panel} from "primereact/panel";
import React, {useEffect, useState, useRef} from "react";
import {buscar, json, salvar} from "../utilidades/Fetch";
import {PanelContent} from "../components/PanelContent";
import {withRouter} from "react-router-dom";
import {Checkbox} from "primereact/checkbox";
import {withUser} from "../utilidades/Auth";
import {PanelFooter} from "../components/PanelFooter";
import {Button} from "primereact/button";
import { Toast } from 'primereact/toast';

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
			<div className="p-d-flex p-flex-column" key={questao.id}>				
				<div className="p-col-12"><h3>{questao.texto}</h3></div>				
				<div>
					{questao.escolhas.map(questaoEscolha => printQuestaoEscolha(questao, questaoEscolha))}
				</div>				
			</div>
		);
	}
	function handleSave() {
		salvar("/avaliacoesalunos", avaliacao).then(json).then(avaliacaoAluno => {
			props.history.push("/");
			window.location.reload();
		});
	}

	const handleVoltar = () => toastBC.current.clear();

	const toastBC = useRef(); 

    const showConfirm = () => {
        toastBC.current.show({ severity: 'warn', sticky: true, content: (
            <div className="p-flex p-flex-column" style={{flex: '1'}}>
                <div className="p-text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    <h4>Confirmar Respostas?</h4>                                       
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-col-6">
                        <Button type="button" label="Sim" className="p-button-success" onClick={handleSave}/>
                    </div>
                    <div className="p-col-6">
                        <Button type="button" label="Não" className="p-button-secondary" onClick={handleVoltar}/>
                    </div>
                </div>
            </div>
        ) });
    }  

	return (
		<Panel header="Prova">
			<Toast ref={toastBC} position="bottom-center" />
			<PanelContent>	
				<div>					
					{avaliacao.avaliacao?.atividade.questoes.map(printQuestao)}							
				</div>			
			</PanelContent>
			<PanelFooter>
				<Button icon="pi pi-save" label="Concluir" onClick={showConfirm}/>
			</PanelFooter>
		</Panel>
	);
}));
