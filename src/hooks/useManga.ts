import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Manga } from "../types/manga";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchMangaList = async (): Promise<Manga[]> => {
  const res = await fetch(`${API_URL}/mangas`, {
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const useMangaList = () => {
  return useQuery<Manga[]>({
    queryKey: ["mangaList"],
    queryFn: fetchMangaList,
  });
};

export const useAddManga = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch(`${API_URL}/mangas`, {
        method: "POST",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangaList"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    },
  });
};

export const useDeleteManga = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/mangas/${id}`, {
        method: "DELETE",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangaList"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    },
  });
};
