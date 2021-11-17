import {DataTable} from "primereact/datatable";
import React, {useState} from "react";
import {Column} from "primereact/column/column.cjs";
import {withRouter} from "react-router-dom";
import {withUser} from "../utilidades/Auth";
import avatar from "../img/avatar/1.png";
import {useEffect} from "react/cjs/react.development";
import {buscar, json} from "../utilidades/Fetch";
import moment from "moment";

export const PageHome = withUser(withRouter((props) => {

	const [avaliacoes, setAvaliacoes] = useState([]);
	
	useEffect(() => {
		buscar(`/turmas?alunos.id==${props.usuario.id}`).then(json).then(turmas => {
			if (turmas.length) {
				let data = moment().format("YYYY-MM-DDTHH:mm:ss");
				buscar(`/avaliacoes?turma.id=in=(${turmas.map(t => t.id).join(",")});inicio=le=${data};fim=ge=${data}`).then(json).then(avaliacoes => {
					if (avaliacoes.length) {
						buscar(`/avaliacoesalunos?avaliacao.id=in=(${avaliacoes.map(a => a.id).join(",")})`).then(json).then(avaliacoesAlunos => {
							const naoRespondidas = avaliacoes.filter(a => !avaliacoesAlunos.some(r => r.avaliacao.id === a.id));
							setAvaliacoes(naoRespondidas);
						});
					}
				});
			}
		});
	}, [props.usuario.id]);

	return (
		<div className="p-grid">			
			<div className="p-col-7">
				<DataTable emptyMessage="Nenhum registro encontrado" value={avaliacoes} onRowDoubleClick={e => props.history.push(`/avaliacaoaluno/${avaliacoes[e.index].id}`)}>
					<Column header="Atividade" field="atividade.nome"/> 								
					<Column header="Turma" field="turma.nome"/>
					<Column header="Início" body={a => moment(a.inicio).format("DD/MM/YYYY HH:mm")}/>
					<Column header="Fim" body={a => moment(a.fim).format("DD/MM/YYYY HH:mm")}/>
				</DataTable>
			</div>		
			<div className="p-col-3 p-mt-6 p-offset-1">	
				<img src={avatar} alt="Sem Texto" width="250"/>	
				<div className="p-text-center">Olá {props.usuario.nome}!<br/> Não se esqueça de fazer suas atividades e resgatar as recompensas</div>						
			</div>
		</div>
		
	);
}));
