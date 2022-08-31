export const wsConnection = async (socket, timeout = 10000) => {
    const isOpened = () => (socket.readyState === WebSocket.OPEN);

    if (socket.readyState !== WebSocket.CONNECTING) {
        return isOpened();
    } else {
        const intrasleep = 100;
        const ttl = timeout / intrasleep; // time to loop
        let loop = 0;
        while (socket.readyState === WebSocket.CONNECTING && loop < ttl) {
            await new Promise(resolve => setTimeout(resolve, intrasleep));
            loop++;
        }
        return isOpened();
    }
}
