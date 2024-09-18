import React from 'react'
import Posts from './Posts'

const PostMainComponent = () => {
    return (
        <div className="bg-blue-200 bg-opacity-50 h-full flex flex-col">
            <div className='flex justify-center mt-3 mb-3 h-[25px]'>
                <input type="text" />
            </div>
            <div className='flex flex-col gap-3 items-center' style={{ height: "80%", background: "red", overflowY: "scroll", }}>
                <div style={{ width: "100%", display: "grid", gap: "10px", alignItems: "center" }}>
                    <Posts />
                    <Posts />
                    <Posts />
                    <Posts />
                </div>
            </div>
        </div>
    )
}

export default PostMainComponent