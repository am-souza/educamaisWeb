import {DataTable} from "primereact/datatable";
import React, {useState} from "react";
import {Column} from "primereact/column/column.cjs";
import {withRouter} from "react-router-dom";
import {withUser} from "../utilidades/Auth";
import avatar from "../img/avatar/1.png";
import { useEffect } from "react/cjs/react.development";
import {buscar} from "../utilidades/Fetch";
import moment from "moment";
import {json} from "../utilidades/Fetch";
import { Tag } from 'primereact/tag';

export const PageHome = withUser(withRouter((props) => {

	const [avaliacoes, setAvaliacoes] = useState([]);
	const [avaliacoesconcluidas, setAvalicoesconcluidas] = useState([]);	
	
	useEffect(() => {
		if (props.usuario.perfil === "ALUNO"){
			buscar(`/turmas?alunos.id==${props.usuario.id}`).then(json).then(turmas => {
				let data = moment().format("YYYY-MM-DDTHH:mm:ss");
				buscar(`/avaliacoes?turma.id=in=(${turmas.map(t => t.id).join(",")});inicio=le=${data};fim=ge=${data}`).then(json).then(avaliacoes => {
					buscar(`/avaliacoesalunos?aluno.id==${props.usuario.id};avaliacao.id=in=(${avaliacoes.map(a => a.id).join(",")})`).then(json).then(respostas => {
						avaliacoes = avaliacoes.filter(a => !respostas.some(r => r.avaliacao.id === a.id));
						setAvaliacoes(avaliacoes);
					})
				});
			});
		}	
	}, [props.usuario.id]);		

		buscar(`/avaliacoesalunos?aluno.id==${props.usuario.id}`).then(json).then(setAvalicoesconcluidas);

	return (		
		<div className="p-grid">			
			<div className="p-col-7">
				<Tag className="texto-atividade" icon="pi pi-clock" severity="warning" rounded={true}>
                   	<h4>ATIVIDADES PENDENTES</h4>
                </Tag>
				<DataTable emptyMessage="Nenhum registro encontrado" value={avaliacoes} onRowDoubleClick={e => props.history.push(`/avaliacaoaluno/${avaliacoes[e.index].id}`)}>
					<Column header="Atividade" field="atividade.nome"/> 								
					<Column header="Turma" field="turma.nome"/>
					<Column header="Início" body={a => moment(a.inicio).format("DD/MM/YYYY HH:mm")}/>
					<Column header="Fim" body={a => moment(a.fim).format("DD/MM/YYYY HH:mm")}/>
				</DataTable>
				
				<div className="p-mt-6">					
					<Tag className="texto-atividade" icon="pi pi-check-circle" severity="success" rounded={true}>
                    	<h4>ATIVIDADES CONCLUÍDAS</h4>
                	</Tag>
					<DataTable emptyMessage="Nenhum registro encontrado" value={avaliacoesconcluidas}>
						<Column header="Avaliação" field="avaliacao.atividade.nome"/> 								
						<Column header="Turma" field="avaliacao.turma.nome"/>
						<Column header="Nota" field="nota"/>
					</DataTable>
				</div>				
			</div>	
			<div className="p-col-3 p-mt-6 p-offset-1">	
				<img src={avatar} alt="Sem Texto" width="250"/>	
										
				<Tag className="" severity="info" rounded={true}>
					<i className="pi pi-comment" style={{'fontSize': '2em', 'margin-left': '85%'}}></i>
					<div className="p-text-center">Olá {props.usuario.nome}!<br/> Não se esqueça de fazer suas atividades e resgatar as recompensas</div>
                </Tag>
			</div>
		</div>
		
	);
}));
