import { useQuery } from "@tanstack/react-query";

interface manga {
  id: number;
  title: string;
}

const fetchMangaList = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/mangas`);
  return res.json();
};

function App() {
  const { data: mangaList } = useQuery<manga[]>({
    queryKey: ["mangaList"],
    queryFn: fetchMangaList,
  });

  return (
    <div className="bg-zinc-950 dark:bg-white w-full h-screen p-10 flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-10">My Manga List</h1>
      <ul className="">
        {mangaList?.map((manga) => (
          <li key={manga.id}>{manga.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
