import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useAddManga } from "@/hooks/useManga";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddNewDialog = ({ open, setOpen }: Props) => {
  const [title, setTitle] = useState("");
  const addMangaMutation = useAddManga();
  const handleAdd = () => {
    if (!title.trim()) return;
    addMangaMutation.mutate(title);
    setTitle("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full shadow-md md:w-auto">新規登録</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新規登録</DialogTitle>
          <DialogDescription>新たに登録する漫画のタイトルを入力</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Input id="title" onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAdd} disabled={!title.length}>
            登録
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewDialog;
