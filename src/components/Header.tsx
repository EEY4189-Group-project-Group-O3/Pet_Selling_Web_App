import { useState, useEffect, useRef } from 'react';
import { ChatIcon, BellIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import bgLogo from '../assets/Your Pet 1.png';
import profile_image from '../assets/profile_image.jpg'
import { CgProfile } from "react-icons/cg";
import { CiSettings, CiLogout } from "react-icons/ci";
import { Divider } from '@chakra-ui/react';
import clsx from 'clsx';
import { Notification } from './notification/Notification';

const Header = () => {
    const [showProfileMenue, setShowProfileMenue] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null)

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');


        window.location.href = '/login';
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowProfileMenue(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-full p-2 bg-orange-600 flex fixed top-0 left-0 transition-transform duration-300 z-50'>
            <section className='flex-1 flex gap-0'>
                <Image src={bgLogo} className="mr-5" alt='Your Pet Logo' boxSize={"30px"} objectFit='cover' />
                <p className='uppercase font-extrabold text-lg'>your pet</p>
            </section>

            <section className='flex-3 flex gap-5'>
                <p className='font-medium'>Home</p>
                <p className='font-medium'>Accessories</p>
            </section>

            <section className='flex-1 flex justify-end gap-3 box-border items-center'>
                <Notification/>
                <ChatIcon w={5} h={5} />
                <div className='block relative'>
                    <Image
                        src={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).profile_image
                            : profile_image}
                        className="mr-5 cursor-pointer"
                        alt='Profile Picture'
                        boxSize={"30px"}
                        objectFit='cover'
                        borderRadius={"50%"}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents the event from reaching the document
                            setShowProfileMenue(!showProfileMenue);
                        }}
                    />

                    <div
                        ref={menuRef}
                        className={clsx(
                            showProfileMenue && 'bg-slate-200 w-60 h-60 absolute top-7 right-5 rounded-lg p-3 flex flex-col justify-between text-lg',
                            !showProfileMenue && 'hidden'
                        )}
                    >
                        <div className='grid gap-3'>
                            <p className='font-semibold flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:bg-slate-400'>
                                <CgProfile size={25} className='text-orange-600' />Profile
                            </p>
                            <p className='font-semibold flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:bg-slate-400'>
                                <CiSettings size={25} className='text-orange-600' />Settings
                            </p>
                        </div>
                        <Divider className='bg-red-500 h-[1px]' />
                        <div>
                            <p
                                className='font-bold flex gap-3 items-center text-blue-600 cursor-pointer p-2 rounded-lg hover:bg-slate-400 hover:text-white'
                                onClick={handleLogout}
                            >
                                <CiLogout size={25} />Logout
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Header;
