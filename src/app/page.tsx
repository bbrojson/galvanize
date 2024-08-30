import { HydrateClient } from "~/trpc/server";
import { SunVsMoonPage } from "./_components/SunVsMoon/SunVsMoon.page";

export default async function Home() {
  return (
    <HydrateClient>
      <SunVsMoonPage />
    </HydrateClient>
  );
}
