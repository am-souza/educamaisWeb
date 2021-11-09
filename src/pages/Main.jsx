import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { handleLogout, handleMenu, withUser } from "../utilidades/Auth";
import { Route, Switch, withRouter } from "react-router-dom";
import { PageHome } from "./Home";
import { EditUsuario, PageUsuario } from "./Usuario";
import { EditQuestao, PageQuestao } from "./Questao";
import {EditAtividade, PageAtividade} from "./Atividade";
import { PageAvaliacao } from "./Avaliacao";
import { EditTurma, PageTurma } from "./Turma";
import { Spacer } from "../components/Spacer";
import { EditRespostas, PageRespostas } from "./Respostas";
import { EditMateria, PageMateria } from "./Materia";
import { EditCurso, PageCurso } from "./Curso";

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
				<Route exact path="/questoes/:id" component={EditQuestao}/>
				<Route exact path="/atividades" component={PageAtividade}/>
				<Route exact path="/atividades:id" component={EditAtividade}/>
				<Route exact path="/avaliacoes" component={PageAvaliacao}/>
				<Route exact path="/turmas" component={PageTurma}/>
				<Route exact path="/turmas/:id" component={EditTurma}/>
				<Route exact path="/respostas" component={PageRespostas}/>
				<Route exact path="/respostas/:id" component={EditRespostas}/>
				<Route exact path="/materias" component={PageMateria}/>
				<Route exact path="/materias/:id" component={EditMateria}/>
				<Route exact path="/cursos" component={PageCurso}/>
				<Route exact path="/cursos/:id" component={EditCurso}/>
			</Switch>
		</div>
	);
})));
