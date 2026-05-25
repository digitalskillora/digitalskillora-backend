import React, { useState } from 'react';
import { 
  Link2, 
  Sparkles, 
  RefreshCcw, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Copy, 
  HardDriveUpload,
  ExternalLink,
  Sliders,
  Terminal
} from 'lucide-react';
import { integrationsList, syncLogs, IntegrationCard } from '../data/integrationData';

export default function Integrations({ searchQuery = '' }: { searchQuery?: string }) {
  const [integrations, setIntegrations] = useState<IntegrationCard[]>(integrationsList);

  const filteredIntegrations = integrations.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [logs, setLogs] = useState(syncLogs);
  const [apiKey, setApiKey] = useState('ds_live_84f828a2b5391da40b82b9e84ec');
  const [showKey, setShowKey] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // Custom Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Simulated sync trigger
  const handleSyncNow = (id: string, name: string) => {
    setSyncingId(id);
    
    setTimeout(() => {
      // Complete sync
      setIntegrations(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            connectionStatus: 'connected',
            lastSynced: 'Just now',
            recordsSynced: item.recordsSynced > 0 ? item.recordsSynced + Math.floor(Math.random() * 5) : 482
          };
        }
        return item;
      }));

      // Append new success log
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        integrationName: name,
        type: 'success' as const,
        message: `Manual sync completed successfully. Synced structural employee shifts and updated skills mapping curves.`
      };
      setLogs(prev => [newLog, ...prev]);
      setSyncingId(null);
      showToast(`Successfully synchronized metrics with ${name}.`);
    }, 1200);
  };

  const handleGlobalGridSync = () => {
    setSyncingId('all');
    showToast('Broadcasting enterprise-wide synchronization signals...', 'info');
    
    setTimeout(() => {
      // Parallel sync completion
      setIntegrations(prev => prev.map(item => ({
        ...item,
        connectionStatus: 'connected',
        lastSynced: 'Just now',
        recordsSynced: item.recordsSynced + Math.floor(Math.random() * 8) + 2
      })));

      // Append logs for every integration card
      const newLogs = integrations.map(item => ({
        id: `log-${Date.now()}-${item.id}`,
        timestamp: new Date().toISOString(),
        integrationName: item.name,
        type: 'success' as const,
        message: `Manual grid sync completed successfully. Synced structural employee shifts and updated skills mapping curves.`
      }));

      setLogs(prev => [...newLogs, ...prev]);
      setSyncingId(null);
      showToast('All enterprise directories synchronized successfully!');
    }, 1500);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    showToast('Developer secret token copied to security clipboard buffer.');
  };

  return (
    <div id="integrations-page" className="space-y-8 animate-fade-in">
      
      {/* Integrations Header brief */}
      <section id="integrations-intro" className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <span className="px-2.5 py-1 text-[9px] font-bold font-mono rounded-full bg-brand-primary-light text-brand-primary-dark uppercase tracking-wider">ENTERPRISE CONNECTIVITY</span>
          <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-wider font-mono">Directory & HRIS Synchronizations Hub</h3>
          <p className="text-xs text-brand-text-body">Ensure continuous learning sync by connecting DigitalSkillora metrics to global HR directory endpoints. Manage credentials and credentials buffers below.</p>
        </div>

        {/* Sync all trigger */}
        <button 
          onClick={handleGlobalGridSync}
          disabled={syncingId !== null}
          className="px-4 py-2.5 bg-brand-green text-white hover:bg-brand-green-mid disabled:opacity-55 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer shrink-0"
        >
          <RefreshCcw className={`h-3.5 w-3.5 text-brand-primary ${syncingId === 'all' ? 'animate-spin' : ''}`} />
          <span>{syncingId === 'all' ? 'Syncing Enterprise Grid...' : 'Synchronize Grid'}</span>
        </button>
      </section>

      <section id="integrations-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.length > 0 ? (
          filteredIntegrations.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-350 relative overflow-hidden group"
          >
            {/* Logo label category */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-0.5 bg-brand-off-white text-brand-text-muted font-bold font-mono text-[9px] rounded uppercase tracking-wider">
                  {item.category}
                </span>

                {/* Connection status dots */}
                <div className="flex items-center space-x-1.5">
                  <span className={`h-2 w-2 rounded-full ${
                    item.connectionStatus === 'connected' 
                      ? 'bg-brand-nvidia animate-pulse' 
                      : item.connectionStatus === 'error'
                      ? 'bg-red-500'
                      : 'bg-brand-text-muted'
                  }`} />
                  <span className={`text-[10px] font-mono font-extrabold uppercase ${
                    item.connectionStatus === 'connected' 
                      ? 'text-brand-green-mid' 
                      : item.connectionStatus === 'error'
                      ? 'text-red-500'
                      : 'text-brand-text-muted'
                  }`}>
                    {item.connectionStatus}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 mb-5">
                <h4 className="text-xs font-black text-brand-text-dark group-hover:text-brand-primary-dark transition-colors">{item.name}</h4>
                <p className="text-[11px] text-brand-text-body leading-normal">{item.description}</p>
              </div>
            </div>

            {/* Sync numbers and Sync Now buttons */}
            <div className="pt-4 border-t border-brand-border/60 text-xs text-brand-text-muted space-y-4">
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div>
                  <span className="block uppercase font-semibold text-[9px]">Last Synced</span>
                  <span className="font-extrabold text-brand-text-dark mt-0.5 block">{item.lastSynced}</span>
                </div>

                <div>
                  <span className="block uppercase font-semibold text-[9px]">Records Synced</span>
                  <span className="font-extrabold text-brand-green-mid mt-0.5 block">{item.recordsSynced.toLocaleString()} profiles</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2 w-full pt-1">
                <button
                  onClick={() => handleSyncNow(item.id, item.name)}
                  disabled={syncingId !== null}
                  className="flex-1 py-2 border border-brand-border bg-brand-off-white hover:bg-brand-border/30 hover:border-brand-text-muted text-[10px] font-bold text-brand-text-dark rounded-xl transition-all flex items-center justify-center space-x-1 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCcw className={`h-3 w-3 text-brand-primary ${(syncingId === item.id || syncingId === 'all') ? 'animate-spin' : ''}`} />
                  <span>{(syncingId === item.id || syncingId === 'all') ? 'Syncing...' : 'Sync Now'}</span>
                </button>

                <button 
                  onClick={() => showToast(`Opened advanced sync registry for ${item.name}.`, 'info')}
                  className="p-2 border border-brand-border hover:bg-brand-off-white rounded-xl text-brand-text-muted hover:text-brand-text-dark transition-colors cursor-pointer"
                >
                  <Sliders className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center border-2 border-dashed border-brand-border bg-white rounded-2xl">
            <p className="text-xs font-bold text-brand-text-dark">No matching HRIS connectors found.</p>
          </div>
        )}
      </section>

      {/* Secret Keys and webhook Logs split layout */}
      <section id="credentials-logs" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Credentials Manager card - lg:span-4 */}
        <div className="lg:col-span-4 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-brand-border">
              <Lock className="h-4 w-4 text-brand-primary" />
              <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider">Access Tokens & API Keys</h3>
            </div>
            
            <p className="text-xs text-brand-text-body leading-relaxed mb-6">
              Use live client tokens below to auth custom inbound curl vectors and sync external directory rosters to DigitalSkillora pipelines.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Active Developer Secret Key</label>
                <div className="relative flex items-center">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    readOnly
                    className="w-full bg-brand-off-white border border-brand-border rounded-xl pl-3.5 pr-20 py-2.5 text-xs text-brand-text-dark focus:outline-none font-mono font-bold text-brand-green-mid"
                  />
                  
                  {/* Password actions */}
                  <div className="absolute right-2.5 flex items-center space-x-2">
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="text-brand-text-muted hover:text-brand-text-dark transition-colors"
                    >
                      {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>

                    <button
                      onClick={handleCopyKey}
                      className="text-brand-text-muted hover:text-brand-text-dark transition-colors"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-brand-primary-light/50 border border-brand-primary/20 rounded-xl">
                <span className="text-[10px] font-mono font-bold text-brand-primary-dark block mb-0.5 uppercase">Security protocol note</span>
                <p className="text-[10px] text-brand-text-body font-medium leading-relaxed">
                  API tokens grant admin scopes inside user structures. Rotate tokens immediately on any compliance flag.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-brand-border">
            <button 
              onClick={() => {
                setApiKey(`ds_live_${Math.random().toString(16).substring(2, 12)}b5${Math.random().toString(16).substring(2, 12)}`);
                showToast('Generated new high-entropy active developer key token.');
              }}
              className="w-full py-2.5 text-xs font-bold bg-brand-green hover:bg-brand-green-mid text-white rounded-xl transition-all font-sans cursor-pointer"
            >
              Rotate Key Token
            </button>
          </div>
        </div>

        {/* Sync logs timeline monitor - lg:span-8 */}
        <div className="lg:col-span-8 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4.5 w-4.5 text-brand-text-muted" />
                <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider">Connector Handshakes & webhook logs</h3>
              </div>
              <span className="text-[10px] font-mono text-brand-text-muted font-semibold">Active monitor...</span>
            </div>

            <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
              {logs.map((log) => {
                const isSuccess = log.type === 'success';
                const isError = log.type === 'error';
                const isWarning = log.type === 'warning';
                
                return (
                  <div key={log.id} className="p-3 bg-brand-off-white border border-brand-border rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <div className="flex items-center space-x-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          isSuccess ? 'bg-brand-nvidia' : isWarning ? 'bg-brand-primary' : isError ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        <span className="font-black text-brand-text-dark">{log.integrationName}</span>
                      </div>
                      <span className="text-brand-text-muted font-bold text-[9px]">{new Date(log.timestamp).toLocaleTimeString()} UTC</span>
                    </div>
                    <p className="text-[11px] text-brand-text-body font-mono leading-relaxed pl-3.5">
                      {log.message}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-brand-border flex items-center justify-between text-[11px] font-mono text-brand-text-muted">
            <span>Synchronizer schema version: SFX v4.1</span>
            <button 
              onClick={() => {
                setLogs(syncLogs);
                showToast('Cleared active logs buffer. Reloaded default historical feeds.');
              }}
              className="text-brand-green-mid hover:text-brand-primary-dark font-extrabold cursor-pointer"
            >
              Refresh Feed logs
            </button>
          </div>
        </div>

      </section>

      {/* Floating Monospaced Toast Notification Portal */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-text-dark text-white border border-brand-border/60 px-5 py-3.5 rounded-2xl shadow-[0_12px_40px_-6px_rgba(0,0,0,0.15)] flex items-center space-x-3 font-mono text-[10px] animate-fade-in hover:shadow-2xl transition-all duration-300">
          <span className="h-2 w-2 rounded-full bg-brand-nvidia animate-ping shrink-0" />
          <p className="font-semibold">{toast.message}</p>
        </div>
      )}

    </div>
  );
}
