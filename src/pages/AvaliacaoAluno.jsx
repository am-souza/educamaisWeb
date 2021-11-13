import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import React, {useEffect, useState, Row} from "react";
import {Column} from "primereact/column/column.cjs";
import {Spacer} from "../components/Spacer";
import {buscar, excluir, json, salvar} from "../utilidades/Fetch";
import {InputText} from "../components/InputText";
import {PanelContent} from "../components/PanelContent";
import {useParams, withRouter} from "react-router-dom";
import {Button} from "primereact/button";
import {PanelFooter} from "../components/PanelFooter";
import moment from "moment";
import {AutoComplete} from "../components/AutoComplete";
import {Calendar} from "../components/Calendar";
import {Checkbox} from "primereact/checkbox";
import {byKeyOrId} from "../utilidades/FilterUtils";


export const PageAvaliacaoAluno = withRouter((props) => {

	const  id  = props.match.params.id;

	const [avaliacao, setAvaliacao] = useState([]);  

	useEffect(() => id !== "0" && buscar(`/avaliacoes/${id}`).then(json).then(setAvaliacao), [id]);

    const atividade = avaliacao.atividade;
    const questoes = atividade.questoes;
   
	return (
		<Panel header="Prova">
			<PanelContent>
            <DataTable emptyMessage="Nenhum registro encontrado" value={questoes}>
				<Column className="p-col-1" header="Questão" field="texto"/>
                <Column header="Resposta" body={r => (
                            
							<Row value={r.texto} onChange={e => {
								questoes.escolhas.filter(q => byKeyOrId(q, r)).forEach(r => r.texto = e.target.value);
							}}/>
						)}/>
						<Column style={{textAlign: "center", width: "6em"}} header="Correta?" body={r => (
							<Checkbox checked={r.correta}/>
						)}/>	
                                		
			</DataTable>
			</PanelContent>			
		</Panel>
	);
});
