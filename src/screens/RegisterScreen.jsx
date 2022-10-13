import {React, useState} from "react";
import { useForm } from 'react-hook-form';
import doFetch from "../helpers/fetchHelper";



export default function RegisterScreen() {
    const [msg, setMsg] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const formInvalid = () => console.log("Errors", errors);
    const formSubmit = async (data) => {       //data == les données du formulaire sous la forme d'un objet où clé = nom du champ et valeur = valeur du champ
        console.log("Validated Data", data);
        const APIAnswer = await doFetch("login/register",{method : "POST", body : JSON.stringify(data)} );
        //!! attention à ne pas oublier la méthode et le corps dans l'appel de doFetch//
        
        console.log("Received info:", APIAnswer.data.message);
        setMsg(APIAnswer.data.message);

    }

    
    return (
        <>
            <h1>Register</h1>

            <form noValidate className="w-50" onSubmit={handleSubmit(formSubmit, formInvalid)}>
                <div className='mb-3 d-flex flex-column justify-content-start'>
                    <label htmlFor="pseudo-input" className='form-label'>Pseudo <i className={'text-danger'}>{errors.pseudo ? " *" : " "}</i></label>

                    <input id="pseudo-input" type='text' placeholder="pseudo" className="form-control" {...register("pseudo", { required: true, minLength: 3 })} />
                    <i className={"text-danger d-block"}>{errors.pseudo ? "* at least 3 chars" : ""}</i>
                </div>
                <div>
                    <label htmlFor="email-input" className="form-label">
                     Email <i className={"text-danger"}>{errors.email ?  " *" : ""}</i>   
                    </label>
                    <input id="email-input" type="email" placeholder="email" className="form-control" {...register("email", {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}/>
                    <i className={"text-danger d-block"}>{errors.email ? "* must be a valid email address" : ""}</i>
                </div>
                <button type='submit' className="btn btn-primary">Submit</button>
            </form>
            <div className="text-primary">{msg}</div>
        </>
    );
}