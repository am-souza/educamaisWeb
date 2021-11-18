import React, {useState} from "react";
import {Panel} from "primereact/panel";
import {handleLogin} from "../utilidades/Auth";
import {Button} from "primereact/button";
import {InputText} from "../components/InputText";
import {PanelContent} from "../components/PanelContent";
import {PanelFooter} from "../components/PanelFooter";
import "./Pages.scss";
import l from "../img/logo.jpg"



export function PageLogin(props) {
	const [login, setLogin] = useState({
		username: "",
		password: ""
	});
	return (
		<div className="p-grid">	
			<div className="p-col-6 p-mt-6 p-offset-5 ">
				<img src={l} alt="Sem Texto" width="300"/>
			</div>		
			<div className="p-col-12 p-align-center">
				<div className="login-form">
					<Panel header="Autenticação">
						<PanelContent>
							<InputText label="Login" width={12} value={login.username} onChange={e => setLogin({...login, username: e.target.value})}/>
							<InputText type="password" label="Senha" width={12} value={login.password} onChange={e => setLogin({...login, password: e.target.value})}/>
						</PanelContent>
						<PanelFooter>
							<Button icon="pi pi-sign-in" label="Login" onClick={() => handleLogin(login, props.onLoginSuccessful)} />
						</PanelFooter>
					</Panel>
				</div>
			</div>
		</div>
	);
}
