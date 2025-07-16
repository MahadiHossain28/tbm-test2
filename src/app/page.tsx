"use client";
import {useMemo, useState} from "react";
import allData from '@/data/mockData.json';
import {AllData, Match, MatchEntry} from "@/type/Type";
import MatchHeader from "@/components/MatchHeader";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    const allMatches: Match[] = useMemo(() => {
        const flattenedMatches = (allData as AllData).data
            .flatMap((item: MatchEntry) => {
                const matchData = item.matches.match;
                return Array.isArray(matchData) ? matchData : [matchData];
            })
            .filter((match): match is Match => Boolean(match) && Boolean(match.id));

        const uniqueMatches = new Map<string, Match>();
        for (const match of flattenedMatches) {
            if (!uniqueMatches.has(match.id)) {
                uniqueMatches.set(match.id, match);
            }
        }
        return Array.from(uniqueMatches.values());
    }, []);

    const filteredMatches = useMemo(() => {
        if (!searchTerm) return [];
        const lowercasedSearchTerm = searchTerm.toLowerCase();

        return allMatches.filter(match => {
            if (!match) return false;
            const matchId = match.id || '';
            const localTeamName = match.localteam?.name?.toLowerCase() || '';
            const awayTeamName = match.awayteam?.name?.toLowerCase() || '';

            return matchId.includes(searchTerm) ||
                localTeamName.includes(lowercasedSearchTerm) ||
                awayTeamName.includes(lowercasedSearchTerm);
        }).slice(0, 10);
    }, [searchTerm, allMatches]);

    const handleSelectMatch = (match: Match) => {
        setSelectedMatch(match);
        setSearchTerm('');
    };

    return (
          <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto">

                      <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search by Match ID or Team Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />

                          {searchTerm && filteredMatches.length > 0 && (
                              <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-100 overflow-y-auto">
                                  {filteredMatches.map((match) => {
                                      if (!match) {
                                          return null;
                                      }

                                      const matchId = match.id;
                                      const localTeamName = match.localteam?.name;
                                      const awayTeamName = match.awayteam?.name;

                                      if (!matchId || !localTeamName || !awayTeamName) {
                                          return null;
                                      }

                                      return (
                                          <li
                                              key={matchId}
                                              onClick={() => handleSelectMatch(match)}
                                              className="p-3 cursor-pointer hover:bg-gray-700"
                                          >
                                              {matchId} - {localTeamName} vs {awayTeamName}
                                          </li>
                                      );
                                  })}
                              </ul>
                          )}
                      </div>
                      {selectedMatch && (
                            <MatchHeader match={selectedMatch} />
                      )}
                </div>
          </div>
    );
}
