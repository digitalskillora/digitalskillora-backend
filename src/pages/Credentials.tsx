import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  User, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  holder: string;
  department: string;
  issuedDate: string;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  complianceScore: number; // percentage
}

const initialCertifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'NVIDIA Certified CUDA Developer',
    holder: 'James Maxwell',
    department: 'Core Computing',
    issuedDate: '2024-05-12',
    expiryDate: '2027-05-12',
    status: 'Active',
    complianceScore: 98
  },
  {
    id: 'cert-2',
    name: 'GDPR Corporate Safety Practitioner',
    holder: 'Sarah Jenkins',
    department: 'Operations',
    issuedDate: '2023-08-19',
    expiryDate: '2026-06-19',
    status: 'Expiring Soon',
    complianceScore: 85
  },
  {
    id: 'cert-3',
    name: 'AWS Solutions Architect Professional',
    holder: 'Elena Rostova',
    department: 'Cloud Infrastructure',
    issuedDate: '2022-09-04',
    expiryDate: '2025-09-04',
    status: 'Active',
    complianceScore: 92
  },
  {
    id: 'cert-4',
    name: 'NVIDIA TensorRT Optimization Core',
    holder: 'Marcus Chen',
    department: 'AI Operations',
    issuedDate: '2021-12-15',
    expiryDate: '2024-12-15',
    status: 'Expired',
    complianceScore: 40
  },
  {
    id: 'cert-5',
    name: 'SOC2 Security Compliance Officer',
    holder: 'Pepper Potts',
    department: 'Global Security',
    issuedDate: '2024-02-10',
    expiryDate: '2027-02-10',
    status: 'Active',
    complianceScore: 100
  }
];

