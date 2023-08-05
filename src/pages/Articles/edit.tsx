import { FormProvider, useForm } from "react-hook-form";
import { Layout } from "../layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { postCreateSchema } from "../../yupSchemas/post";
import { PostCreatePayload } from "../../types/ApiPayload";
import { PostStatus } from "../../enums/PostStatus";
import { toast } from "react-toastify";
import { endpoints } from "../../services/endpoints";
import { errorParse } from "../../helpers/errorParse";
import { useNavigate, useParams } from "react-router-dom";
import useGET from "../../hooks/useGET";
import { useEffect } from "react";

export const ArticleEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error } = useGET(() => endpoints.getPostDetailAPI(Number(id)));

  useEffect(() => {
    if (error) {
      const { description } = errorParse(error);
      toast.error(description);
    }
  }, [error]);

  const onSubmit = async (values: PostCreatePayload): Promise<void> => {
    try {
      const { message } = await endpoints.patchPostAPI(Number(id), values);
      toast.success(message);

      navigate("/articles");
    } catch (error: any) {
      const { description } = errorParse(error);
      toast.error(description);
    }
  };

  const form = useForm<PostCreatePayload>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
      status: "",
    },
    resolver: yupResolver(postCreateSchema),
  });

  useEffect(() => {
    if (data) {
      form.setValue("title", data?.data?.title);
      form.setValue("content", data?.data?.content);
      form.setValue("category", data?.data?.category);
      form.setValue("category", data?.data?.category);
      form.trigger();
    }
  }, [data]);

  return (
    <Layout withCreateArticle={false}>
      <div className="p-5">
        <FormProvider {...form}>
          <form
            className="flex flex-col space-y-5 max-w-lg mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-1">
              <span className="text-gray-500">Title</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-md border label w-full"
                {...form.register("title")}
              />
              {form.formState.errors?.title && (
                <span className="text-red-500 text-sm">
                  {form.formState.errors?.title?.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-gray-500">Content</span>
              <textarea
                className="input input-bordered input-md border h-24 label w-full"
                {...form.register("content")}
              ></textarea>
              {form.formState.errors?.content && (
                <span className="text-red-500 text-sm">
                  {form.formState.errors?.content?.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-gray-500">Category</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-md border label w-full"
                {...form.register("category")}
              />
              {form.formState.errors?.category && (
                <span className="text-red-500 text-sm">
                  {form.formState.errors?.category?.message}
                </span>
              )}
            </div>

            <div className="join flex items-end justify-end space-x-2">
              <button
                onClick={() =>
                  form.setValue("status", PostStatus.Publish, {
                    shouldValidate: true,
                  })
                }
                className="btn btn-md bg-blue-500 text-white"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Loading..." : "Publish"}
              </button>
              <button
                onClick={() =>
                  form.setValue("status", PostStatus.Draft, {
                    shouldValidate: true,
                  })
                }
                className="btn btn-md bg-yellow-500"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Loading..." : "Draft"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
};
