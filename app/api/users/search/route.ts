// /app/api/users/search/route.ts
import {db} from "@/lib/db"; // Prisma client

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ users: [] }), { status: 200 });
  }

  const users = await db.profile.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } }
      ]
    },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
    },
  });

  return new Response(JSON.stringify({ users }), { status: 200 });
}
