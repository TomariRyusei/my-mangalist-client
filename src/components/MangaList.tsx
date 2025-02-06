import { Table, TableCaption, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Manga } from "../types/manga";
import DeleteDialog from "./DeleteDialog";

type Props = {
  mangaList: Manga[];
};

const onClickDeleteManga = (id: number) => {
  console.log(`Manga ID: ${id}`);
};

export function MangaList({ mangaList }: Props) {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full md:min-w-[600px] font-medium">
        <TableCaption>{mangaList.length}件</TableCaption>
        <TableBody>
          {mangaList.map(({ id, title }) => (
            <TableRow key={id}>
              <TableCell>{title}</TableCell>
              <TableCell className="text-right">
                <DeleteDialog title={title} onClickAction={() => onClickDeleteManga(id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
