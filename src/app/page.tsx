import { HydrateClient } from "~/trpc/server";
import { Sun } from "./_components/Sunset/Sun";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex h-screen flex-col items-center justify-center overflow-hidden">
        <Sun />
      </main>
    </HydrateClient>
  );
}
