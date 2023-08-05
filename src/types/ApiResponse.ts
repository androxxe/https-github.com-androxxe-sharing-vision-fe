interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  status: "Publish" | "Draft" | "Trash";
  created_at: string; // Use Date type if it's a date string in ISO format
  updated_at: string; // Use Date type if it's a date string in ISO format
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  errors: null | string | any; // You can specify a more detailed type for errors if needed
}

interface GetPostsResponse extends ApiResponse<Post> {}

interface GetListPostsResponse extends ApiResponse<Post[]> {}
