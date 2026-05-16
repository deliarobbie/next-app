import { notFound } from "next/navigation";

interface Team {
    id: string;
    name: string;
    alias: string;
    logo: string;
}

async function getTeam(alias: string): Promise<Team | null> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/nfl`,
            { cache: "no-store" }
        );
        if (!res.ok) return null;
        const teams: Team[] = await res.json();
        return teams.find((t) => t.alias.toLowerCase() === alias.toLowerCase()) ?? null;
    } catch {
        return null;
    }
}

export default async function TeamPage({ params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params;
    const team = await getTeam(alias);

    if (!team) notFound();

    return (
        <main className="team-page">
            <div className="grid-bg" />

            <div className="content">
                <div className="logo-ring">
                    <img
                        src={team.logo}
                        alt={`${team.name} logo`}
                        className="team-logo"
                    />
                </div>

                <div className="alias-tag">{team.alias}</div>
                <h1 className="team-name">{team.name}</h1>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .team-page {
                    min-height: 100vh;
                    background: #080a0f;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    font-family: 'DM Sans', sans-serif;
                }

                .grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 48px 48px;
                    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
                }

                .content {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 28px;
                    animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                .logo-ring {
                    width: 180px;
                    height: 180px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 60px rgba(255,255,255,0.04), inset 0 0 30px rgba(0,0,0,0.4);
                }

                .team-logo {
                    width: 130px;
                    height: 130px;
                    object-fit: contain;
                    filter: drop-shadow(0 4px 24px rgba(0,0,0,0.5));
                    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
                }

                .logo-ring:hover .team-logo {
                    transform: scale(1.08);
                }

                .alias-tag {
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.35);
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 6px 14px;
                    border-radius: 100px;
                }

                .team-name {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(52px, 10vw, 96px);
                    color: #fff;
                    letter-spacing: 0.04em;
                    text-align: center;
                    line-height: 1;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(32px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </main>
    );
}