import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const NewPage = () => {
  return (
    <>
      <p>It's new</p>
      <Link to="/">
        <Button>戻る</Button>
      </Link>
    </>
  );
};

export default NewPage;
