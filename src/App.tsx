import { useQuery } from "@tanstack/react-query";
import type { Manga } from "./types/manga";
import { MangaList } from "./components/MangaList";

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
    return <div className="bg-zinc-950 dark:bg-white h-screen flex justify-center text-white">Loading...</div>;
  }

  if (isError) {
    console.error(error);
    return <div className="bg-zinc-950 dark:bg-white h-screen flex justify-center  text-white">Error occurred</div>;
  }

  return (
    <div className="bg-zinc-950 dark:bg-white h-screen p-10 flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-10">My Manga List</h1>
      <div>
        <MangaList mangaList={mangaList} />
      </div>
    </div>
  );
}

export default App;
