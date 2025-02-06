import NotFound from "./NotFoundPage";

type Props = {
  code?: number;
};

const ErrorPage = ({ code = 500 }: Props) => {
  if (code === 404) return <NotFound />;

  return (
    <div className="grid h-screen place-content-center bg-slate-50 px-4">
      <h1 className="uppercase tracking-widest text-gray-500">An Error Has Occurred</h1>
    </div>
  );
};

export default ErrorPage;
