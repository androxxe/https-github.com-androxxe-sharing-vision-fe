import { Link } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";

export const Layout = ({
  children,
  withCreateArticle = true,
}: {
  children: JSX.Element;
  withCreateArticle: boolean;
}) => {
  return (
    <div className="p-4 lg:p-10">
      <div className="max-w-5xl mx-auto ">
        {withCreateArticle && (
          <Link to={`/articles/create`}>
            <button className="btn btn-md bg-blue-500 text-white mb-6">
              <GrAddCircle />
              New Articles
            </button>
          </Link>
        )}
        <div className="bg-white rounded-lg">{children}</div>
      </div>
    </div>
  );
};
