import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { axios_instance } from '../../connection/client';
import { calculateTimeAgo } from '../../utils/CalculateTimeAgo';
import { IoSendSharp } from "react-icons/io5";
import clsx from 'clsx';
import { useAddComment, useDisLikePost, useGetPetPostComments, useGetPetPostLikes, useLikePost } from '../../pages/PetViewSection/hooks/PetPostHook';
const Posts = ({ initialPost }: any) => {
    const [post, setPost] = useState(initialPost);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState({
        comment: '',
    });

    const { data: post_likes, refetch: likes_refetch } = useGetPetPostLikes({}, post.id)
    const { data: post_comments, refetch: comments_refetch } = useGetPetPostComments({}, post.id)


    const { mutate: likePostMutate } = useLikePost(post.id)
    const { mutate: disLikePostMutate } = useDisLikePost(post.id)
    const { mutate: addcomment } = useAddComment(post.id)



    const handleAddLike = () => {

        if (!post_likes) return;

        const updatedLikes = {
            ...post_likes,
            total_likes: post_likes.user_liked ? post_likes.total_likes - 1 : post_likes.total_likes + 1,
            user_liked: !post_likes.user_liked,
            user_disliked: post_likes.user_disliked ? false : post_likes.user_disliked,
            total_dislikes: post_likes.user_disliked ? post_likes.total_dislikes - 1 : post_likes.total_dislikes,
        };

        setPost((prevPost) => ({
            ...prevPost,
            total_likes: updatedLikes.total_likes,
        }));

        likePostMutate(null, {
            onSuccess: () => {
                likes_refetch();
            },
            onError: (err) => {
                console.error("Error liking post:", err);
                likes_refetch();
            },
        });

    }


    const handleAddDisLike = () => {

        if (!post_likes) return;

        const updatedLikes = {
            ...post_likes,
            total_likes: post_likes.user_liked ? post_likes.total_likes - 1 : post_likes.total_likes,
            user_liked: post_likes.user_liked ? false : post_likes.user_liked,
            user_disliked: !post_likes.user_disliked,
            total_dislikes: post_likes.user_disliked ? post_likes.total_dislikes - 1 : post_likes.total_dislikes + 1,
        };

        setPost((prevPost) => ({
            ...prevPost,
            total_likes: updatedLikes.total_likes,
        }));

        disLikePostMutate(null, {
            onSuccess: () => {
                likes_refetch();
            },
            onError: (err) => {
                console.error("Error liking post:", err);
                likes_refetch();
            },
        });

    }

    const handleSendComment = () => {
        addcomment(comment, {
            onSuccess: () => {
                comments_refetch();
            },
            onError: (err) => {
                console.error("Error adding comment:", err);
                comments_refetch();
            }
        })
    }

    return (
        <div className='bg-white w-11/12 h-auto rounded-xl ml-auto mr-auto p-5 overflow-hidden'>
            <div className='flex justify-between'>
                <section>
                    <section className='flex gap-3'>

                        <Image src='http://localhost:8000/media/profile_images/Logo-1.webp' borderRadius={"50%"} boxSize={"50px"} objectFit='contain' className='border-solid border-2 border-sky-500' />
                        <section className='flex flex-col gap-0'>
                            <p className='font-bold text-red-900'>{post.profile_data.first_name === null ? "By Me" : post.profile_data.first_name} </p>
                            <p className='font-normal text-sm text-black'>{calculateTimeAgo(post.date_time)}</p>
                        </section>
                    </section>
                </section>

                <section className='flex gap-2'>
                    <section className='flex'>
                        <AiOutlineLike size={post_likes?.user_liked ? "25" : 20} onClick={handleAddLike} className='hoverComponent text-blue-500' />
                        {post_likes?.total_likes}

                    </section>
                    <section className='flex'>

                        <AiOutlineDislike size={post_likes?.user_disliked ? "25" : 20} onClick={handleAddDisLike} className='hoverComponent text-red-500' />

                        {post_likes?.total_dislikes}
                    </section>
                </section>

            </div>

            <div className='flex justify-center'>
                <div className='w-[87%] overflow-hidden'>

                    <section>

                        <p className='text-black font-semibold'>
                            {post.text}
                        </p>
                    </section>

                    <section className='grid grid-cols-2 gap-2 mt-2'>

                        {
                            post.images?.map((image: any, index: number) => {
                                return (
                                    <Image key={index} src={image.image} className='w-full h-[133px] object-cover' />
                                )
                            })
                        }


                    </section>

                </div>
            </div>
            <div className='text-black flex gap-3'>
                <div
                    className={clsx(
                        showComments && 'font-bold',
                        !showComments && 'font-normal',
                        'mt-2 flex gap-3 items-center'
                    )}>
                    <span

                        className='hover:underline hover:cursor-pointer' onClick={() => setShowComments(!showComments)}>Comments</span>
                    <span>{post_comments?.total_comments}</span>
                </div>

            </div>

            <div
                className={clsx(
                    showComments && 'w-full min-h-32 max-h-96 bg-slate-200 p-3 mt-2 rounded-md overflow-auto flex flex-col gap-2 justify-between',
                    !showComments && 'hidden'
                )}
            >

                <ul>
                    {
                        post_comments?.liked_users.map((comment: any, index: number) => {
                            return (
                                <li key={index} className='bg-white p-2 rounded-md mb-2 flex gap-5 items-center'>
                                    <Image src={comment.user_profile_image} boxSize={"30px"} objectFit='cover' borderRadius={"50%"} />
                                    <p className='font-semibold'>{comment.user_first_name}:</p>
                                    <p>{comment.text}</p>
                                </li>
                            )
                        })
                    }


                </ul>

                <div className='flex gap-3 items-center'>
                    <input type="text" placeholder='Add a comment' className='rounded-md p-2' onChange={(e) => setComment({ ...comment, comment: e.target.value })} />
                    <IoSendSharp size='25px' className='text-orange-600 hover:text-blue-500' onClick={handleSendComment} />
                </div>
            </div>
        </div>
    )
}

export default Posts;
