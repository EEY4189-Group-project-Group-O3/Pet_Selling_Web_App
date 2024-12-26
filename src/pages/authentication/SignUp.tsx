import { useState } from 'react'
import Logo from '../../assets/Your Pet 1.png'
import { axios_instance } from '../../connection/client'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {

    const navigate = useNavigate()

    const [signUpData, setSignUpData] = useState({
        username: '',
        password: '',
        user_type: 'general_user',
        is_active: true
    })

    const [error, setError] = useState('')

    const handleSubmit = async () => {
        axios_instance.post('user/register/', signUpData)
            .then((response) => {
                const token = response.data;
                localStorage.setItem("token", token.access);
                localStorage.setItem("refresh", token.refresh);

                navigate('/profile-create')

            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const errors = error.response.data.user_errors;
                    const errorMessages = Object.keys(errors)
                        .map((key) => `${key}: ${errors[key].join(', ')}`)
                        .join(' | ');

                    setError(errorMessages);
                    setTimeout(() => {
                        setError('');
                    }, 5000);
                    navigate('/profile-create')
                } else {
                    setError('An unexpected error occurred. Please try again.');
                    setTimeout(() => {
                        setError('');
                    }, 5000);
                }
                console.error('Error during registration:', error);
            });
    }

    return (


        <div className='bg-red-400 w-full h-screen'>
            <div className='flex justify-center'>
                <div className='w-[400px] bg-white rounded-md mt-20'>
                    <div className='flex justify-center p-2'>
                        <img src={Logo} alt="Your Pet Logo" className='w-[200px] h-[200px]' />
                    </div>
                    <form className='p-6' >
                        <h1 className='text-2xl font-bold'>Sign Up</h1>
                        <div className='mb-4'>
                            <label className='block text-black text-sm mb-2' htmlFor='username'>Username</label>
                            <input type='text' id='username' onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })} className='w-full px-3 py-2 border rounded-md focus:outline-none' placeholder='Enter your username' />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-black text-sm mb-2' htmlFor='password'>Password</label>
                            <input type='password' id='password' onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} className='w-full px-3 py-2 border rounded-md focus:outline-none' placeholder='Enter your password' />
                        </div>
                        <div className='flex justify-center'>
                            <button className='login-btn' type='button' onClick={handleSubmit}>Sign Up</button>
                        </div>
                    </form>

                    {
                        error && <div className='mt-2 text-red-500 p-3 flex gap-3 uppercase bg-red-200'>
                            <p>{error}</p>
                        </div>
                    }

                    <div className=' text-black p-3 flex gap-3'>
                        Already have an account? <p className='text-[#ebb961] font-bold'>Sign In</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp