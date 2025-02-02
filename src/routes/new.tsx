import { createFileRoute } from "@tanstack/react-router";
import NewPage from "@/pages/NewPage";

export const Route = createFileRoute("/new")({
  component: () => <NewPage />,
});
