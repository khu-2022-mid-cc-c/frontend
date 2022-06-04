const axios = require("axios");

async function callAPI(method, url, data) {
    return new Promise((resolve, reject) => {
        const token = "";
        const config = {
            method,
            url,
            data,
            headers: { Authorization: "Bearer " + token },
        };

        axios(config)
            .then(function (response) {
                const data = JSON.stringify(response.data);
                if (data.status) resolve(data);
                else reject(data);
            })
            .catch(function (error) {
                reject(error);
            });

        // const xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;

        // xhr.readystatechange = (e) => {
        //     if (xhr.readyState === xhr.DONE) {
        //         if (xhr.status === 200 || xhr.status === 201) {
        //             resolve(JSON.parse(xhr.response));
        //         }
        //     } else {
        //         reject(`API CALL ${method} => ${url} has failed`);
        //     }
        // };

        // xhr.onerror = (e) => {
        //     reject(`API CALL ${method} => ${url} has failed`);
        // };

        // xhr.open(method, url);
        // xhr.setRequestHeader();
        // xhr.send(data);
    });
}

export default callAPI;
