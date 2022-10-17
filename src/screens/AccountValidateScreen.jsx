import {React, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useForm } from 'react-hook-form';
import doFetch from '../helpers/fetchHelper';


function AccountValidateScreen() {
    const [errorText, setErrorText] = useState(null);
    const {register, handleSubmit, formState : {errors}} = useForm();
    const navigate = useNavigate();
    const formInvalid = () => console.log("Errors", errors);
    const formSubmit = async (data) => {
        if(data.password === data.passwordConfirm){
            const APIAnswer = await doFetch("login/create", {method : "POST", body : JSON.stringify(data)});
            console.log("Received info:", APIAnswer.data);
            //done : send to API
            if(APIAnswer.data.result){
                navigate('/login');
            }
            else{
                setErrorText('Une erreur est survenue lors de la création du compte');
            }
        }
        else{
            setErrorText('Erreur : les deux valeurs de mots de passe ne sont pas identiques');
        }
        // console.log("validated data", data);

    }
    const token = useParams('token');
   
    const {data, loading} = useFetch("login/validate", 
    {method: "POST", body:JSON.stringify(token)
}
);
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
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor='password-input' className='form-label'>Mot de passe:</label>
                    <input id='password-input' type= 'password' className = "form-control" placeholder='type password here' {...register("password", {required : true, minLength : 6, pattern : {value : /^[a-zA-Z]*[A-Z]+[a-zA-Z]+[0-9]*$/g, message : 'at least one uppercase letter'}})}></input>
                </div>

                <div className="mb-3 d-flex flex-column
                 align-items-start">
                             <label htmlFor='password-confirm-input' className='form-label'>Confirmer le mot de passe:</label>
                    <input id='password-confirm-input' type= 'password' className = "form-control" placeholder='confirm password here' {...register("passwordConfirm", {required : true, minLength : 6, pattern : {value : /^[a-zA-Z]*[A-Z]+[a-zA-Z]+[0-9]*$/g, message : 'at least one uppercase letter'}})}></input>
                    <button type='submit' className="btn btn-primary mt-3">Submit</button>
                </div>
                
                <input type='hidden' value={data.mail} {...register("mail", {required: true})}/>
                <input type='hidden' value={data.pseudo} {...register("pseudo", {required: true})}/>
                <p>{errorText}</p>
            </form>
           </>

            : 
           
           <p>"Une erreur est survenue, veuillez recommencer votre inscription SVP"</p>}
            </>
            
        ); 
    }
  
};

export default AccountValidateScreen;