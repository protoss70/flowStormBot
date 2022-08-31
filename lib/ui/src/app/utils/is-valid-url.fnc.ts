export const isValidUrl = (url: string): boolean => {
    const _url = url && url.split(":/") || '';
    return ["http", "https", "ws", "wss"].indexOf(_url[0]) !== -1;
}

