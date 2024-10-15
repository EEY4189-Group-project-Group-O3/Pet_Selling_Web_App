import React, { useEffect } from 'react'
import Posts from './Posts'
import { Image } from '@chakra-ui/react'
import { axios_instance } from '../../connection/client'
const PostMainComponent = () => {
    const [data, setData] = React.useState([])
    useEffect(() => {
        axios_instance.get('/post/post/')
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            }
            )
    }, [''])
    return (
        <div className=" bg-opacity-50 h-full flex flex-col">
            <div className='flex justify-center items-center mt-3 mb-3 p-2'>
                < div >
                    <Image src='https://bit.ly/dan-abramov' className="mr-5" alt='Dan Abramov' boxSize={"30px"} objectFit='cover' borderRadius={"50%"} />

                </ div>
                <input type="text" placeholder='create your own post' className='rounded-md p-2' />
            </div >
            <div className='flex flex-col gap-3 items-center' style={{ height: "80%", overflowY: "scroll", }}>
                <div style={{ width: "100%", display: "grid", gap: "10px", alignItems: "center" }}>
                    {/* <Posts />
                    <Posts />
                    <Posts />
                    <Posts /> */}
                    {
                        data.map((post: any) => {
                            return (
                                <Posts key={post.id} post={post} />
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default PostMainComponent