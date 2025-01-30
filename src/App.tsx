import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/data`)
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  return (
    <div className="bg-zinc-950 dark:bg-white w-full h-screen">
      <h1 className="text-3xl font-bold underline text-white">Cloudflare Pages + Workers + Hono</h1>
      <p className="text-white">{data ? data : "Loading..."}</p>
      <Button variant="outline">Button</Button>
    </div>
  );
}

export default App;
