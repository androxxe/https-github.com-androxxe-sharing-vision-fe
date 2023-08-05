import { Layout } from "../layout";
import { toast } from "react-toastify";
import { endpoints } from "../../services/endpoints";
import { errorParse } from "../../helpers/errorParse";
import { useParams } from "react-router-dom";
import useGET from "../../hooks/useGET";
import { useEffect } from "react";

export const ArticleDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useGET(() =>
    endpoints.getPostDetailAPI(Number(id))
  );

  useEffect(() => {
    if (error) {
      const { description } = errorParse(error);
      toast.error(description);
    }
  }, [error]);

  return (
    <Layout withCreateArticle={false}>
      {loading ? (
        <div className="text-center my-10">
          <span className="loading loading-dots loading-lg text-blue-500 "></span>
        </div>
      ) : (
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <span className="text-gray-500">Title</span>
            <span className="block font-bold text-gray-700">
              {data.data.title}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-gray-500">Content</span>
            <span className="block font-bold text-gray-700">
              {data.data.content}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-gray-500">Category</span>
            <span className="block font-bold text-gray-700">
              {data.data.category}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-gray-500">Status</span>
            <span className="block font-bold text-gray-700">
              {data.data.status}
            </span>
          </div>
        </div>
      )}
    </Layout>
  );
};
