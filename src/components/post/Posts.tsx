import { Image } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Posts = ({ post }) => {
    return (
        <div className='bg-orange-500 w-11/12 h-[500px] rounded-xl ml-auto mr-auto p-5 overflow-hidden'>
            <div className='flex justify-between'>
                <section>
                    <section className='flex gap-3'>
                        <Image src='http://localhost:8000/media/profile_images/Logo-1.webp' borderRadius={"50%"} boxSize={"50px"} objectFit='contain' />
                        <section className='flex flex-col gap-0'>
                            <p className='font-bold text-red-900'>{post.profile_data.first_name} </p>
                            <p className='font-normal text-sm text-white'>1h ago</p>
                        </section>
                    </section>
                </section>

                <section className='flex gap-2'>
                    <section className='flex'>
                        <AiOutlineLike size="20" style={{ color: "blue" }} />
                        {post.total_likes}

                    </section>
                    <section className='flex'>
                        <AiOutlineDislike size="20" style={{ color: "red" }} />
                        {post.total_dislikes}
                    </section>
                </section>

            </div>

            <div className='flex justify-center'>
                <div className='w-[87%] overflow-hidden'>

                    <section>

                        <p>
                            {post.text}
                        </p>
                    </section>

                    <section className='flex gap-1'>
                        <section className='flex-1'>
                            <Image src={`http://localhost:8000/media/post_images/Image_2.png`} className='w-full h-[400px] object-cover' />
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
