import { useQuery } from "@tanstack/react-query";
import type { Manga } from "./types/manga";

import { MangaList } from "./components/MangaList";
import { Loading } from "./components/Loading";
import AddNewDialog from "./components/AddNewDialog";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

const fetchMangaList = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/mangas`, {
    headers: {
      "CF-Access-Client-Id": import.meta.env.CLIENT_ID ?? "",
      "CF-Access-Client-Secret": import.meta.env.ACCESS_TOKEN ?? "",
    },
  });
  return res.json();
};

function App() {
  const {
    data: mangaList,
    isPending,
    isError,
    error,
  } = useQuery<Manga[]>({
    queryKey: ["mangaList"],
    queryFn: fetchMangaList,
  });

  const showNotFound = window.location.pathname !== "/";
  if (showNotFound) {
    return <NotFoundPage />;
  }

  if (isError) {
    console.error(error);
    return <ErrorPage />;
  }

  return (
    <>
      <header className="bg-slate-50 flex flex-col md:flex-row gap-5 items-center justify-center py-6 px-4 min-w-full border-b sticky top-0 z-10">
        <div className="md:flex-1"></div>
        <h1 className="text-2xl md:text-3xl font-bold">My Manga List</h1>
        <div className="md:flex-1">
          <AddNewDialog onClickAdd={() => console.log("Hello!")} />
        </div>
      </header>
      <main className="pt-3 pb-10 px-4">{isPending ? <Loading /> : <MangaList mangaList={mangaList} />}</main>
    </>
  );
}

export default App;
