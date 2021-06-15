import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Column } from "primereact/components/column/Column";
import { Spacer } from "../components/Spacer";
import { buscar, json, salvar } from "../utilidades/Fetch";
import { InputText } from "../components/InputText";
import { PanelContent } from "../components/PanelContent";
import { useParams, withRouter } from "react-router";
import { Button } from "primereact/button";
import { PanelFooter } from "../components/PanelFooter";
import { Dropdown } from "../components/Dropdown";

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
		perfil: null
	});
	function handleNew() {
		props.history.push("/usuarios/0");
	}
	function handleList() {
		const query = [];
		if (params.username?.length) query.push(`username=ik=${params.username}`);
		if (params.perfil?.length) query.push(`perfil==${params.perfil}`);
		buscar(`/usuarios?${query.join(";")}`).then(json).then(setUsuarios);
	}
	return (
		<div>
			<Panel header="Usuários">
				<PanelContent>
					<InputText label="Login" width={6} value={params.username} onChange={e => setParams({...params, username: e.target.value})}/>
					<Dropdown options={Usuario_Perfil} label="Perfil" width={6} value={params.perfil} onChange={e => setParams({...params, perfil: e.value})}/>
				</PanelContent>
				<PanelFooter>
					<Button label="Novo" className="p-button-warning" icon="pi pi-fw pi-plus" onClick={handleNew}/>
					<Button label="Procurar" icon="pi pi-fw pi-search" onClick={handleList}/>
				</PanelFooter>
			</Panel>
			<Spacer/>
			<DataTable emptyMessage="Nenhum registro encontrado" value={usuarios} onRowDoubleClick={e => props.history.push(`/usuarios/${usuarios[e.index].id}`)}>
				<Column header="Login" field="username"/>
				<Column header="Perfil" field="perfil"/>
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
	return (
		<Panel header="Usuário">
			<PanelContent>
				<InputText width={12} label="Login" value={usuario.username} onChange={e => setUsuario({...usuario, username: e.target.value})}/>
				<Dropdown options={Usuario_Perfil} label="Perfil" width={12} value={usuario.perfil} onChange={e => setUsuario({...usuario, perfil: e.value})}/>
			</PanelContent>
			<PanelFooter>
				<Button label="Salvar" icon="pi pi-fw pi-save" className="p-button-success" onClick={handleSalvar}/>
				<Button label="Voltar" icon="pi pi-fw pi-undo" className="p-button-secondary" onClick={handleVoltar}/>
			</PanelFooter>
		</Panel>
	);
});
