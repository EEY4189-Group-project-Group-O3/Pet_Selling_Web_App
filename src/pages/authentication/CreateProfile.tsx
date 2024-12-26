import { useState } from 'react'
import Logo from '../../assets/Your Pet 1.png'
import { axios_instance } from '../../connection/client'
import { useNavigate } from 'react-router-dom'

const CreateProfile = () => {
    const navigate = useNavigate()

    const [signUpData, setSignUpData] = useState<{
        first_name: string;
        last_name: string;
        email: string;
        address: string;
        phone: string;
        gender: string;
        profile_image: File | null;
    }>({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        phone: '',
        gender: '',
        profile_image: null,
    });
    const [error, setError] = useState('')

    const handleSubmit = async () => {

        const formData = new FormData();

        Object.entries(signUpData).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value as string | Blob);
            }
        });
        const user = JSON.parse(localStorage.getItem('token') || '{}');

        axios_instance.post('user/profile/', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user}`
                },
            }
        )
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/');
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
                    <form className='p-6'>
                        <h1 className='text-2xl font-bold'>Setup Profile</h1>

                        {/* First Name */}
                        <div className='mb-4'>
                            <label className='block text-black text-sm mb-2' htmlFor='first_name'>First Name</label>
                            <input
                                type='text'
                                id='first_name'
                                onChange={(e) => setSignUpData({ ...signUpData, first_name: e.target.value })}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                placeholder='Enter your first name'
                            />
                        </div>

                        {/* Last Name */}
                        <div className='mb-4'>
                            <label className='block text-black text-sm mb-2' htmlFor='last_name'>Last Name</label>
                            <input
                                type='text'
                                id='last_name'
                                onChange={(e) => setSignUpData({ ...signUpData, last_name: e.target.value })}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                placeholder='Enter your last name'
                            />
                        </div>

                        {/* Email */}
                        <div className='mb-4'>
                            <label className='block text-black text-sm mb-2' htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                placeholder='Enter your email'
                            />
                        </div>

                        {/* Address */}
                        <div className='mb-4'>
                            <label className='block text-black text-sm mb-2' htmlFor='address'>Address</label>
                            <input
                                type='text'
                                id='address'
                                onChange={(e) => setSignUpData({ ...signUpData, address: e.target.value })}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                placeholder='Enter your address'
                            />
                        </div>

                        {/* Phone */}
                        <div className='mb-4'>
                            <label className='block text-black text-sm mb-2' htmlFor='phone'>Contact Number</label>
                            <input
                                type='text'
                                id='phone'
                                onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                placeholder='Enter your contact number'
                            />
                        </div>

                        {/* Gender */}
                        <div className='mb-4'>
                            <label className='block text-black text-sm mb-2' htmlFor='gender'>Gender</label>
                            <select
                                id='gender'
                                onChange={(e) => setSignUpData({ ...signUpData, gender: e.target.value })}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                            >
                                <option value='' disabled selected>
                                    Select your gender
                                </option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>

                        {/* Profile Image */}
                        <div className='mb-4'>
                            <label className='block text-black text-sm mb-2' htmlFor='profile_image'>Profile Image</label>
                            <input
                                type="file"
                                id="profile_image"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setSignUpData({ ...signUpData, profile_image: e.target.files[0] });
                                    }
                                }}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className='flex justify-center'>
                            <button className='login-btn' type='button' onClick={handleSubmit}>Sign Up</button>
                        </div>
                    </form>


                    {
                        error && <div className='mt-2 text-red-500 p-3 flex gap-3 uppercase bg-red-200'>
                            <p>{error}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateProfile