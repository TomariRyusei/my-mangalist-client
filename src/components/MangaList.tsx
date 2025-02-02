import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import type { Manga } from "../types/manga";

type Props = {
  mangaList: Manga[];
};

export function MangaList({ mangaList }: Props) {
  return (
    <Table className="w-[600px] font-medium">
      <TableHeader>
        <TableRow></TableRow>
      </TableHeader>
      <TableBody>
        {mangaList.map((manga) => (
          <TableRow key={manga.id}>
            <TableCell>{manga.title}</TableCell>
            <TableCell className="text-right">
              <Button variant="destructive">削除</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
