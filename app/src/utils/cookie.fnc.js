// from https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

export const setCookie = (name, value = '', domain = '', path = '/') => {
    // Expire in 10 years
    const expires = (new Date(Date.now() + 315569520000)).toUTCString();
    document.cookie = `${name}=${value};expires=${expires};domain=${domain};path=${path}`;
}
