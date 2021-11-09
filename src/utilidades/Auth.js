import React from "react";
import { buscar } from "./Fetch";
import { byLabel } from "./SortUtils";
import { Avatar } from 'primereact/avatar';

export function handleLogin(login, callback) {
	window.localStorage.setItem("X-Auth-Credentials", `Basic ${btoa(`${login.username}:${login.password}`)}`);
	buscar("/usuarios/eu").then(response => {
		if (response.status === 200) {
			response.json().then(usuario => callback?.(usuario));
		} else {
			window.alert("Falha na autenticação! Por favor, tente novamente.");
		}
	});
}

export function handleLogout() {
	window.localStorage.removeItem("X-Auth-Credentials");
	window.location.reload();
}

export function handleMenu(props) {
	const cadastros = [];
	switch (props.usuario.perfil) {
		case "ADMINISTRADOR":
			cadastros.push({label: "Usuários", icon: "pi pi-fw pi-user", command: () => props.history.push("/usuarios")});
			cadastros.push({label: "Cursos", icon: "pi pi-fw pi-book", command: () => props.history.push("/cursos")});
			// eslint-disable-next-line
		case "TUTOR":
			cadastros.push({label: "Turmas", icon: "pi pi-fw pi-users", command: () => props.history.push("/turmas")});
			cadastros.push({label: "Atividades", icon: "pi pi-fw pi-clone", command: () => props.history.push("/atividades")});
			cadastros.push({label: "Questões", icon: "pi pi-fw pi-question", command: () => props.history.push("/questoes")});
			cadastros.push({label: "Respostas", icon: "pi pi-fw pi-list", command: () => props.history.push("/respostas")});
			cadastros.push({label: "Matérias", icon: "pi pi-fw pi-inbox", command: () => props.history.push("/materias")});
			// eslint-disable-next-line
		case "ALUNO":
			cadastros.push({label: "Avaliações", icon: "pi pi-fw pi-file", command: () => props.history.push("/avaliacoes")});
			// eslint-disable-next-line
		default:
			break;
	}
	return [
		{label: "Cadastro", icon: "pi pi-fw pi-pencil", items: cadastros.sort(byLabel),}];
}

const UserContext = React.createContext();

export const UserProvider = UserContext.Provider;

export const withUser = Component => props => {
	return (
		<UserContext.Consumer>
			{usuario => <Component {...props} usuario={usuario}/>}			
		</UserContext.Consumer>				
	);
}
