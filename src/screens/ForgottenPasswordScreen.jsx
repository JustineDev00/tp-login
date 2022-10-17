import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import doFetch from '../helpers/fetchHelper';

const ForgottenPasswordScreen = () => {
     const [msg, setMsg] = useState(null);
    const {register, handleSubmit, formState : {errors}} = useForm();
    const formInvalid = () => console.log("Errors", errors);
    const formSubmit = async (data) => {
        console.log("TO DO : requête API");
        const APIAnswer = await doFetch("login/forgottenPassword", {method : "POST", body : JSON.stringify(data)});
        setMsg(APIAnswer.data.message);


    }
    
    
    return (
        <div>
            <form className = 'w-50' onSubmit = {handleSubmit(formSubmit, formInvalid)}>
            <div className="mb-3 d-flex flex-column align-items-start">
                <label htmlForm='mail' className='form-label'>Adresse e-mail de votre compte:
                </label>
                <input id='mail' type='email' className='form-control w-50' placeholder='example@xyz.com' {...register('email', {required : true, pattern : {
                    value : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message : `format de l'adresse mail invalide`
                }})}>
                </input>
                <button type='submit' className="btn btn-primary mt-3">Submit</button>
                
            </div>
            </form>
            <p>{msg}</p>
        </div>
    );
};

export default ForgottenPasswordScreen;