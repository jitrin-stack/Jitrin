
import React, { useState } from 'react';
import { RiskLevel, VerificationResult } from '../types';
import { SOURCE_DATA } from '../constants';

export const ManualVerification: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<VerificationResult[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(false);

    // Simulate API delay
    setTimeout(() => {
      const found = SOURCE_DATA[query.trim()];
      setResults(found || []);
      setHasSearched(true);
      setIsLoading(false);
    }, 800);
  };

  const getHighestRisk = (res: VerificationResult[]) => {
    if (res.some(r => r.level === RiskLevel.HIGH)) return { label: 'HIGH (Blacklisted)', color: 'text-red-600 bg-red-50 border-red-200' };
    if (res.some(r => r.level === RiskLevel.MEDIUM)) return { label: 'MEDIUM (Warning)', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { label: 'LOW (Caution)', color: 'text-blue-600 bg-blue-50 border-blue-200' };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Manual Verification</h2>
        <p className="text-slate-500">Check identifiers against integrated blacklist sources for risk assessment.</p>
      </header>

      {/* Search Bar */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Bank Account, National ID, or Phone Number..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 min-w-[140px]"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Verify'}
          </button>
        </form>
      </section>

      {/* Results Area */}
      <section>
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="font-medium">Searching all connected databases...</p>
          </div>
        )}

        {hasSearched && results && results.length === 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-check-circle text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Status: CLEAR</h3>
            <p className="text-emerald-700">The identifier was not found in any connected blacklist source. It is considered safe for standard operations.</p>
          </div>
        )}

        {hasSearched && results && results.length > 0 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            {/* Summary Box */}
            <div className={`p-6 rounded-xl border-2 flex items-center justify-between ${getHighestRisk(results).color}`}>
              <div>
                <p className="text-xs uppercase tracking-widest font-black opacity-80 mb-1">Status Report</p>
                <h3 className="text-2xl font-black">MATCH FOUND</h3>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest font-black opacity-80 mb-1">Risk Level</p>
                <p className="text-xl font-black">{getHighestRisk(results).label}</p>
              </div>
            </div>

            {/* Details Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h4 className="font-bold text-slate-800">Matching Evidence Sources</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 text-left text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                      <th className="px-6 py-4">Source</th>
                      <th className="px-6 py-4">Risk Category</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5 font-bold text-slate-900">{item.source}</td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.level === RiskLevel.HIGH ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {item.riskCategory}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-600 text-sm">{item.description}</td>
                        <td className="px-6 py-5">
                          <div className={`w-3 h-3 rounded-full animate-pulse ${
                            item.level === RiskLevel.HIGH ? 'bg-red-500' : 'bg-amber-500'
                          }`}></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
