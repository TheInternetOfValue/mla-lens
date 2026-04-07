import { MLALensHomepage } from "@/components/home/mla-lens-homepage";
import { getHomepageData } from "@/lib/mla-lens/homepage/get-homepage-data";

export default async function Home() {
  const data = await getHomepageData();

  return (
    <main>
      <MLALensHomepage data={data} />
    </main>
  );
}
