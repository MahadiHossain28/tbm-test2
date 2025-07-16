"use client";

import React, { useState, useEffect } from 'react';
import {Match} from "@/type/Type";

interface MatchHeaderProps {
    match: Match;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
    const calculateTimeLeft = () => {
        // Manually parse DD.MM.YYYY into YYYY-MM-DD for the Date constructor
        const parts = match.date.split('.');
        const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        const matchDateTime = new Date(`${isoDate}T${match.time}`).getTime();
        const now = new Date().getTime();
        const oneYearAgo = new Date(now - (365 * 24 * 60 * 60 * 1000));
        // @ts-ignore
        const difference = matchDateTime - oneYearAgo;

        let timeLeft = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60))),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formattedTime = match.time.substring(0, 5);
    // Parse date for correct MM / DD display
    const dateParts = match.date.split('.');
    const formattedDate = `${dateParts[1]} / ${dateParts[0]}`;

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-8 text-white shadow-lg border border-gray-700">
            <div className="text-center mb-4">
                <div className="text-lg font-semibold text-gray-400">
                    {timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
                        <span className="font-mono tracking-widest">{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
                    ) : (
                        <span>Match Started</span>
                    )}
                </div>
                <div className="text-xs text-gray-500">
                    <span>Hours</span> : <span>Minutes</span> : <span>Seconds</span>
                </div>
            </div>
            <div className="flex justify-evenly items-center">
                <div className="flex flex-col items-center text-center w-1/3">
                    <span className="font-bold text-lg">{match.localteam.name}</span>
                    <span className="text-sm text-gray-400">(0/0)</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="text-2xl font-light text-gray-300">{formattedTime}</div>
                    <div className="text-4xl font-bold font-mono">{formattedDate}</div>
                </div>
                <div className="flex flex-col items-center text-center w-1/3">
                    <span className="font-bold text-lg">{match.awayteam.name}</span>
                    <span className="text-sm text-gray-400">(0/0)</span>
                </div>
            </div>
        </div>
    );
};

export default MatchHeader;