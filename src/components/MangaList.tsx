import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import type { Manga } from "../types/manga";

export function MangaList({ mangaList: mangaList }: { mangaList: Manga[] }) {
  return (
    <Table className="w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>タイトル</TableHead>
        </TableRow>
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
