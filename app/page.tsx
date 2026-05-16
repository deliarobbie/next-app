"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/nfl")
            .then(res => res.json())
            .then(data => setTeams(data));
    }, []);

    return (
        <main style={{ padding: "20px" }}>
            <h1>NFL Teams</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px"
                }}
            >
                {teams.map((team) => (
                    <div
                        key={team.id}
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}
                    >
                        <img
                            src={team.logo}
                            alt={team.name}
                            width={80}
                        />

                        <h2>{team.alias}</h2>

                        <p>{team.name}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}