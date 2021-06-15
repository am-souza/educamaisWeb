import React, { useState } from "react";
import { Panel } from "primereact/panel";
import { handleLogin } from "../utilidades/Auth";
import { Button } from "primereact/button";
import { InputText } from "../components/InputText";
import { PanelContent } from "../components/PanelContent";

export function PageLogin(props) {
	const [login, setLogin] = useState({
		username: "",
		password: ""
	});
	return (
		<Panel header="Autenticação">
			<PanelContent>
				<InputText label="Login" width={12} value={login.username} onChange={e => setLogin({...login, username: e.target.value})}/>
				<InputText label="Senha" width={12} value={login.password} onChange={e => setLogin({...login, password: e.target.value})}/>
				<Button onClick={() => handleLogin(login, props.onLoginSuccessful)}>Login</Button>
			</PanelContent>
		</Panel>
	);
}
