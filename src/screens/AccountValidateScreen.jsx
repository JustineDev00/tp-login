import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';


function AccountValidateScreen() {
    const token = useParams('token');
    console.log(token);
    const {data, loading} = useFetch("login/validate", {method: "POST", body:JSON.stringify(token)
});
    if(loading){
        return (
        <>
        <h1>Validation du compte</h1>
        'Veuillez patienter...'
        </> 
        );
    }
    else{
        return(
            <>
            <h1>Validation du compte</h1>
            <p>Token : {data}</p>
            </>
            
        ); 
    }
  
};

export default AccountValidateScreen;