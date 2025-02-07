import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  // const data = advocateData;
  // use actual db, but keep advocateData for potential future use
  const data = await db.select().from(advocates);
  return Response.json({ data });
}
