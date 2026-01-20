
import React, { useState } from 'react';
import { ApiKey } from '../types';
import { MOCK_API_KEYS, APPLICATIONS } from '../constants';

export const ApiManagement: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>(MOCK_API_KEYS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyData, setNewKeyData] = useState({ app: APPLICATIONS[0], name: '' });
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string, type: 'revoke' | 'delete' } | null>(null);

  const generateNewKey = () => {
    const fullKey = `sk_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    const newKeyEntry: ApiKey = {
      id: Date.now().toString(),
      application: newKeyData.app,
      name: newKeyData.name,
      key: `sk_live_${fullKey.substring(8, 12)}...${fullKey.slice(-4)}`,
      status: 'Active',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setKeys([newKeyEntry, ...keys]);
    setGeneratedKey(fullKey);
  };

  const handleAction = () => {
    if (!confirmAction) return;
    if (confirmAction.type === 'revoke') {
      setKeys(keys.map(k => k.id === confirmAction.id ? { ...k, status: 'Revoked' as const } : k));
    } else {
      setKeys(keys.filter(k => k.id !== confirmAction.id));
    }
    setConfirmAction(null);
  };

  const copyToClipboard = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      alert('API Key copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">API Key Management</h2>
          <p className="text-slate-500">Securely manage integration tokens for internal and external consumer apps.</p>
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setGeneratedKey(null);
            setNewKeyData({ app: APPLICATIONS[0], name: '' });
          }}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20"
        >
          <i className="fas fa-plus"></i>
          Generate New Key
        </button>
      </header>

      {/* Keys List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                <th className="px-6 py-4">Application</th>
                <th className="px-6 py-4">Key Name</th>
                <th className="px-6 py-4">API Key</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {keys.map((key) => (
                <tr key={key.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-900">{key.application}</span>
                  </td>
                  <td className="px-6 py-5 text-slate-600">{key.name}</td>
                  <td className="px-6 py-5 font-mono text-sm text-slate-400">{key.key}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      key.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {key.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-slate-500 text-sm">{key.createdAt}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      {key.status === 'Active' ? (
                        <button
                          onClick={() => setConfirmAction({ id: key.id, type: 'revoke' })}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          title="Revoke Key"
                        >
                          <i className="fas fa-ban"></i>
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirmAction({ id: key.id, type: 'delete' })}
                          className="p-2 text-slate-400 hover:text-red-800 transition-colors"
                          title="Delete Key"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900">Generate New API Key</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              {!generatedKey ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Consumer Application</label>
                    <select
                      value={newKeyData.app}
                      onChange={(e) => setNewKeyData({ ...newKeyData, app: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {APPLICATIONS.map(app => <option key={app} value={app}>{app}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Key Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Production Server"
                      value={newKeyData.name}
                      onChange={(e) => setNewKeyData({ ...newKeyData, name: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={generateNewKey}
                    disabled={!newKeyData.name}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                  >
                    Generate Key
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3">
                    <i className="fas fa-exclamation-triangle text-amber-600 mt-1"></i>
                    <p className="text-sm text-amber-800 leading-tight">
                      Please copy and store this key securely. <strong>You will not be able to see it again.</strong>
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="bg-slate-900 text-emerald-400 p-4 rounded-lg font-mono text-sm break-all pr-12">
                      {generatedKey}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-2"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${
                confirmAction.type === 'revoke' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
              }`}>
                <i className={`fas ${confirmAction.type === 'revoke' ? 'fa-ban' : 'fa-trash-alt'} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {confirmAction.type === 'revoke' ? 'Revoke API Key?' : 'Delete API Key?'}
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Are you sure you want to {confirmAction.type} this key? This action <strong>cannot be undone</strong>.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAction}
                  className={`flex-1 py-3 px-4 text-white font-bold rounded-lg transition-all shadow-lg ${
                    confirmAction.type === 'revoke' ? 'bg-amber-600 shadow-amber-600/20' : 'bg-red-600 shadow-red-600/20'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
