import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { Manga } from "./types/manga";
import { Button } from "@/components/ui/button";

import { MangaList } from "./components/MangaList";
import { Loading } from "./components/Loading";
import ErrorPage from "./components/Error/ErrorPage";

const fetchMangaList = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/mangas`);
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

  if (isError) {
    console.error(error);
    return <ErrorPage />;
  }

  return (
    <>
      <header className="flex flex-col md:flex-row justify-center gap-5 items-center py-6 px-4 min-w-full border-b">
        <h1 className="text-2xl md:text-3xl font-bold">My Manga List</h1>
        <Link to="/new" className="w-full max-w-[200px] md:w-auto">
          <Button className="w-full">新規登録</Button>
        </Link>
      </header>
      <main className="pt-3 pb-10 px-4">{isPending ? <Loading /> : <MangaList mangaList={mangaList} />}</main>
      {/* フッターに件数表示したい */}
    </>
  );
}

export default App;
