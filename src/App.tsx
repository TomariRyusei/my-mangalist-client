import { useState } from "react";

import { useMangaList } from "./hooks/useManga";
import { MangaList } from "./components/MangaList";
import { Loading } from "./components/Loading";
import AddNewDialog from "./components/AddNewDialog";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [open, setOpen] = useState(false);

  const { data: mangaList, isPending, isError, error } = useMangaList();

  const showNotFound = window.location.pathname !== "/";
  if (showNotFound) return <NotFoundPage />;

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
          <AddNewDialog open={open} setOpen={setOpen} />
        </div>
      </header>
      <main className="pt-3 pb-10 px-4">{isPending ? <Loading /> : <MangaList mangaList={mangaList} />}</main>
    </>
  );
}

export default App;
