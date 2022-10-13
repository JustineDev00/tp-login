import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useForm } from 'react-hook-form';


function AccountValidateScreen() {
    const {register, handleSubmit, formState : {errors}} = useForm();
    const formInvalid = () => console.log("Errors", errors);
    const formSubmit = async (data) => {
        console.log("validated data", data);
        //to do : send to API
    }
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
           {data.result? 
           <>
            <form noValidate className='w-50' onSubmit={handleSubmit(formSubmit, formInvalid)}>
                <div className="mb-3 d-flex flex-column align-items start">
                    <label htmlFor='password-input' className='form-label'>Mot de passe:</label>
                    <input id='password-input' type= 'password' className = "form-control" placeholder='type password here' {...register("password", {required : true, minLength : 6})}></input>
                </div>

                <div className="mb-3 d-flex flex-column
                 align-items-start">
                             <label htmlFor='password-confirm-input' className='form-label'>Confirmer le mot de passe:</label>
                    <input id='passwnord-confirm-input' type= 'password' className = "form-control" placeholder='confirm password here' {...register("password-confirm", {required : true, minLength : 6})}></input>
                    <button type='submit' className="btn btn-primary mt-3">Submit</button>
                </div>
            </form>
           </>

            : 
           
           <p>"Une erreur est survenue, veuillez recommencer votre inscription SVP"</p>}
            </>
            
        ); 
    }
  
};

export default AccountValidateScreen;