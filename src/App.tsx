import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Manga } from "./types/manga";

import { MangaList } from "./components/MangaList";
import { Loading } from "./components/Loading";
import AddNewDialog from "./components/AddNewDialog";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

const fetchMangaList = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/mangas`, {
    headers: {
      "X-API-KEY": import.meta.env.VITE_API_KEY,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

function App() {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const {
    data: mangaList,
    isPending,
    isError,
    error,
  } = useQuery<Manga[]>({
    queryKey: ["mangaList"],
    queryFn: fetchMangaList,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/mangas`, {
        method: "POST",
        headers: {
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      setOpen(false);

      return await queryClient.invalidateQueries({ queryKey: ["mangaList"] });
    },
  });

  const showNotFound = window.location.pathname !== "/";
  if (showNotFound) {
    return <NotFoundPage />;
  }

  if (isError) {
    console.error(error);
    return <ErrorPage />;
  }

  if (mutation.error) {
    console.error(mutation.error);
    return <ErrorPage />;
  }

  return (
    <>
      <header className="bg-slate-50 flex flex-col md:flex-row gap-5 items-center justify-center py-6 px-4 min-w-full border-b sticky top-0 z-10">
        <div className="md:flex-1"></div>
        <h1 className="text-2xl md:text-3xl font-bold">My Manga List</h1>
        <div className="md:flex-1">
          <AddNewDialog open={open} setOpen={setOpen} setTitle={setTitle} onClickAdd={mutation.mutate} />
        </div>
      </header>
      <main className="pt-3 pb-10 px-4">{isPending ? <Loading /> : <MangaList mangaList={mangaList} />}</main>
    </>
  );
}

export default App;
