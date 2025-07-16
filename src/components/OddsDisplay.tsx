"use client";
import React, { useState } from 'react';
import { Odd, OddType, Match } from '@/type/Type';

interface OddsDisplayProps {
    match: Match | Match[];
}


const CollapsibleOddsSection: React.FC<{ oddType: OddType }> = ({ oddType }) => {
    const [isOpen, setIsOpen] = useState(true);

    const processData = () => {
        const bookmakers = (Array.isArray(oddType.bookmaker) ? oddType.bookmaker : [oddType.bookmaker]).filter(Boolean);
        let headers: (string | { title: string; colspan: number })[] = [];
        let rows: any[] = [];
        let dataKeys: string[] = [];

        const val = oddType.value;

        if (val === 'Result / Total Goals') {
            headers = ['Total', 'Home', 'Draw', 'Away'];
            dataKeys = ['Total', 'Home', 'Draw', 'Away'];
            const resultMap: { [key: string]: { Home?: string, Draw?: string, Away?: string } } = {};

            bookmakers.forEach(bm => {
                const totals = (bm.total ? (Array.isArray(bm.total) ? bm.total : [bm.total]) : []).filter(Boolean);
                totals.forEach(t => {
                    const odds = (t.odd ? (Array.isArray(t.odd) ? t.odd : [t.odd]) : []).filter(Boolean);
                    odds.forEach((o: Odd) => {
                        if (!o.name) return;
                        const lowerCaseName = o.name.toLowerCase();
                        const parts = lowerCaseName.split(' and ');
                        if (parts.length < 2) return;

                        const result = parts[0].trim();
                        const totalName = parts[1].trim();
                        const totalValue = t.name;

                        const fullTotalName = `${totalName.charAt(0).toUpperCase() + totalName.slice(1)} ${totalValue}`;

                        let resultKey: 'Home' | 'Draw' | 'Away' | '' = '';
                        if (result.includes('home')) resultKey = 'Home';
                        else if (result.includes('draw')) resultKey = 'Draw';
                        else if (result.includes('away')) resultKey = 'Away';

                        if (resultKey) {
                            if (!resultMap[fullTotalName]) resultMap[fullTotalName] = {};
                            resultMap[fullTotalName][resultKey] = o.value;
                        }
                    });
                });
            });

            rows = Object.keys(resultMap).map(totalKey => ({
                'Total': totalKey,
                'Home': resultMap[totalKey].Home || '-',
                'Draw': resultMap[totalKey].Draw || '-',
                'Away': resultMap[totalKey].Away || '-',
            }));
        }
        else if (val.includes('3Way') || val.includes('Result')) {
            headers = ['Home', 'Draw', 'Away'];
            dataKeys = ['Home', 'Draw', 'Away'];
            rows = bookmakers.map(bm => {
                const row: { [key: string]: string } = {};
                const odds = (bm.odd ? (Array.isArray(bm.odd) ? bm.odd : [bm.odd]) : []).filter(Boolean);
                odds.forEach((o: Odd) => {
                    if (!o.name) return;
                    const lowerCaseName = o.name.toLowerCase();
                    let key = '';
                    if (lowerCaseName.includes('home') || lowerCaseName === '1') key = 'Home';
                    else if (lowerCaseName.includes('draw') || lowerCaseName === 'x') key = 'Draw';
                    else if (lowerCaseName.includes('away') || lowerCaseName === '2') key = 'Away';

                    if (key) row[key] = o.value;
                });
                return row;
            });
        } else if (val.includes('Home/Away')) {
            headers = ['Home', 'Away'];
            dataKeys = ['Home', 'Away'];
            rows = bookmakers.map(bm => {
                const row: { [key: string]: string } = {};
                const odds = (bm.odd ? (Array.isArray(bm.odd) ? bm.odd : [bm.odd]) : []).filter(Boolean);
                odds.forEach((o: Odd) => {
                    if (!o.name) return;
                    const lowerCaseName = o.name.toLowerCase();
                    let key = '';
                    if (lowerCaseName.includes('home') || lowerCaseName === '1') key = 'Home';
                    else if (lowerCaseName.includes('away') || lowerCaseName === '2') key = 'Away';

                    if (key) row[key] = o.value;
                });
                return row;
            });

        } else if (val.includes('Total') || val.includes('Over/Under')) {
            headers = ['Over', 'Under'];
            dataKeys = ['Over', 'Under'];
            const overUnderMap: { [key: string]: { Over?: string, Under?: string } } = {};

            bookmakers.forEach(bm => {
                const totals = (bm.total ? (Array.isArray(bm.total) ? bm.total : [bm.total]) : []).filter(Boolean);
                totals.forEach(t => {
                    if(!t.name) return;
                    if (!overUnderMap[t.name]) overUnderMap[t.name] = {};
                    const odds = (t.odd ? (Array.isArray(t.odd) ? t.odd : [t.odd]) : []).filter(Boolean);
                    odds.forEach((o: Odd) => {
                        if(!o.name) return;
                        if (o.name.toLowerCase() === 'over') overUnderMap[t.name].Over = o.value;
                        if (o.name.toLowerCase() === 'under') overUnderMap[t.name].Under = o.value;
                    });
                });
            });
            rows = Object.keys(overUnderMap).map(key => ({
                'Over': { value: key, odds: overUnderMap[key].Over || '-' },
                'Under': { value: key, odds: overUnderMap[key].Under || '-' },
            }));

        } else if (val.includes('Asian Handicap')) {
            headers = ['Home', 'Away'];
            dataKeys = ['Home', 'Away'];

            const handicapMap: { [key: string]: { [key:string]: string} } = {};

            bookmakers.forEach(bm => {
                const handicaps = (bm.handicap ? (Array.isArray(bm.handicap) ? bm.handicap : [bm.handicap]) : []).filter(Boolean);
                handicaps.forEach(h => {
                    if(!h.name) return;
                    const key = h.name.replace('+', '');
                    if (!handicapMap[key]) handicapMap[key] = {};
                    const odds = (h.odd ? (Array.isArray(h.odd) ? h.odd : [h.odd]) : []).filter(Boolean);
                    odds.forEach((o: Odd) => {
                        if(!o.name) return;
                        const team = o.name.toLowerCase().includes('home') ? 'Home' : 'Away';
                        handicapMap[key][team] = o.value
                    })
                });
            });
            rows = Object.keys(handicapMap).map(key => ({
                'Home': { value: key, odds: handicapMap[key].Home || '-' },
                'Away': { value: key, odds: handicapMap[key].Away || '-' },
            }));
        }

        return { headers, rows, dataKeys };
    };

    const { headers, rows, dataKeys } = processData();

    if (rows.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 focus:outline-none"
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-teal-300">{oddType.value}</h3>
                    <span className="transform transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
            </button>
            {isOpen && (
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-700/50">
                        <tr>
                            {headers.map((header, index) => (
                                typeof header === 'string' ?
                                    <th key={index} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">{header}</th>
                                    :
                                    <th key={index} scope="col" colSpan={header.colspan} className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">{header.title}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                        {rows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-700/50">
                                {dataKeys.map((key, i) => {
                                    const cellData = row[key];
                                    return (
                                        <td key={i} className="px-6 py-4 whitespace-nowrap text-sm border-x border-gray-600">
                                            {cellData && typeof cellData === 'object' ? (
                                                <div className="flex justify-between items-center">
                                                    <span>{cellData.value}</span>
                                                    <span className="font-semibold text-amber-500">{cellData.odds}</span>
                                                </div>
                                            ) : (
                                                <div className="text-center text-amber-500">{cellData || '-'}</div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};


const OddsDisplay: React.FC<OddsDisplayProps> = ({ match }) => {
    const matchesToShow = Array.isArray(match) ? match : [match];

    return (
        <div className="space-y-6">
            {matchesToShow.map((matchDetail, index) => {
                if (!matchDetail.odds || !matchDetail.odds.type) {
                    return <div key={index} className="text-gray-400">No odds available for this match.</div>;
                }
                return (
                    <div key={matchDetail.id || index}>
                        {matchDetail.odds.type.map(oddType => (
                            <CollapsibleOddsSection key={oddType.id} oddType={oddType} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default OddsDisplay;