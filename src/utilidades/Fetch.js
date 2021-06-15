const baseUrl = process.env.REACT_APP_URL || "";

export async function buscar(path) {
	return fetch(baseUrl + path, {headers: buildHeaders()});
}

export async function salvar(path, requestBody) {
	return fetch(baseUrl + path, {method: "post", body: JSON.stringify(requestBody), headers: buildHeaders()});
}

export async function excluir(path) {
	return fetch(baseUrl + path, {method: "delete", headers: buildHeaders()});
}

function buildHeaders() {
	return {
		"Content-Type": "application/json",
		"Authorization": window.localStorage.getItem("X-Auth-Credentials")
	};
}

export async function json(response) {
	if (response.status === 200) {
		return await response.json();
	}
	console.log(`Response status ${response.status}`);
	return null;
}
