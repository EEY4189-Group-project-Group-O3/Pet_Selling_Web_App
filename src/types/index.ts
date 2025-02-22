export interface PostLikedUsersInterface {
    user_first_name: string
    user_profile_image: string
}
export interface PostLikesInterface {
    total_likes: number
    total_dislikes: number
    user_liked: boolean
    user_disliked: boolean
    liked_users: PostLikedUsersInterface[]
}



export interface PostCommentUsersInterface {
    user_first_name: string
    user_profile_image: string
    text: string
}
export interface PostCommentsInterface {
    total_comments: number
    user_comments: boolean
    comment_users: PostCommentUsersInterface[]
}