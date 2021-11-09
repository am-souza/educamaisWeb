import React, { useEffect } from "react";
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
import { Avatar } from 'primereact/avatar';
import { useState} from "react";
import {buscar, json} from "../utilidades/Fetch";
import { Tag } from 'primereact/tag';


export const PageMain = withUser(withRouter(((props) => {
	
	const [usuarios, setUsuarios] = useState([]);
/*
	useEffect(()=>{
		buscar("/usuarios/eu").then(json).then(setUsuarios);
	})
*/
	function handleList() {
		buscar("/usuarios/eu").then(json).then(setUsuarios);
	}	

	return (
		<div>

			<div className="p-grid">
				<div className="p-col-9" >
					<Menubar model={handleMenu(props)} end={<Button icon="pi pi-fw pi-power-off" label="Logout" onClick={handleList}/>}/>
				</div>
				<div className="p-col-3  p-mt-3">					
					<Tag className="p-mr-1 " label="XP" icon="pi pi-flag" value={usuarios.xp} style={{ backgroundColor: '#2196F3', color: '#ffffff' }}>XP</Tag>	
					<Tag className="p-mr-1" label="Cash" icon="pi pi-dollar" value={usuarios.cash} style={{ backgroundColor: '#2196F3', color: '#ffffff' }}> CASH</Tag>					
					<Tag className="p-mr-2" icon="pi pi-user" value={usuarios.username} style={{ backgroundColor: '#2196F3', color: '#ffffff' }}></Tag>	
				</div>
			</div>
			
			<div>

			<Spacer/>
			<Switch>
				<Route exact path="/" component={PageHome}/>
				<Route exact path="/usuarios" component={PageUsuario}/>
				<Route exact path="/usuarios/:id" component={EditUsuario}/>
				<Route exact path="/questoes" component={PageQuestao}/>
				<Route exact path="/questoes/:id" component={EditQuestao}/>
				<Route exact path="/atividades" component={PageAtividade}/>
				<Route exact path="/atividades/:id" component={EditAtividade}/>
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
		</div>
	);
})));
