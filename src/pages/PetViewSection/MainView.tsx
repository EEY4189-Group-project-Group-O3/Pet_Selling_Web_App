import React from 'react'
import Header from '../../components/Header'
import boy from '../../assets/boy.png'
import girl from '../../assets/girl.png'
import { Image } from '@chakra-ui/react'
import PostMainComponent from '../../components/post/PostMainComponent'

const MainView = () => {
    return (
        <div className='grid h-screen grid-rows-[auto_1fr_auto] '>
            <div className="w-full">
                <Header />
            </div>
            <div className="content flex h-full w-full">

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
                    <div className="flex-1 h-full">
                        <PostMainComponent />
                    </div>
                    <div className="w-1/5 bg-red-300">
                        filter
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MainView