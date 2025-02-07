import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  // use actual db, but keep advocateData for potential future use
  const data = await db.select().from(advocates);

  // const data = advocateData;

  return Response.json({ data });
}
