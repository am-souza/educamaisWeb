import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import React, {useEffect, useState, useRef} from "react";
import {Column} from "primereact/column";
import {Spacer} from "../components/Spacer";
import {buscar, excluir, json, salvar} from "../utilidades/Fetch";
import {InputText} from "../components/InputText";
import {PanelContent} from "../components/PanelContent";
import {useParams, withRouter} from "react-router-dom";
import {Button} from "primereact/button";
import {PanelFooter} from "../components/PanelFooter";
import {TabPanel, TabView} from "primereact/tabview";
import {AutoComplete} from "../components/AutoComplete";
import { Toast } from 'primereact/toast';

function newAtividade() {
	return {
		_key: Math.random(),
		id: null,
		nome: "",
		questoes: []
	};
}

export const PageAtividade = withRouter((props) => {
	const [atividades, setAtividades] = useState([]);
	const [params, setParams] = useState({
		texto: ""
	});
	function handleNew() {
		props.history.push("/atividades/0");
	}
	function handleList() {
		const query = [];
		if (params.id?.length) query.push(`id==${params.id}`);
		if (params.nome?.length) query.push(`nome=ik=${params.nome}`);
		buscar(`/atividades?${query.join(";")}`).then(json).then(setAtividades);
	}

	useEffect(() => {
		buscar(`/atividades`).then(json).then(setAtividades);
	},[]);

	return (
		<div>
			<Panel header="Atividades">
				<PanelContent>
					<InputText label="ID" width={1} value={params.id} onChange={e => setParams({...params, id: e.target.value})}/>
					<InputText label="Nome" width={7} value={params.nome} onChange={e => setParams({...params, nome: e.target.value})}/>
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={atividades} onRowDoubleClick={e => props.history.push(`/atividades/${atividades[e.index].id}`)}>
				<Column className="p-col-1" header="ID" field="id"/>
				<Column header="Nome" field="nome"/>
			</DataTable>
		</div>
	);
});

export const EditAtividade = withRouter((props) => {
	const { id } = useParams();
	const [atividade, setAtividade] = useState(newAtividade());
	const [questoes, setQuestoes] = useState([]);
	useEffect(() => id !== "0" && buscar(`/atividades/${id}`).then(json).then(setAtividade), [id]);
	const handleVoltar = () => props.history.push("/atividades");
	const handleSalvar = () => salvar("/atividades", atividade).then(handleVoltar);
	const handleExcluir = () => excluir(`/atividades/${atividade.id}`).then(handleVoltar);
	const handleAutoCompleteQuestao = (e) => buscar(`/questoes?id=out=(${atividade.questoes.map(q => q.id).join(",") || "0"});texto=ik=${e.query}`).then(json).then(setQuestoes);

	const handleCancelar = () => toastBC.current.clear();
	const toastBC = useRef();  

    const showConfirm = () => {
        toastBC.current.show({ severity: 'warn', sticky: true, content: (
            <div className="p-flex p-flex-column" style={{flex: '1'}}>
                <div className="p-text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    <h4>Desja realmente excluir?</h4>                                       
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-col-6">
                        <Button type="button" label="Sim" className="p-button-success" onClick={handleExcluir}/>
                    </div>
                    <div className="p-col-6">
                        <Button type="button" label="Não" className="p-button-secondary" onClick={handleCancelar}/>
                    </div>
                </div>
            </div>
        ) });
    } 

	return (
		<Panel header="Atividade">
			<Toast ref={toastBC} position="bottom-center" />
			<TabView>
				<TabPanel header="Dados Principais">
					<PanelContent>
						<InputText width={12} label="Nome" value={atividade.nome} onChange={e => setAtividade({...atividade, nome: e.target.value})}/>
					</PanelContent>
				</TabPanel>
				<TabPanel header="Questões">
					<PanelContent>
						<AutoComplete width={12}
						              field="texto"
						              suggestions={questoes}
						              completeMethod={handleAutoCompleteQuestao}
						              label="Questão"
						              value={atividade.questao}
						              onChange={e => setAtividade({...atividade, questao: e.value})}
						              onSelect={e => setAtividade({...atividade, questao: "", questoes: [...atividade.questoes, e.value]})}
						/>
						<div className="p-col-12">
							<DataTable paginator rows={10} value={atividade.questoes}>
								<Column header="Pergunta" field="texto"/>
								<Column style={{textAlign: "center", width: "6em"}} header="Remover" body={a => <Button icon="pi pi-times" onClick={() => {
									setAtividade({...atividade, questoes: atividade.questoes.filter(u => u.id !== a.id)});
								}}/>}/>
							</DataTable>
						</div>
					</PanelContent>
				</TabPanel>
			</TabView>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Excluir" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={showConfirm}/>
			</PanelFooter>
		</Panel>
	);
});
