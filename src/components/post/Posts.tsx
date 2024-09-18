import { Image } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Posts = () => {
    return (
        <div className='bg-orange-500 w-11/12 h-[500px] rounded-xl ml-auto mr-auto p-5 overflow-hidden'>
            <div className='flex justify-between'>
                <section>
                    <section className='flex gap-3'>
                        <Image src='https://via.placeholder.com/150' borderRadius={"50%"} boxSize={"50px"} objectFit='cover' />
                        <section className='flex flex-col gap-0'>
                            <p className='font-bold text-red-900'>ABC Pet Store </p>
                            <p className='font-normal text-sm text-white'>1h ago</p>
                        </section>
                    </section>
                </section>

                <section className='flex gap-2'>
                    <section className='flex'>
                        <AiOutlineLike size="20" style={{ color: "blue" }} />
                        15
                    </section>
                    <section className='flex'>
                        <AiOutlineDislike size="20" style={{ color: "red" }} />
                        10
                    </section>
                </section>

            </div>

            <div className='flex justify-center'>
                <div className='w-[87%] overflow-hidden'>

                    <section>
                        Lorem ipsum dolor sit amet consectetur
                        <p></p>
                    </section>

                    <section className='flex gap-1'>
                        <section className='flex-1'>
                            <Image src='https://via.placeholder.com/150' className='w-full h-[400px] object-cover' />
                        </section>
                        <section className='flex flex-col gap-1 flex-1'>
                            <Image src='https://via.placeholder.com/150' className='w-full h-[133px] object-cover' />
                            <Image src='https://via.placeholder.com/150' className='w-full h-[133px] object-cover' />
                            <Image src='https://via.placeholder.com/150' className='w-full h-[133px] object-cover' />
                        </section>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default Posts;
