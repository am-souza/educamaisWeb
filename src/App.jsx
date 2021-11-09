import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { PageLogin } from "./pages/Login";
import { PageMain } from "./pages/Main";
import { UserProvider } from "./utilidades/Auth";
import { buscar } from "./utilidades/Fetch";
import {addLocale, locale} from "primereact/api";

addLocale("pt-BR", {
	firstDayOfWeek: 1,
	dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
	dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
	dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
	monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
	monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
	today: "Hoje",
	clear: "Limpar"
});

locale("pt-BR");

export default function App() {
	const [usuario, setUsuario] = useState();
	useEffect(() => {
		buscar("/usuarios/eu").then(response => {
			if (response.status === 200) {
				response.json().then(setUsuario);
			}
		});
	}, []);
	if (usuario) {
		return (
			<UserProvider value={usuario}>
				<BrowserRouter>
					<PageMain/>
				</BrowserRouter>
			</UserProvider>
		);
	} else {
		return <PageLogin onLoginSuccessful={setUsuario}/>;
	}
}
