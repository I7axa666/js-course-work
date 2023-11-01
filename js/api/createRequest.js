/**
 * Основная функция для совершения запросов по Yandex API.
 * 
 * */
const createRequest = (options = {}) => {
    const method = options.method;
    const curl = options.url;
    const token = Yandex.getToken();
    const callback = options.callback;
    console.log(curl);
    const xhr = new XMLHttpRequest;
    try {
        xhr.onload = function() {
            if (xhr.status == 200) {
                callback(xhr.response);
            }

            if (xhr.status == 202 || xhr.status == 204) {
                callback();
            }
        }
        xhr.open(method, curl);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Authorization', 'OAuth ' + token);
        xhr.send();
    }
    catch (err) {
      // перехват сетевой ошибки
      console.error(err);
    }
    
};
