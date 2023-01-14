//Реализовать отправку данных на https://jsonplaceholder.typicode.com/posts методом XMLHttpRequest
const sendRequest = (method, url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json'; // получим ответ в формате JSON

        xhr.onload = function () {
            if (xhr.status >= 400) {
                reject(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                console.log(`Получено ${event.loaded} из ${event.total} байт`);
            } else {
                console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
            }
        };

        xhr.onerror = function () {
            console.log("Запрос не удался");
        };

        xhr.send()
    })
}

/* sendRequest("GET", '/db.json')
    .then(data => console.log(data))
    .catch(err => console.log(err)) */

//POST-запрос

const postRequest = (method, url, body) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json'; // получим ответ в формате JSON
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.onload = function () {
            if (xhr.status >= 400) {
                reject(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                console.log(`Получено ${event.loaded} из ${event.total} байт`);
            } else {
                console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
            }
        };

        xhr.onerror = function () {
            console.log("Запрос не удался");
        };

        xhr.send(JSON.stringify(body))
    })
}

const body = sendRequest("GET", '/db.json')
    .then(data => console.log(data))
    .catch(err => console.log(err))


postRequest("POST", 'https://jsonplaceholder.typicode.com/posts', body)
    .then(data => console.log(data))
    .catch(err => console.log(err))

