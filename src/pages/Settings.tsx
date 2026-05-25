import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Building2,
  Users2,
  ShieldCheck,
  CreditCard,
  KeyRound,
  Eye,
  CheckCircle,
  Sparkles,
  Bookmark,
  ChevronRight,
  User,
  Sliders
} from 'lucide-react';

type SettingsTab = 'organization' | 'users' | 'permissions' | 'subscription' | 'security';

export default function Settings({ searchQuery = '' }: { searchQuery?: string }) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('organization');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Custom Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Form states
  const [orgForm, setOrgForm] = useState({
    workspaceName: 'DigitalSkillora Stark Corp',
    domainWhitelist: 'starkenterprises.com, digitalcorp.net',
    primaryLiaison: 'Pepper Potts',
    complianceTemplate: 'ANSI-AI Standard Group 2',
    defaultModelComplexity: 'MIG-Balanced-A100'
  });

  const [toggles, setToggles] = useState({
    enforceSSO: true,
    mfaRequired: true,
    autoPurgeLogs: false,
    aiPathOptimization: true,
    weeklyReportLogs: true
  });

  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'James Maxwell', email: 'j.maxwell@starkenterprises.com', orgRole: 'Global HR Administrator', platformRole: 'Super Admin', ssoSynced: true },
    { id: 'usr-2', name: 'Sarah Jenkins', email: 's.jenkins@starkenterprises.com', orgRole: 'ML Lead Engineer', platformRole: 'Content Contributor', ssoSynced: true },
    { id: 'usr-3', name: 'Elena Rostova', email: 'e.rostova@starkenterprises.com', orgRole: 'Infra Architect', platformRole: 'System Operator', ssoSynced: true },
    { id: 'usr-4', name: 'Marcus Chen', email: 'm.chen@starkenterprises.com', orgRole: 'UI/UX Lead', platformRole: 'Viewer', ssoSynced: false },
  ]);

  const handleOrgInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrgForm(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveConfigs = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div id="settings-page" className="space-y-8 animate-fade-in">
      
      {/* Settings layout split structure */}
      <section id="settings-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left selector menu - lg:span-3 */}
        <div className="lg:col-span-3 bg-white border border-brand-border rounded-2xl p-4 shadow-sm space-y-1">
          <p className="px-3 text-[10px] font-bold tracking-wider text-brand-text-muted uppercase mb-3">Admin Categories</p>
          
          <button
            onClick={() => setActiveTab('organization')}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-xs font-semibold transition-all duration-150 ${
              activeTab === 'organization' 
                ? 'bg-brand-green text-white shadow' 
                : 'text-brand-text-body hover:bg-brand-off-white hover:text-brand-text-dark'
            }`}
          >
            <Building2 className={`h-4.5 w-4.5 ${activeTab === 'organization' ? 'text-brand-primary' : 'text-brand-text-muted'}`} />
            <span>Organization Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-xs font-semibold transition-all duration-150 ${
              activeTab === 'users' 
                ? 'bg-brand-green text-white shadow' 
                : 'text-brand-text-body hover:bg-brand-off-white hover:text-brand-text-dark'
            }`}
          >
            <Users2 className={`h-4.5 w-4.5 ${activeTab === 'users' ? 'text-brand-primary' : 'text-brand-text-muted'}`} />
            <span>User Management</span>
          </button>

          <button
            onClick={() => setActiveTab('permissions')}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-xs font-semibold transition-all duration-150 ${
              activeTab === 'permissions' 
                ? 'bg-brand-green text-white shadow' 
                : 'text-brand-text-body hover:bg-brand-off-white hover:text-brand-text-dark'
            }`}
          >
            <ShieldCheck className={`h-4.5 w-4.5 ${activeTab === 'permissions' ? 'text-brand-primary' : 'text-brand-text-muted'}`} />
            <span>Role Permissions</span>
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-xs font-semibold transition-all duration-150 ${
              activeTab === 'subscription' 
                ? 'bg-brand-green text-white shadow' 
                : 'text-brand-text-body hover:bg-brand-off-white hover:text-brand-text-dark'
            }`}
          >
            <CreditCard className={`h-4.5 w-4.5 ${activeTab === 'subscription' ? 'text-brand-primary' : 'text-brand-text-muted'}`} />
            <span>Subscription Tier</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-xs font-semibold transition-all duration-150 ${
              activeTab === 'security' 
                ? 'bg-brand-green text-white shadow' 
                : 'text-brand-text-body hover:bg-brand-off-white hover:text-brand-text-dark'
            }`}
          >
            <KeyRound className={`h-4.5 w-4.5 ${activeTab === 'security' ? 'text-brand-primary' : 'text-brand-text-muted'}`} />
            <span>Security & SSO Rules</span>
          </button>
        </div>

        {/* Right content board - lg:span-9 */}
        <div className="lg:col-span-9 bg-white border border-brand-border rounded-2xl p-6 shadow-sm min-h-[480px]">
          
          {/* Organization settings view */}
          {activeTab === 'organization' && (
            <form onSubmit={handleSaveConfigs} className="space-y-6">
              <div className="pb-3 border-b border-brand-border mb-4">
                <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-tight font-mono">Organization settings parameters</h3>
                <p className="text-xs text-brand-text-body mt-1">Update overall workspace profiles and primary whitelist constraints.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Workspace Corporate Name</label>
                  <input
                    type="text"
                    name="workspaceName"
                    value={orgForm.workspaceName}
                    onChange={handleOrgInput}
                    className="w-full bg-brand-off-white border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-text-dark font-medium focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Domain Whitelists (Comma separated)</label>
                  <input
                    type="text"
                    name="domainWhitelist"
                    value={orgForm.domainWhitelist}
                    onChange={handleOrgInput}
                    className="w-full bg-brand-off-white border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-text-dark font-medium focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Primary Security Liaison</label>
                  <input
                    type="text"
                    name="primaryLiaison"
                    value={orgForm.primaryLiaison}
                    onChange={handleOrgInput}
                    className="w-full bg-brand-off-white border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-text-dark font-medium focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Default Compliance Schema Code</label>
                  <select
                    name="complianceTemplate"
                    value={orgForm.complianceTemplate}
                    onChange={handleOrgInput}
                    className="w-full bg-brand-off-white border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-text-dark font-medium focus:outline-none focus:border-brand-primary"
                  >
                    <option value="ANSI-AI Standard Group 2">ANSI-AI Standard Group 2</option>
                    <option value="GDPR AI Compliance v5">GDPR AI Compliance v5</option>
                    <option value="SOC2 Type II Audit Core">SOC2 Type II Audit Core</option>
                  </select>
                </div>
              </div>

              {/* Toggles subpanel */}
              <div className="pt-6 border-t border-brand-border space-y-4">
                <h4 className="text-xs font-bold font-mono uppercase text-brand-text-dark tracking-wider">Content Engine Preferences</h4>
                
                <div className="flex items-center justify-between p-3.5 bg-brand-off-white rounded-xl border border-brand-border">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-brand-text-dark block">Enable Adaptive Learning Streams</span>
                    <span className="text-[10px] text-brand-text-muted block">AI agents continuously alter employee paths based on periodic Workday certificates scans.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('aiPathOptimization')}
                    className={`w-11 h-6 rounded-full transition-all flex items-center p-1 cursor-pointer ${
                      toggles.aiPathOptimization ? 'bg-brand-nvidia justify-end' : 'bg-brand-border justify-start'
                    }`}
                  >
                    <span className="h-4 w-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              </div>

              {/* Form submit buttons */}
              <div className="pt-6 border-t border-brand-border flex items-center justify-end space-x-3.5">
                {saveSuccess && (
                  <span className="text-xs font-bold text-brand-nvidia flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1.5" /> Changes saved and synced successfully
                  </span>
                )}
                
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-brand-green text-white hover:bg-brand-green-mid disabled:opacity-50 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center space-x-2 cursor-pointer"
                >
                  {isSaving ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-3 w-3" />
                  ) : null}
                  <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
                </button>
              </div>
            </form>
          )}

          {/* User management list view */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-brand-border mb-4">
                <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-tight font-mono">User Management roster</h3>
                <p className="text-xs text-brand-text-body mt-1">Audit active administrator permissions and platform login sync logs.</p>
              </div>

              <div className="overflow-x-auto border border-brand-border rounded-xl">
                <table className="min-w-full divide-y divide-brand-border text-xs text-brand-text-dark">
                  <thead className="bg-brand-off-white font-mono text-[10px] text-brand-text-muted uppercase">
                    <tr>
                      <th className="px-5 py-3 text-left">Admin User</th>
                      <th className="px-5 py-3 text-left">Corporate Function</th>
                      <th className="px-5 py-3 text-left">Platform Scope</th>
                      <th className="px-5 py-3 text-center">SSO Synced</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border bg-white font-medium">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-brand-off-white/40">
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div>
                            <p className="font-bold">{u.name}</p>
                            <p className="text-[10px] font-mono text-brand-text-muted">{u.email}</p>
                          </div>
                        </td>

                        <td className="px-5 py-3.5 whitespace-nowrap text-brand-text-body font-mono">
                          {u.orgRole}
                        </td>

                        <td className="px-5 py-3.5 whitespace-nowrap font-bold text-brand-green-mid">
                          {u.platformRole}
                        </td>

                        <td className="px-5 py-3.5 whitespace-nowrap text-center">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            u.ssoSynced ? 'bg-brand-green-light text-brand-green-border' : 'bg-red-50 text-red-600'
                          }`}>
                            {u.ssoSynced ? 'ACTIVE' : 'FAILED'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-brand-off-white border border-brand-border rounded-xl flex justify-between items-center text-xs">
                <p className="text-brand-text-body">Total active platform directory profiles synchronized: <strong>14,282 users</strong>.</p>
                <button 
                  onClick={() => showToast('Forcing directory synchronization and syncing user metadata profiles...')}
                  className="px-3.5 py-1.5 border border-brand-border rounded-lg bg-white text-[11px] font-bold text-brand-text-dark hover:bg-brand-off-white cursor-pointer"
                >
                  Sync Active Profiles
                </button>
              </div>
            </div>
          )}

          {/* Permissions Matrix view */}
          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-brand-border mb-4">
                <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-tight font-mono">Role System Permissions Matrix</h3>
                <p className="text-xs text-brand-text-body mt-1">Direct map of system access based on authorization scopes.</p>
              </div>

              {/* Roles matrix list */}
              <div className="space-y-4 text-xs font-sans">
                {/* Level 1 */}
                <div className="p-4 border border-brand-border bg-brand-off-white rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-brand-text-dark text-xs block">Level 1: Super Administrator</span>
                    <span className="text-[10px] font-mono font-bold text-brand-nvidia bg-brand-nvidia/10 px-2 py-0.5 rounded uppercase">Full Controls</span>
                  </div>
                  <p className="text-brand-text-body text-[11px] leading-relaxed">
                    Full workspace editing scopes. Retains capability to generate access keys, edit organizational whiteboards, trigger MIG partition changes, and customize compliance models.
                  </p>
                </div>

                {/* Level 2 */}
                <div className="p-4 border border-brand-border bg-brand-off-white rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-brand-text-dark text-xs block">Level 2: Content Contributor</span>
                    <span className="text-[10px] font-mono font-bold text-brand-green-mid bg-brand-green-light px-2 py-0.5 rounded uppercase">Content Edit</span>
                  </div>
                  <p className="text-brand-text-body text-[11px] leading-relaxed">
                    Maintains capability to craft custom course paths, review active learner completions, and trigger manual sync alerts with Workday or SuccessFactors.
                  </p>
                </div>

                {/* Level 3 */}
                <div className="p-4 border border-brand-border bg-brand-off-white rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-brand-text-dark text-xs block">Level 3: Operational Auditor</span>
                    <span className="text-[10px] font-mono font-bold text-brand-primary-dark bg-brand-primary-light px-2 py-0.5 rounded uppercase">Auditing Scope</span>
                  </div>
                  <p className="text-brand-text-body text-[11px] leading-relaxed">
                    Maintains read scopes over platform telemetry indices, GPU logs streams, model velocities, and competency heat indicators.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Tier profile and billing details */}
          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-brand-border mb-4">
                <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-tight font-mono">Subscription Details</h3>
                <p className="text-xs text-brand-text-body mt-1">Review corporate license parameters and billing frequencies.</p>
              </div>

              <div className="p-6 bg-brand-green text-brand-white rounded-2xl border border-brand-green-border text-xs relative overflow-hidden group">
                {/* Back glowing ambient light */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary rounded-full blur-2xl opacity-15 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 border-b border-brand-green-border pb-3.5 z-10 relative">
                  <div>
                    <span className="px-2 py-0.5 bg-brand-nvidia text-brand-green font-mono font-bold text-[9px] rounded uppercase">Active Plan</span>
                    <h4 className="text-base font-black uppercase tracking-wider font-mono mt-1 text-white">DigitalSkillora Enterprise Enterprise</h4>
                  </div>
                  <span className="text-right font-mono font-bold text-brand-primary text-sm">$4,200 <span className="text-[10px] text-brand-text-on-green-muted font-normal">/ month</span></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs z-10 relative text-brand-text-on-green">
                  <div>
                    <span className="block opacity-65 uppercase font-mono text-[9px] tracking-wider">Allocated Seat count Limit</span>
                    <strong className="text-white text-sm font-mono mt-0.5 block">20,000 Employees max</strong>
                  </div>

                  <div>
                    <span className="block opacity-65 uppercase font-mono text-[9px] tracking-wider">Plan Auto Renewal Date</span>
                    <strong className="text-white text-sm font-mono mt-0.5 block">May 24, 2027</strong>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-brand-green-border flex items-center justify-between text-[11px] z-10 relative">
                  <span className="text-brand-text-on-green-muted font-mono">Billing Account: Stark Enterprises Corp.</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); showToast('Redirecting to Stripe corporate gateway integrations...', 'info'); }} className="text-brand-primary font-bold hover:underline flex items-center">
                    Invoice history
                    <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Security and SSO settings view */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-brand-border mb-4">
                <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-tight font-mono">Security and Single Sign-on Rules</h3>
                <p className="text-xs text-brand-text-body mt-1">Configure MFA constraints and overall platform access profiles.</p>
              </div>

              {/* Security parameters forms list */}
              <div className="space-y-4">
                {/* SSO Toggle */}
                <div className="flex items-center justify-between p-4 bg-brand-off-white rounded-xl border border-brand-border text-xs">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-brand-text-dark block">Enforce Single Sign-on (SSO) login</span>
                    <span className="text-[10px] text-brand-text-muted block">Forbids raw login profiles. Users must route through corporate identity endpoints (IDP).</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('enforceSSO')}
                    className={`w-11 h-6 rounded-full transition-all flex items-center p-1 cursor-pointer ${
                      toggles.enforceSSO ? 'bg-brand-nvidia justify-end' : 'bg-brand-border justify-start'
                    }`}
                  >
                    <span className="h-4 w-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>

                {/* MFA Toggle */}
                <div className="flex items-center justify-between p-4 bg-brand-off-white rounded-xl border border-brand-border text-xs">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-brand-text-dark block">Require Multi-Factor Authentication (MFA)</span>
                    <span className="text-[10px] text-brand-text-muted block">Requires valid authentication cookies for any role beyond Viewer.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('mfaRequired')}
                    className={`w-11 h-6 rounded-full transition-all flex items-center p-1 cursor-pointer ${
                      toggles.mfaRequired ? 'bg-brand-nvidia justify-end' : 'bg-brand-border justify-start'
                    }`}
                  >
                    <span className="h-4 w-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>

                {/* Audit Logs Toggle */}
                <div className="flex items-center justify-between p-4 bg-brand-off-white rounded-xl border border-brand-border text-xs">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-brand-text-dark block">Auto-Purge API Webhook Logs</span>
                    <span className="text-[10px] text-brand-text-muted block">Automatically clear sync handshake records older than 90 days.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('autoPurgeLogs')}
                    className={`w-11 h-6 rounded-full transition-all flex items-center p-1 cursor-pointer ${
                      toggles.autoPurgeLogs ? 'bg-brand-nvidia justify-end' : 'bg-brand-border justify-start'
                    }`}
                  >
                    <span className="h-4 w-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              </div>
            </div>
          )}

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
