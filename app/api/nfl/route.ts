import { getTeams } from "@/app/lib/nfl";

export async function GET() {
    const teams = await getTeams();

    return Response.json(teams);
}