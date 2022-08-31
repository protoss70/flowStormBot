export const getContentAsHtml = (content) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = content;
    return tmp;
};

