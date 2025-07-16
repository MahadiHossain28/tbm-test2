export interface Team {
    errors: string;
    extra: string;
    hits: string;
    id: string;
    in1: string;
    in2: string;
    in3: string;
    in4: string;
    in5: string;
    in6: string;
    in7: string;
    in8: string;
    in9: string;
    name: string;
    totalscore: string;
}

export interface Odd {
    name: string;
    us: string;
    value: string;
    handicap?: string;
}

export interface Bookmaker {
    id: string;
    name: string;
    odd: Odd[] | Odd;
    stop?: string;
    ts?: string;
    handicap?: any;
    total?: any;
}

export interface OddType {
    bookmaker: Bookmaker[] | Bookmaker;
    id: string;
    stop: string;
    value: string;
}

export interface Match {
    awayteam: Team;
    date: string;
    extra_inn: string;
    id: string;
    localteam: Team;
    mlbid: string;
    odds?: {
        rotation_away: string;
        rotation_home: string;
        ts: string;
        type: OddType[];
    };
    status: string;
    time: string;
}

export interface MatchEntry {
    gid: string;
    id: string;
    matches: {
        match: Match | Match[];
    };
    name: string;
}

export interface AllData {
    status: number;
    data: MatchEntry[];
}