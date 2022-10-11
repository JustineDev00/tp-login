import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";
import { deleteCookie, getCookie } from "../helpers/cookieHelper";
import doFetch from "../helpers/fetchHelper";

const AuthContext = createContext();  
//initialisation d'un Context, qui va essentiellement servir à passer des valeurs (qui peuvent être des variables de type primitif, des objets, des fonctions...) d'un parent à toute sa "descendance" : enfants directs mais aussi petits-enfants, arrière-petits enfants. La transmission se fait grâce à AuthContext.Provider ("Provider" dans le sens de fournisseur de valeur)


const AuthProvider = ({children}) => {   //génération de l'élément JSX AuthContext.Provider qui va transmettre une valeur (propriété value) à ses enfants (children) 

    // const getCookieValue = (name) => {
    //     return document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
    // } //remplacee par la méthode importée getCookie
    const [auth, setAuth] = useState({role :0, id:0});  //constante d'état qui prend comme valeur initiale un objet à une propriété (role) dont la valeur est 0
    //--> changement de auth : changement de value de AuthProvider : changement de comportement/d'affichage/etc des children
    useEffect(() => {
            const check = async() => {
                const {data} = await doFetch("login/check");
            
            if(data.result){
                setAuth({role: +data.role, id: +data.id});
            }
            else{
                setAuth({role: 0, id: 0});
                deleteCookie("blog");
            }
        }
        check();
    }, []);
    
    
    return (
        <AuthContext.Provider value={{auth, setAuth}}>  
        {children}
        {/*Les children sont en capacité de recevoir non seulement auth mais aussi setAuth, la fonction qui permet de changer la valeur de auth.  */}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider};   //Ne pas oublier d'exporter les deux constantes, elles seront utilisées toutes les deux pour transmettre les valeurs à tous les composants enfants

