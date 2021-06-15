import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { handleLogout, handleMenu, withUser } from "../utilidades/Auth";
import { Route, Switch, withRouter } from "react-router-dom";
import { PageHome } from "./Home";
import { EditUsuario, PageUsuario } from "./Usuario";
import { PageQuestao } from "./Questao";
import { PageAtividade } from "./Atividade";
import { PageAvaliacao } from "./Avaliacao";
import { PageTurma } from "./Turma";
import { Spacer } from "../components/Spacer";

export const PageMain = withUser(withRouter(((props) => {
	return (
		<div>
			<Menubar model={handleMenu(props)} end={<Button icon="pi pi-fw pi-power-off" label="Logout" onClick={handleLogout}/>}/>
			<Spacer/>
			<Switch>
				<Route exact path="/" component={PageHome}/>
				<Route exact path="/usuarios" component={PageUsuario}/>
				<Route exact path="/usuarios/:id" component={EditUsuario}/>
				<Route exact path="/questoes" component={PageQuestao}/>
				<Route exact path="/atividades" component={PageAtividade}/>
				<Route exact path="/avaliacoes" component={PageAvaliacao}/>
				<Route exact path="/turmas" component={PageTurma}/>
			</Switch>
		</div>
	);
})));
