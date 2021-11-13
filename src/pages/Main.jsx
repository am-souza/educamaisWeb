import React from "react";
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";
import {handleLogout, handleMenu, withUser} from "../utilidades/Auth";
import {Route, Switch, withRouter} from "react-router-dom";
import {AvaliacaoAluno, PageHome} from "./Home";
import {EditUsuario, PageUsuario} from "./Usuario";
import {EditQuestao, PageQuestao} from "./Questao";
import {EditAtividade, PageAtividade} from "./Atividade";
import {PageAvaliacao, EditAvaliacao} from "./Avaliacao";
import {EditTurma, PageTurma} from "./Turma";
import {Spacer} from "../components/Spacer";
import {EditRespostas, PageRespostas} from "./Respostas";
import {EditMateria, PageMateria} from "./Materia";
import {EditCurso, PageCurso} from "./Curso";
import {PageLoja} from "./Loja";
import {PageInventario} from "./Inventario";
import {Tag} from "primereact/tag";
import {PageAvaliacaoAluno} from "./AvaliacaoAluno";



export const PageMain = withUser(withRouter(((props) => {
	return (
		<div>
			
			<div className="p-grid">				
				<Menubar className="p-col-7" model={handleMenu(props)} end={<Button icon="pi pi-fw pi-power-off" label="Logout" onClick={handleLogout}/>}/>			
				<Tag className="p-col-1 p-ml-5 p-mr-2" label="XP" icon="pi pi-flag" value={props.usuario.xp} style={{backgroundColor: "#2196F3", color: "#ffffff"}}>XP</Tag>
				<Tag className="p-col-1 p-mr-2" label="Cash" icon="pi pi-dollar" value={props.usuario.cash} style={{backgroundColor: "#2196F3", color: "#ffffff"}}>CASH</Tag>
				<Tag className="p-col-2" icon="pi pi-user" value={props.usuario.nome} style={{backgroundColor: "#2196F3", color: "#ffffff"}}/>	
			</div>			
			<Spacer/>			

			<Switch>
				<Route exact path="/" component={PageHome}/>
				<Route exact path="/avaliacaoaluno/:id" component={PageAvaliacaoAluno}/>
				<Route exact path="/usuarios" component={PageUsuario}/>
				<Route exact path="/usuarios/:id" component={EditUsuario}/>
				<Route exact path="/questoes" component={PageQuestao}/>
				<Route exact path="/questoes/:id" component={EditQuestao}/>
				<Route exact path="/atividades" component={PageAtividade}/>
				<Route exact path="/atividades/:id" component={EditAtividade}/>
				<Route exact path="/avaliacoes" component={PageAvaliacao}/>
				<Route exact path="/avaliacoes/:id" component={EditAvaliacao}/>
				<Route exact path="/turmas" component={PageTurma}/>
				<Route exact path="/turmas/:id" component={EditTurma}/>
				<Route exact path="/respostas" component={PageRespostas}/>
				<Route exact path="/respostas/:id" component={EditRespostas}/>
				<Route exact path="/materias" component={PageMateria}/>
				<Route exact path="/materias/:id" component={EditMateria}/>
				<Route exact path="/cursos" component={PageCurso}/>
				<Route exact path="/cursos/:id" component={EditCurso}/>
				<Route exact path="/loja" component={PageLoja}/>
				<Route exact path="/inventario" component={PageInventario}/>				
			</Switch>
		</div>
	);
})));

