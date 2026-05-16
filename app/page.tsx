"use client";

import { useEffect, useState } from "react";

import NFLCard from "./components/NFLCard/NFLCard"
import "./globals.css"


export default function Home() {
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/nfl")
            .then(res => res.json())
            .then(data => setTeams(data));
    }, []);

    return (
        <div className="team-grid">
            {teams.map((team, i) => (
                <NFLCard
                    key={team.id}
                    id={team.id}
                    name={team.name}
                    alias={team.alias}
                    logo={team.logo}
                    index={i}
                />
            ))}
        </div>
    );
}