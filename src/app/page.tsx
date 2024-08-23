import { HydrateClient } from "~/trpc/server";
import { Sun } from "./_components/Sunset/Sun";

export default async function Home() {
  return (
    <HydrateClient>
      <Sun />
    </HydrateClient>
  );
}
