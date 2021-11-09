import {AutoComplete} from "primereact/autocomplete";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useState} from "react";
import {Button} from "primereact/button";

const baseAlunos = [
	{id: 1, nome: "Leonardo"},
	{id: 2, nome: "Alexandre"},
	{id: 3, nome: "Halisson"},
	{id: 4, nome: "Renato"}
];

export default function App() {
	const [turma, setTurma] = useState([]);
	const [query, setQuery] = useState("");
	const [alunos, setAlunos] = useState([]);
	function listarAlunos(event) {
		// START simulando fetch alunos usando event.query
		const response = baseAlunos.filter(a => a.nome.toLowerCase().includes(event.query.toLowerCase()));
		// END simulando fetch alunos usando event.query
		setAlunos(response);
	}
	function adicionarAluno(event) {
		turma.push(event.value);
		setTurma(turma);
		setQuery("");
	}
	function removerAluno(aluno) {
		return (
			<Button icon="pi pi-times" onClick={() => {
				const result = turma.filter(u => u.id !== aluno.id);
				setTurma(result);
			}}/>
		);
	}
	return (
		<div>
			<AutoComplete suggestions={alunos}
			              value={query}
			              onChange={e => setQuery(e.value)}
			              field="nome"
			              completeMethod={listarAlunos}
			              onSelect={adicionarAluno}
			/>
			<DataTable value={turma}>
				<Column header="Nome" field="nome"/>
				<Column header="Remover" body={removerAluno}/>
			</DataTable>
		</div>
	);
}