import { axios_instance } from "../../../connection/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostCategoryInterface } from "../../../types";
const requestPetPost = async (
  data: any,
  request: string,
  rq_type: string,
  params: any,
  content_type: string | null
) => {
  const headers = {
    "Content-Type": content_type === null ? "application/json" : content_type,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  if (rq_type === "POST") {
    return await axios_instance.post(request, data, { headers }).then((res) => {
      return res.data;
    });
  }
  if (rq_type === "GET") {
    return await axios_instance
      .get(request, {
        params: params,
        headers,
      })
      .then((res) => {
        return res.data;
      });
  }
  if (rq_type === "DELETE") {
    return await axios_instance.delete(request, { headers }).then((res) => {
      return res.data;
    });
  }
  if (rq_type === "PUT") {
    return await axios_instance.put(request, data, { headers }).then((res) => {
      return res.data;
    });
  }
};

export const useGetPostCatrgoties = (params: any) => {
  return useQuery<PostCategoryInterface[], Error>({
    queryKey: ["get-pet-categories", params.page],
    queryFn: () =>
      requestPetPost(null, "/post/category/all", "GET", params, null),
  });
};

// export const useGetPetPostLikes = (params: any, id: number) => {
//   return useQuery<PostLikesInterface, Error>({
//     queryKey: ["get-pet-posts-likes", id],
//     queryFn: () =>
//       requestPetPost(null, `/post/likes/${id}`, "GET", params, null),
//   });
// };

// export const useGetPetPostComments = (params: any, id: number) => {
//   return useQuery<PostCommentsInterface, Error>({
//     queryKey: ["get-pet-posts-comments", id],
//     queryFn: () =>
//       requestPetPost(null, `/post/comments/${id}`, "GET", params, null),
//   });
// };

// export const useAddPetPost = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["add-pet-posts"],
//     mutationFn: (data: any) =>
//       requestPetPost(data, "/post/post/", "POST", {}, "multipart/form-data"),

//     // onError: (error) => {
//     //     return true
//     // },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["get-pet-posts"],
//         exact: false,
//         refetchType: "all",
//       });
//     },
//   });
// };

// export const useLikePost = (id: number) => {
//   const queryClient = useQueryClient();
//   return useMutation<void, Error, void>({
//     mutationKey: ["add-pet-like"],
//     mutationFn: () =>
//       requestPetPost(null, `/post/like/${id}`, "POST", {}, null),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["get-pet-posts-likes", id],
//         exact: false,
//       });
//     },
//   });
// };

// export const useDisLikePost = (id: number) => {
//   const queryClient = useQueryClient();
//   return useMutation<void, Error, void>({
//     mutationKey: ["add-pet-dislike"],
//     mutationFn: () =>
//       requestPetPost(null, `/post/dislike/${id}`, "POST", {}, null),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["get-pet-posts-likes", id],
//         exact: false,
//       });
//     },
//   });
// };

// export const useAddComment = (id: number) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["add-pet-comment"],
//     mutationFn: (data: any) =>
//       requestPetPost(data, `/post/comments/${id}`, "POST", {}, null),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["add-pet-posts", id],
//         exact: false,
//       });
//     },
//   });
// };
