import { createFileRoute } from "@tanstack/react-router";
import New from "@/pages/new";

export const Route = createFileRoute("/new")({
  component: () => <New />,
});
