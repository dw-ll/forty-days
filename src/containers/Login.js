import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Loader from '../components/Loader';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import '../styles/app.css';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    function validateSignIn() {
        return email.length > 0 && password.length > 0;
    };
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(email, password);
            props.setAuthenticatedUser(true);
            props.history.push('/');
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    };
    return (
        <div class='login sm:flex sm:pt-24 sm:justify-center'>
            <div class='w-full max-w-xs'>
                <BlockUi tag='div' blocking={isLoading}>
                    <form class='bg-white shadow-lg rounded px-8 pt-8 pb-6 mb-4' onSubmit={handleSubmit}>
                        <div class='mb-4'>
                            <label class='block text-gray-700 text-sm font-bold mb-2' for='email'>
                                Email Address
                    </label>

                            <input class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Email Address' onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div class='mb-6'>
                            <label class='block text-gray-700 text-sm font-bold mb-2' for='email'>
                                Password
                    </label>

                            <input class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div class='flex items-center justify-between'>
                            <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none' disabled={!validateSignIn()} type='submit'>
                                Sign In
                        </button>
                        </div>
                    </form>
                </BlockUi>
            </div>
        </div>

    );
}
export default Login;