import React, { useState, useEffect } from 'react';
import { CheckSquare, Server, Layers, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function App() {
  const [apiStatus, setApiStatus] = useState('checking...');
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    // Ping backend API on mount
    axios.get('http://localhost:5000/')
      .then(response => {
        if (response.data && response.data.success) {
          setApiStatus(response.data.message);
          setApiConnected(true);
        }
      })
      .catch(error => {
        setApiStatus('Disconnected (Server offline on port 5000)');
        setApiConnected(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md border border-slate-200 p-8 text-center space-y-6">
        
        {/* Logo & Header */}
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-indigo-500 rounded-xl text-white shadow-sm">
            <CheckSquare className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">TodoApp</h1>
            <p className="text-xs text-slate-500 font-medium">Clean • Modern • Organized</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-700 font-semibold text-sm">
              <Server className="w-4 h-4 text-indigo-500" />
              <span>Backend API Status</span>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              apiConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {apiConnected ? 'Online' : 'Offline'}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-mono bg-white p-2 rounded border border-slate-200 break-all">
            {apiStatus}
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <div className="flex items-center space-x-1.5 text-indigo-700 font-semibold text-xs mb-1">
              <Layers className="w-4 h-4" />
              <span>Frontend Shell</span>
            </div>
            <p className="text-[11px] text-slate-500">React 18 + Vite + Tailwind CSS</p>
          </div>
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <div className="flex items-center space-x-1.5 text-indigo-700 font-semibold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Monorepo Setup</span>
            </div>
            <p className="text-[11px] text-slate-500">Express backend on :5000</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-400">
          Session 01 complete — Foundation ready for feature development.
        </p>

      </div>
    </div>
  );
}
