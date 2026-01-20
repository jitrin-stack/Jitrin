
import React from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  setView: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-shield-halved text-xl"></i>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">CB Platform</h1>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Admin Portal</p>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setView('Verification')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeView === 'Verification' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className="fas fa-search"></i>
            <span className="font-medium">Verification</span>
          </button>
          <button
            onClick={() => setView('ApiManagement')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeView === 'ApiManagement' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className="fas fa-key"></i>
            <span className="font-medium">API Management</span>
          </button>
        </nav>
        <div className="mt-auto p-4 absolute bottom-0 w-64 border-t border-slate-800 hidden md:block">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <i className="fas fa-user text-xs text-slate-300"></i>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Compliance Officer</p>
              <p className="text-xs text-slate-500">v1.2.0-stable</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
