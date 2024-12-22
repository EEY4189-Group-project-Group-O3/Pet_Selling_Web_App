import React from 'react'
import Header from '../../components/Header'
import boy from '../../assets/boy.png'
import girl from '../../assets/girl.png'
import { Image } from '@chakra-ui/react'
import PostMainComponent from '../../components/post/PostMainComponent'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/useUserContext'
const MainView = () => {
    const navigate = useNavigate()
    const { user } = useUserContext()
    if (!user) {
        navigate('/login')
    }
    return (
        <div className='grid h-screen grid-rows-[auto_1fr_auto] '>
            <div className="w-full top-0 left-0">
                <Header />
            </div>
            <div className="content flex h-full w-full mt-12">

                <div className="boy-image absolute inset-0 flex justify-between">
                    <div className="w-3/4 h-full relative" >
                        <Image src={boy} className=" bottom-0 h-2/3 w-full object-cover absolute" style={{ opacity: 0.2 }} />
                    </div>
                    <div className="w-3/4 h-full relative">
                        <Image src={girl} className="bottom-0 h-2/3 w-full object-cover absolute" style={{ opacity: 0.2 }} />
                    </div>
                </div>

                {/* Foreground Content */}
                <div className="relative z-10 flex w-full">

                    <div className="w-1/5 bg-red-300">
                        filter
                    </div>
                    <div className="flex-1 h-full" style={{ height: "100%", }}>
                        <PostMainComponent />
                    </div>
                    {/* <div className="w-1/5 bg-red-300">
                        filter
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default MainView