import {React, useRef, useState} from 'react';

const LoginScreen = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const formRef = useRef(null);
    const [isValid, setIsValid] = useState(false);
    const [emailWarning, setEmailWarning] = useState('must be a valid e-mail address');
    const [passwordWarning, setPasswordWarning] = useState('6 characters including a capital letter');
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ;
    
    function checkUppercase(str){
        for (var i=0; i<str.length; i++){
          if (str.charAt(i) == str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)){
            return true;
          }
        }
        return false;
    };


    
    const checkIfValid = () => {
        const emailValid = regex.test(emailRef.current.value);
        const passwordValid =  checkUppercase(passwordRef.current.value);
        const passwordLength = passwordRef.current.value.length;
        setEmailWarning(emailValid ? '' :'must be a valid e-mail address' );
        setPasswordWarning(passwordValid && passwordLength >= 6 ? '' : '6 characters including a capital letter');
        setIsValid(emailValid && passwordValid);
        }
        
    


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));   //crée un objet à partir des entrées de l'objet FormData qui récupère les données de la cible de l'event, ici un form (sous la forme de paires clés/valeurs si les inputs ont bien un nom)
        console.log(
            formData
        );
        const jsonData = JSON.stringify(formData);
        fetch('http://blog.api/login' , {method: "POST", body : jsonData})
        .then(resp => resp.json())
        .then(json => console.log(json))

    }

    return (
        <div className='d-flex flex-column'>
           <h1>Page LoginScreen</h1> 
            <form ref={formRef} method='POST' onSubmit={handleSubmit}>
                <div className='d-flex flex-column align-items-start'>
                    <label htmlFor='login' className='form-label'>Email adress:</label>
                    <input ref={emailRef} type="email" name="email" id="email" className='form-control w-50' onChange={checkIfValid} />
                    <p id="email-text-warning" className='text-danger fst-italic'>{emailWarning}</p>
                </div>
                <div className='d-flex flex-column align-items-start'>
                    <label htmlFor='login' className='form-label'>Password:</label>
                    <input ref={passwordRef} type="password" name="password" id="password" className='form-control w-50' onChange={checkIfValid}/>
                    <p id='email-text-warning' className='text-danger fst-italic'>{passwordWarning}</p>
                    <input type="submit" value="Submit" className='btn btn-primary mt-3' disabled={!isValid}/>
                </div>
            </form>


        </div>
    );
    }

export default LoginScreen;