export default function Credentials({ searchQuery = '' }: { searchQuery?: string }) {
  const [certs, setCerts] = useState<Certification[]>(initialCertifications);
  const [activeStatus, setActiveStatus] = useState<string>('All');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRenewCert = (id: string, name: string, holder: string) => {
    setCerts(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          issuedDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'Active',
          complianceScore: 100
        };
      }
      return c;
    }));
    showToast(`Successfully renewed "${name}" certification for ${holder}.`);
  };

  const filteredCerts = certs.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = activeStatus === 'All' || item.status === activeStatus;

    return matchesSearch && matchesStatus;
  });

  const statuses = ['All', 'Active', 'Expiring Soon', 'Expired'];

  return (
    <div id="credentials-page" className="space-y-8 animate-fade-in">
      
      {/* Intro Banner */}
      <section id="credentials-intro" className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <span className="px-2.5 py-1 text-[9px] font-bold font-mono rounded-full bg-brand-nvidia/10 text-brand-nvidia uppercase tracking-wider">CREDENTIAL CENTER</span>
          <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-wider font-mono">Compliance & Expirations Monitor</h3>
          <p className="text-xs text-brand-text-body">Review team compliance scores, verify active external certifications, and trigger quick-renewal commands to maintain white-glove security standards.</p>
        </div>

        <button 
          onClick={() => showToast('Triggered detailed audit reporting logs across all credential directories.')}
          className="w-full md:w-auto px-4 py-2.5 bg-brand-green text-white hover:bg-brand-green-mid text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-brand-primary" />
          <span>Export Audit</span>
        </button>
      </section>

      {/* Grid Dashboard Telemetry */}
      <section id="credentials-metrics" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Avg Compliance Rate</span>
            <h4 className="text-xl font-black text-brand-green-mid font-mono">92.4%</h4>
          </div>
          <TrendingUp className="h-8 w-8 text-brand-green-mid opacity-80" />
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Active Certificates</span>
            <h4 className="text-xl font-black text-brand-text-dark font-mono">{certs.filter(c => c.status === 'Active').length} / {certs.length}</h4>
          </div>
          <CheckCircle2 className="h-8 w-8 text-brand-nvidia opacity-80" />
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Expirations Pending</span>
            <h4 className="text-xl font-black text-red-500 font-mono">{certs.filter(c => c.status !== 'Active').length} Issues</h4>
          </div>
          <AlertTriangle className="h-8 w-8 text-red-500 opacity-80" />
        </div>
      </section>

      {/* Filter and Table Roster Container */}
      <section id="credentials-roster" className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Status filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-brand-border">
          <div className="flex items-center space-x-2 bg-brand-off-white p-1 border border-brand-border rounded-xl">
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`px-3.5 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  activeStatus === st 
                    ? 'bg-white text-brand-green-mid shadow-sm' 
                    : 'text-brand-text-muted hover:text-brand-text-dark'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          
          <span className="text-[10px] font-mono text-brand-text-muted font-bold">
            Parsed: <strong>{filteredCerts.length}</strong> active synchronization feeds
          </span>
        </div>

        {/* Credentials table list */}
        <div className="overflow-x-auto border border-brand-border rounded-xl">
          <table className="min-w-full divide-y divide-brand-border text-xs text-brand-text-dark">
            <thead className="bg-brand-off-white font-mono text-[10px] text-brand-text-muted uppercase">
              <tr>
                <th className="px-5 py-3.5 text-left">Credential Scope</th>
                <th className="px-5 py-3.5 text-left">Holder Details</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-center">Compliance Limit</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white font-medium">
              {filteredCerts.map(c => {
                const isActive = c.status === 'Active';
                const isExpiring = c.status === 'Expiring Soon';
                const isExpired = c.status === 'Expired';
                
                return (
                  <tr key={c.id} className="hover:bg-brand-off-white/40">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2.5">
                        <Award className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-brand-nvidia' : isExpiring ? 'text-brand-primary' : 'text-red-500'}`} />
                        <div>
                          <p className="font-bold text-brand-text-dark">{c.name}</p>
                          <p className="text-[10px] font-mono text-brand-text-muted mt-0.5">ID: {c.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-brand-text-dark flex items-center">
                          <User className="h-3 w-3 mr-1 text-brand-text-muted" />
                          {c.holder}
                        </p>
                        <p className="text-[10px] font-mono text-brand-text-muted mt-0.5">{c.department}</p>
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                        isActive 
                          ? 'bg-brand-green-light text-brand-green-border' 
                          : isExpiring 
                          ? 'bg-brand-primary-light text-brand-primary-dark' 
                          : 'bg-red-50 text-red-600'
                      }`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-16 bg-brand-border rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              isActive ? 'bg-brand-nvidia' : isExpiring ? 'bg-brand-primary' : 'bg-red-500'
                            }`}
                            style={{ width: `${c.complianceScore}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-[10px] text-brand-text-dark">{c.complianceScore}%</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => handleRenewCert(c.id, c.name, c.holder)}
                        className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 ml-auto cursor-pointer ${
                          isActive 
                            ? 'border-brand-border bg-brand-off-white text-brand-text-muted hover:bg-brand-border/20 hover:text-brand-text-dark'
                            : 'border-brand-nvidia bg-white text-brand-green-mid hover:bg-brand-green-light'
                        }`}
                      >
                        <RefreshCw className="h-3 w-3 shrink-0" />
                        <span>{isActive ? 'Audit Feed' : 'Renew Cert'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </section>

      {/* Floating Toast */}
      {toast && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 max-w-sm md:max-w-md mx-auto md:mx-0 z-50 bg-brand-text-dark text-white border border-brand-border/60 px-5 py-3.5 rounded-2xl shadow-[0_12px_40px_-6px_rgba(0,0,0,0.15)] flex items-center space-x-3 font-mono text-[10px] animate-fade-in hover:shadow-2xl transition-all duration-300">
          <span className="h-2 w-2 rounded-full bg-brand-nvidia animate-ping shrink-0" />
          <p className="font-semibold">{toast}</p>
        </div>
      )}

    </div>
  );
}
