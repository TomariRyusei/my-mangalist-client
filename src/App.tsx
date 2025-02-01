import { useQuery } from "@tanstack/react-query";
import type { Manga } from "./types/manga";
import { MangaList } from "./components/MangaList";
import { Button } from "@/components/ui/button";

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

  if (isPending) {
    return <div className="bg-zinc-950 min-h-full min-w-full flex justify-center text-white">Loading...</div>;
  }

  if (isError) {
    console.error(error);
    return <div className="bg-zinc-950 min-h-full min-w-full flex justify-center  text-white">Error occurred</div>;
  }

  return (
    <>
      <header className="flex justify-center items-center py-8 min-w-full sticky top-0">
        <h1 className="text-3xl font-bold px-10">My Manga List</h1>
        <Button className="" variant="secondary">
          新規登録
        </Button>
      </header>
      <main className="pb-10">
        {/* ここにloadingを表示したい */}
        <MangaList mangaList={mangaList} />
      </main>
    </>
  );
}

export default App;
