import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableCaption, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Manga } from "../types/manga";
import DeleteDialog from "./DeleteDialog";
import ErrorPage from "@/pages/ErrorPage";

type Props = {
  mangaList: Manga[];
};

export function MangaList({ mangaList }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`${import.meta.env.VITE_API_URL}/mangas/${id}`, {
        method: "DELETE",
        headers: {
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Content-Type": "application/json",
        },
      });

      return await queryClient.invalidateQueries({ queryKey: ["mangaList"] });
    },
  });

  if (mutation.error) {
    console.error(mutation.error);
    return <ErrorPage />;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full md:min-w-[600px] font-medium">
        <TableCaption>{mangaList.length}件</TableCaption>
        <TableBody>
          {mangaList.map(({ id, title }, index) => (
            <TableRow key={index}>
              <TableCell>{title}</TableCell>
              <TableCell className="text-right">
                <DeleteDialog title={title} onClickAction={() => mutation.mutate(id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
