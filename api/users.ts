import { whopsdk } from "@/lib/whop";

export default async function handler(req: Request) {
  const users = await whopsdk.users.list();
  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
}
