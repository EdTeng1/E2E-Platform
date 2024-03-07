import packageJson from "../../package.json";

const commonUrl = packageJson.proxy;

async function postData(url = "", data = {}, headers = {}) {
	try {
		const response = await fetch(commonUrl + url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
				...headers,
			},
			body: JSON.stringify(data),
		});
		return response.json();
	} catch (error) {
		return null;
	}
}

async function getData(url = "", headers = {}) {
	try {
		const response = await fetch(commonUrl + url, {
			method: "GET",
			headers,
		});
		return response.json();
	} catch (error) {
		return null;
	}
}

export { postData, getData };
