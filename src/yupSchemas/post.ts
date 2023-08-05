import * as yup from "yup";
import { PostStatus } from "../enums/PostStatus";

export const postCreateSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().required(),
  status: yup.string().oneOf(Object.keys(PostStatus)).required(),
});

export const postUpdateSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().required(),
  status: yup.string().oneOf(Object.keys(PostStatus)).required(),
});
