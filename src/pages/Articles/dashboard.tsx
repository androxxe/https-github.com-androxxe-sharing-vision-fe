import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "../layout";
import qs from "qs";
import useGET from "../../hooks/useGET";
import { endpoints } from "../../services/endpoints";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { PostStatus } from "../../enums/PostStatus";
import { cn } from "../../helpers/utils";
import Swal from "sweetalert2";
import colors from "tailwindcss/colors";
import { errorParse } from "../../helpers/errorParse";
import { ReactTable } from "../../components/Table";
import { FaEye } from "react-icons/fa";

export const Articles = () => {
  const [searchParams] = useSearchParams();
  const [selectedStatus, setSelectedStatus] =
    useState<keyof typeof PostStatus>("Publish");

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }: any) => {
          return row.original.content.length > 50
            ? `${row.original.content.substring(0, 50)}...`
            : row.original.content;
        },
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        id: "actions",
        cell: ({ row }: any) => {
          return (
            <div className="space-x-2 join">
              <Link to={`/articles/${row.original.id}/edit`}>
                <button className="btn btn-xs">Edit</button>
              </Link>
              <Link to={`/articles/${row.original.id}`}>
                <button className="btn btn-xs bg-green-400">Detail</button>
              </Link>
              <button
                onClick={() => handleDelete(row.original.id)}
                className="btn btn-xs bg-red-500 text-white"
              >
                Trash
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const { data, error, loading, refetch } = useGET<GetPostsResponse>(
    () => endpoints.getPostAPI({ status: selectedStatus }),
    [selectedStatus],
    false
  );

  useEffect(() => {
    refetch();
  }, [selectedStatus]);
  useEffect(() => {
    if (error) {
      // @ts-ignore
      toast.error(error.message as "string");
    }
  }, [error]);

  const { status } = qs.parse(searchParams.toString(), {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (status) setSelectedStatus(status as keyof typeof PostStatus);
  }, [status]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.blue[500],
      cancelButtonColor: colors.red[500],
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { message } = await endpoints.deletePostAPI(id);
          toast.success(message);
          refetch();
        } catch (error: any) {
          const { title } = errorParse(error);
          toast.error(title);
        }
      }
    });
  };

  return (
    <Layout withCreateArticle={true}>
      <div>
        <Menu selectedStatus={selectedStatus} />
        <div className="p-5 text-slate-500">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center my-10">
                <span className="loading loading-dots loading-lg text-blue-500 "></span>
              </div>
            ) : (
              <div>
                <ReactTable columns={columns} data={data.data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Menu = ({
  selectedStatus,
}: {
  selectedStatus: keyof typeof PostStatus;
}) => {
  return (
    <ul className="flex items-center justify-center flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <li>
        <Link
          to={`/articles?status=Publish`}
          aria-current="page"
          className={cn(
            selectedStatus === "Publish"
              ? "font-bold text-blue-600 bg-gray-100"
              : "font-semibold hover:text-gray-700 hover:bg-gray-50",
            `px-4 py-3 rounded-t-lg  flex flex-row items-center gap-x-2`
          )}
        >
          Publish / Preview <FaEye />
        </Link>
      </li>
      <li>
        <Link
          to={`/articles?status=Draft`}
          className={cn(
            selectedStatus === "Draft"
              ? "font-bold text-blue-600 bg-gray-100"
              : "font-semibold hover:text-gray-700 hover:bg-gray-50",
            `inline-block px-4 py-3 rounded-t-lg`
          )}
        >
          Drafts
        </Link>
      </li>
      <li>
        <Link
          to={`/articles?status=Trash`}
          className={cn(
            selectedStatus === "Trash"
              ? "font-bold text-blue-600 bg-gray-100"
              : "font-semibold hover:text-gray-700 hover:bg-gray-50",
            `inline-block px-4 py-3 rounded-t-lg`
          )}
        >
          Trash
        </Link>
      </li>
    </ul>
  );
};
