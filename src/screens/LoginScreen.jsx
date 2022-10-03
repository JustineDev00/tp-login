import {React, useRef} from 'react';

const LoginScreen = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            login : emailRef.current.value,
            password : passwordRef.current.value
        });


    }



    return (
        <div className='d-flex flex-column'>
           <h1>Page LoginScreen</h1> 
            <form method='POST'>
                <div className='d-flex flex-column align-items-start'>
                    <label htmlFor='login' className='form-label'>Email adress:</label>
                    <input ref={emailRef} type="email" name="login" id="login" className='form-control w-50' />
                </div>
                <div className='d-flex flex-column align-items-start'>
                    <label htmlFor='login' className='form-label'>Password:</label>
                    <input ref={passwordRef} type="password" name="password" id="password" className='form-control w-50'/>
                    <input type="submit" value="Submit" className='btn btn-primary mt-3'onClick={handleSubmit}/>
                </div>
            </form>


        </div>
    );
};

export default LoginScreen;