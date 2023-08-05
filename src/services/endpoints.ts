import { PostCreatePayload, PostGetPayload } from "../types/ApiPayload";
import API from "./API";
import qs from "qs";

export const endpoints = {
  createPostAPI: async (
    payload: PostCreatePayload
  ): Promise<GetPostsResponse> => API.post("/article", payload),

  getPostAPI: async (payload: PostGetPayload): Promise<any> => {
    const queryString = qs.stringify(payload);
    return API.get(`/article/1000/10?status=${queryString}`);
  },

  getPostDetailAPI: async (post_id: number): Promise<any> =>
    API.get(`/article/${post_id}`),

  deletePostAPI: async (post_id: number): Promise<any> =>
    API.remove(`/article/${post_id}`, {}),
};
