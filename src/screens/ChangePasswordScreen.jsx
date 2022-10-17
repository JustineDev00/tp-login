import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useForm } from 'react-hook-form';
import doFetch from '../helpers/fetchHelper';


const ChangePasswordScreen = () => {
    const [errorText, setErrorText] = useState(null);
    const token = useParams('token');

    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const formInvalid = () => console.log("Errors", errors);
    const formSubmit = async (data) => {
        if(data.password === data.passwordConfirm){
            const APIAnswer = await doFetch("login/changePassword", {method : "POST", body : JSON.stringify(data)});
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
    }
    const { data, loading } = useFetch("login/validatePasswordChange", { method: "POST", body: JSON.stringify(token) });


    if (loading) {
        return (
            <div>
                <h1>Changement de mot de passe</h1>
                <p>Merci de patienter...</p>
            </div>
        );

    }
    else {
        return (
            <>
                <h1>Changement de mot de passe</h1>
                <form noValidate className="w-50" onSubmit={handleSubmit(formSubmit, formInvalid)}>
                    <div className="mb-3 d-flex flex-column align-items-start">
                        <label htmlfor='password-input' className='form-label'>Mot de passe:</label>
                        <input id='password-input' type='password' className='form-control' placeholder='nouveau mot de passe' {...register("password", {required: true, minLength: 6, pattern : {value : /^[a-zA-Z]*[A-Z]+[a-zA-Z]+[0-9]*$/g, message:'minimum 6 caractères dont au moins une majuscule'}})}></input>
                    </div>
                    <div className="mb-3 d-flex flex-column align-items-start">
                        <label htmlfor='password-confirm-input'className='form-label'>Valider le mot de passe:</label>
                        <input id='password-confirm-input' type='password' className='form-control' placeholder='valider le nouveau mot de passe' {...register("passwordConfirm", {required: true, minLength: 6, pattern : {value : /^[a-zA-Z]*[A-Z]+[a-zA-Z]+[0-9]*$/g, message:'minimum 6 caractères dont au moins une majuscule'}})}></input>
                    </div>
                    <input type='hidden' value = {data.id} {...register('id', {required : true})}></input>
                    <p>{errorText}</p>
                    <button type='submit' className="btn btn-primary mt-3">Valider</button>
                </form>
            </>
        )
    }


};

export default ChangePasswordScreen;