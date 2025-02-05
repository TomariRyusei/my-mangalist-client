import { useQuery } from "@tanstack/react-query";
import type { Manga } from "./types/manga";

import { MangaList } from "./components/MangaList";
import { Loading } from "./components/Loading";
import AddNewDialog from "./components/AddNewDialog";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from './pages/NotFoundPage';

const fetchMangaList = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/mangas`);
  return res.json();
};

function App() {
  const showNotFound = window.location.pathname !== '/'
  if (showNotFound) {
    return <NotFoundPage />
  }

  const {
    data: mangaList,
    isPending,
    isError,
    error,
  } = useQuery<Manga[]>({
    queryKey: ["mangaList"],
    queryFn: fetchMangaList,
  });

  if (isError) {
    console.error(error);
    return <ErrorPage />;
  }

  return (
    <>
      <header className="flex flex-col md:flex-row gap-5 items-center justify-center py-6 px-4 min-w-full border-b">
        <h1 className="flex-2 text-2xl md:text-3xl font-bold">My Manga List</h1>
        <AddNewDialog onClickAdd={() => console.log("Hello!!")}/>
      </header>
      <main className="pt-3 pb-10 px-4">{isPending ? <Loading /> : <MangaList mangaList={mangaList} />}</main>
    </>
  );
}

export default App;
