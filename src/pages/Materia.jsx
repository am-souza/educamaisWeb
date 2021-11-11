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

export const PageMateria = withRouter((props) => {
	const [materias, setMaterias] = useState([]);
	const [params, setParams] = useState({
		nome: "",
		//tutor: "",
		id: "",
				
	});
	function handleNew() {		
		props.history.push("/materias/0");
	}
	function handleList() {
		const query = [];		
		if (params.nome?.length) query.push(`nome=ik=${params.nome}`);
		buscar(`/materias?${query.join(";")}`).then(json).then(setMaterias);
	}
	return (
		<div>
			<Panel header="Materias">
				<PanelContent>
					<InputText label="Nome" width={6} value={params.nome} onChange={e => setParams({...params, nome: e.target.value})}/>					
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={materias} onRowDoubleClick={e => props.history.push(`/materias/${materias[e.index].id}`)}>
				<Column className="p-col-1" header="ID" field="id"/>
                <Column header="Nome" field="nome"/>												                
			</DataTable>
		</div>
	);
});

export const EditMateria = withRouter((props) => {
	const { id } = useParams();
	const [materia, setMateria] = useState({
		nome: "",
		//tutor: "",
	});
	const [tutores, setTutores] = useState([]);
	useEffect(() => id !== "0" && buscar(`/materias/${id}`).then(json).then(setMateria), [id]);
	const handleVoltar = () => props.history.push("/materias");
	const handleSalvar = () => salvar("/materias", materia).then(handleVoltar);
	const handleExcluir = () => excluir(`/materias/${materia.id}`).then(handleVoltar);
	const handleAutoCompleteTutor = (e) => buscar(`/usuarios?perfil==TUTOR;nome=ik=${e.query}`).then(json).then(setTutores);
	return (
		<Panel header="Materia">
			<PanelContent>
				<InputText width={8} label="Nome" value={materia.nome} onChange={e => setMateria({...materia, nome: e.target.value})}/>												
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Excluir" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
			</PanelFooter>
		</Panel>
	);
});
