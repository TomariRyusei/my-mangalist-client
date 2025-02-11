import { Table, TableCaption, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Manga } from "../types/manga";
import DeleteDialog from "./DeleteDialog";
import ErrorPage from "@/pages/ErrorPage";

import { useDeleteManga } from "../hooks/useManga";

type Props = {
  mangaList: Manga[];
};

export function MangaList({ mangaList }: Props) {
  const deleteMangaMutation = useDeleteManga();

  if (deleteMangaMutation.error) {
    console.error(deleteMangaMutation.error);
    return <ErrorPage />;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full md:min-w-[600px] font-medium">
        <TableCaption>{mangaList.length}件</TableCaption>
        <TableBody>
          {mangaList.map(({ id, title }) => (
            <TableRow key={id}>
              <TableCell>{title}</TableCell>
              <TableCell className="text-right">
                <DeleteDialog title={title} onClickAction={() => deleteMangaMutation.mutate(id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
