import NotFound from "./NotFound";

type Props = {
  code?: number;
};

const ErrorPage = ({ code = 500 }: Props) => {
  if (code === 404) return <NotFound />;

  return (
    <div className="grid h-screen place-content-center bg-slate-50 px-4">
      <h1 className="uppercase tracking-widest text-gray-500">500 | Internal Server Error</h1>
    </div>
  );
};

export default ErrorPage;
