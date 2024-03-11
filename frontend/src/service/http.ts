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

		if (!response.ok) {
            // This will catch any response with a status code outside the range 200–299
            throw new Error('Network response was not ok. Status: ' + response.status);
        }

		return response;
	} catch (error) {
		console.error('Error in postData:', error);
        throw error; // Rethrow to be caught by the caller
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
