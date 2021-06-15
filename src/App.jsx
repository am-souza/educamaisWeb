import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { PageLogin } from "./pages/Login";
import { PageMain } from "./pages/Main";
import { UserProvider } from "./utilidades/Auth";
import { buscar } from "./utilidades/Fetch";

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
