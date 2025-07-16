"use client";
import {useState} from "react";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState('');
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
                      </div>
                </div>
          </div>
    );
}
