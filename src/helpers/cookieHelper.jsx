//Recupère un cookie nommé 'name' si il existe
export const getCookie = (name) => {
    return (
        document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""
    );
};
//crée un cookie contenant les informations contenues dans la réponse après envoi des identifiants
export const setCookie = (name, value, options = {}) => {
    let cookie = name + "=" + value;
    for (let optionKey in options) {
        cookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            cookie += "=" + optionValue;
        }
    }
    document.cookie = cookie;
};
//supprime le cookie en le remplaçant par un cookie "vide"
export const deleteCookie = (name) => {
    setCookie(name, "", {
        "max-age": 0,
    });
};

