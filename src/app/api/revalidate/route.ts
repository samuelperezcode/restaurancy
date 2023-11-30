import type {NextRequest} from "next/server";

import {/* revalidatePath, */ revalidateTag} from "next/cache";

export async function GET(request: NextRequest) {
  /* const path = request.nextUrl.searchParams.get("path") || "/"; */
  const tag = request.nextUrl.searchParams.get("tag") || "restaurants";

  /*  revalidatePath(path); */
  revalidateTag(tag);

  return Response.json({success: true});
}
