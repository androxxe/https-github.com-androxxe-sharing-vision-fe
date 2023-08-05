export interface PostCreatePayload {
  title: string;
  content: string;
  category: string;
  status: "Publish" | "Draft" | "Trash" | string;
}

export interface PostUpdatePayload {
  title: string;
  content: string;
  category: string;
  status: "Publish" | "Draft" | "Trash" | string;
}

export interface PostGetPayload {
  status: "Publish" | "Draft" | "Trash" | string;
}
