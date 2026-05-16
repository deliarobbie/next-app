export async function GET() {
    try {
        const apiKey = process.env.SPORTRADAR_API_KEY;

        const res = await fetch(
            "https://api.sportradar.com/nfl/official/trial/v7/en/league/teams.json",
            {
                headers: {
                    "x-api-key": apiKey!,
                },
                cache: "no-store"
            }
        );

        const data = await res.json();

        const teams = data.teams.filter((team: any) => team.alias !== "TBD").map((team: any) => ({
            id: team.id,
            name: `${team.market} ${team.name}`,
            alias: team.alias,
            logo: `https://a.espncdn.com/i/teamlogos/nfl/500/${team.alias.toLowerCase()}.png`
        }));

        return Response.json(teams);

    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch teams" },
            { status: 500 }
        );
    }
}