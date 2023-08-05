import {
  PostCreatePayload,
  PostGetPayload,
  PostUpdatePayload,
} from "../types/ApiPayload";
import API from "./API";
import qs from "qs";

export const endpoints = {
  createPostAPI: async (
    payload: PostCreatePayload
  ): Promise<GetPostsResponse> => API.post("/article", payload),

  patchPostAPI: async (
    post_id: number,
    payload: PostUpdatePayload
  ): Promise<GetPostsResponse> => API.patch(`/article/${post_id}`, payload),

  getPostAPI: async (
    payload: PostGetPayload
  ): Promise<GetListPostsResponse> => {
    const queryString = qs.stringify(payload);
    return API.get(`/article/1000/10?${queryString}`);
  },

  getPostDetailAPI: async (post_id: number): Promise<GetPostsResponse> =>
    API.get(`/article/${post_id}`),

  deletePostAPI: async (post_id: number): Promise<ApiResponse<null>> =>
    API.remove(`/article/${post_id}`, {}),
};
