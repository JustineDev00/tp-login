import { useState, useEffect } from 'react';

//useFetch est un hook custom qui permet de faire des requêtes à la BDD pour le maintien de la connexion;
const useFetch = (endpoint, options = {}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [text, setText] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = "http://localhost:80/blog-api/" + endpoint;
            options.credentials = "include";
            // options.headers = {
            //     Authorization: getCookie("blog"),  //plus besoin d'autorisation car les cookies sont transmis directements à l'API via $_COOKIE
            // };
            try {
                const resp = await fetch(url, options);
                const textValue = await resp.text();
                setText(textValue);
                setLoading(false);
                try {
                    const json = JSON.parse(textValue);
                    setData(json);
                }
                catch (e) {
                    setError(e);
                }
            } catch (e) {
                setError(e);
            }

        };
        fetchData();
    }, []);
    return { data, loading, error, text};
};

export default useFetch;