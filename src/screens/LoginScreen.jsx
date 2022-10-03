import {React, useRef} from 'react';

const LoginScreen = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const formRef = useRef(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));   //crée un objet à partir des entrées de l'objet FormData qui récupère les données de la cible de l'event, ici un form (sous la forme de paires clés/valeurs si les inputs ont bien un nom)
        console.log(
            formData
        );


    }

    return (
        <div className='d-flex flex-column'>
           <h1>Page LoginScreen</h1> 
            <form ref={formRef} method='POST' onSubmit={handleSubmit}>
                <div className='d-flex flex-column align-items-start'>
                    <label htmlFor='login' className='form-label'>Email adress:</label>
                    <input ref={emailRef} type="email" name="login" id="login" className='form-control w-50' />
                </div>
                <div className='d-flex flex-column align-items-start'>
                    <label htmlFor='login' className='form-label'>Password:</label>
                    <input ref={passwordRef} type="password" name="password" id="password" className='form-control w-50'/>
                    <input type="submit" value="Submit" className='btn btn-primary mt-3'/>
                </div>
            </form>


        </div>
    );
};

export default LoginScreen;