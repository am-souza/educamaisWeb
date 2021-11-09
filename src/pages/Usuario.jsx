import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Column } from "primereact/column/column.cjs";
import { Spacer } from "../components/Spacer";
import { buscar, json, salvar, excluir } from "../utilidades/Fetch";
import { InputText } from "../components/InputText";
import { PanelContent } from "../components/PanelContent";
import { useParams, withRouter } from "react-router";
import { Button } from "primereact/button";
import { PanelFooter } from "../components/PanelFooter";
import { Dropdown } from "../components/Dropdown";
import { AutoComplete } from "../components/AutoComplete";


const Usuario_Perfil = [
	{label: "Nenhum", value: null},
	"ADMINISTRADOR",
	"TUTOR",
	"ALUNO"
];

export const PageUsuario = withRouter((props) => {
	const [usuarios, setUsuarios] = useState([]);
	const [params, setParams] = useState({
		username: "",
		nome: "",
		email: "",
		perfil: null
	});
		
	function handleNew() {
		props.history.push("/usuarios/0");
	}
	function handleList() {
		const query = [];
		if (params.username?.length) query.push(`username=ik=${params.username}`);
		if (params.nome?.length) query.push(`nome=ik=${params.nome}`);
		if (params.perfil?.length) query.push(`perfil==${params.perfil}`);
		buscar(`/usuarios?${query.join(";")}`).then(json).then(setUsuarios);
	}
	return (
		<div>
			<Panel header="Usuários">
				<PanelContent>
					<InputText label="Login" width={3} value={params.username} onChange={e => setParams({...params, username: e.target.value})}/>
					<InputText label="Nome" width={6} value={params.nome} onChange={e => setParams({...params, nome: e.target.value})}/>					
					<Dropdown options={Usuario_Perfil} label="Perfil" width={3} value={params.perfil} onChange={e => setParams({...params, perfil: e.value})}/>
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={usuarios} onRowDoubleClick={e => props.history.push(`/usuarios/${usuarios[e.index].id}`)}>
				<Column header="Login" field="username"/>
				<Column header="Nome" field="nome"/>
				<Column header="Perfil" field="perfil"/>				
				<Column header="Email" field="email"/>
			</DataTable>
		</div>		
	);
});



export const EditUsuario = withRouter((props) => {
	const { id } = useParams();
	const [usuario, setUsuario] = useState({
		username: "",
		perfil: "ALUNO"
	});
	useEffect(() => id !== "0" && buscar(`/usuarios/${id}`).then(json).then(setUsuario), [id]);
	const handleVoltar = () => props.history.push("/usuarios");
	const handleSalvar = () => salvar("/usuarios", usuario).then(handleVoltar);
	const handleExcluir = () => excluir(`/usuarios/${usuario.id}`).then(handleVoltar);	
	return (
		<Panel header="Usuário">
			<PanelContent>
				<InputText width={12} label="Login" value={usuario.username} onChange={e => setUsuario({...usuario, username: e.target.value})}/>
				<InputText width={12} label="Nome" value={usuario.nome} onChange={e => setUsuario({...usuario, nome: e.target.value})}/>
				<InputText width={12} label="Email" value={usuario.email} onChange={e => setUsuario({...usuario, email: e.target.value})}/>
				<InputText type="password" width={12} label="Password" value={usuario.password} onChange={e => setUsuario({...usuario, password: e.target.value})}/>
				<Dropdown options={Usuario_Perfil} label="Perfil" width={12} value={usuario.perfil} onChange={e => setUsuario({...usuario, perfil: e.value})}/>
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
				<Button label="Delete" icon="pi pi-fw pi-trash" className="p-button-danger" onClick={handleExcluir}/>
			</PanelFooter>
		</Panel>
	);
});
