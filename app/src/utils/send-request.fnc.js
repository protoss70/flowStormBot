export const sendRequest = (
    url,
    method,
    callback,
    token = null,
    data = null,
    notFoundCallback = () => {
        console.log('Not found');
    },
    ) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = 'json';
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && (xmlHttp.status === 200 || xmlHttp.status === 204)){
            callback(xmlHttp.response);
        } else if (xmlHttp.readyState === 4){
            notFoundCallback();
        }
    }
    xmlHttp.open(method, url, true); // true for asynchronous
    if (token !== null) {
        xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
    }
    xmlHttp.send(data);
}
