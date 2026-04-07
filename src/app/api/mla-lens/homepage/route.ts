import { getHomepageData } from "@/lib/mla-lens/homepage/get-homepage-data";

export async function GET() {
  return Response.json(await getHomepageData());
}
