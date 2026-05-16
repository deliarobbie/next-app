import Link from "next/link";

import "./NFLCard.css";

interface NFLCardProps {
    id: string;
    name: string;
    alias: string;
    logo: string;
    index?: number;
}

export default function NFLCard({ name, alias, logo, index = 0 }: NFLCardProps) {
    return (
        <Link
            href={`/teams/${alias.toLowerCase()}`}
            className="team-card"
            style={{ animationDelay: `${index * 18}ms` }}
        >
            <img src={logo} alt={name} className="card-logo" />
            <span className="card-alias">{alias}</span>
            <span className="card-name">{name}</span>
        </Link>
    );
}