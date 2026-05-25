export interface IntegrationCard {
  id: string;
  name: string;
  logoType: 'workday' | 'bamboohr' | 'sap' | 'apiconn' | 'csv';
  category: 'HRIS' | 'Directory' | 'Custom API' | 'Batch Files';
  description: string;
  connectionStatus: 'connected' | 'error' | 'disconnected';
  lastSynced: string;
  recordsSynced: number;
  syncFrequency: string;
}

export interface SyncLogItem {
  id: string;
  timestamp: string;
  integrationName: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export const integrationsList: IntegrationCard[] = [
  {
    id: 'int-workday',
    name: 'Workday HR Integration',
    logoType: 'workday',
    category: 'HRIS',
    description: 'Binds employee directory schemas, dynamic department hierarchies, and core role descriptions to DigitalSkillora indices.',
    connectionStatus: 'connected',
    lastSynced: '24 mins ago',
    recordsSynced: 14282,
    syncFrequency: 'Every 6 hours'
  },
  {
    id: 'int-bamboohr',
    name: 'BambooHR Connector',
    logoType: 'bamboohr',
    category: 'Directory',
    description: 'Synchronizes active onboarding cohorts, team leads, and direct reports mapping into local learning cohorts automatically.',
    connectionStatus: 'disconnected',
    lastSynced: 'Never synced',
    recordsSynced: 0,
    syncFrequency: 'Manual trigger'
  },
  {
    id: 'int-sap',
    name: 'SAP SuccessFactors Suite',
    logoType: 'sap',
    category: 'HRIS',
    description: 'Pulls existing corporate training completions, compliance certifications, and legal HR training modules into AI records.',
    connectionStatus: 'connected',
    lastSynced: '1 hour ago',
    recordsSynced: 8690,
    syncFrequency: 'Daily'
  },
  {
    id: 'int-apiconn',
    name: 'Custom Platform API Endpoint',
    logoType: 'apiconn',
    category: 'Custom API',
    description: 'Enables external third-party software feeds to read specific learner matrices, readiness levels, and skill completions dynamically.',
    connectionStatus: 'connected',
    lastSynced: '12 seconds ago',
    recordsSynced: 45910,
    syncFrequency: 'Real-time Webhook'
  },
  {
    id: 'int-csv',
    name: 'Manual Enterprise CSV Bulk Loader',
    logoType: 'csv',
    category: 'Batch Files',
    description: 'Fallback upload mode for bulk-loading department rosters or historical skills matrices via spreadsheets.',
    connectionStatus: 'disconnected',
    lastSynced: '3 days ago',
    recordsSynced: 1250,
    syncFrequency: 'On demand'
  }
];

export const syncLogs: SyncLogItem[] = [
  {
    id: 'log-1',
    timestamp: '2026-05-25T03:12:04Z',
    integrationName: 'Workday HR Integration',
    type: 'success',
    message: 'Completed delta polling. Detected 12 new hires and 3 internal role shifts. Synced profiles successfully.'
  },
  {
    id: 'log-2',
    timestamp: '2026-05-25T03:00:00Z',
    integrationName: 'Custom Platform API Endpoint',
    type: 'info',
    message: 'Inbound GET request for department readiness index from IP 192.168.42.115. Authorized client token: SEC-482.'
  },
  {
    id: 'log-3',
    timestamp: '2026-05-25T02:45:10Z',
    integrationName: 'SAP SuccessFactors Suite',
    type: 'warning',
    message: 'User matching resolved with partial score for ID: 4892. Target email resolved to non-primary domain. Connected.'
  },
  {
    id: 'log-4',
    timestamp: '2026-05-25T01:10:55Z',
    integrationName: 'BambooHR Connector',
    type: 'error',
    message: 'Inbound Sync Request Aborted. Handshake timeout on oauth.bamboohr.com/tokens. Please re-authenticate integrations.'
  },
  {
    id: 'log-5',
    timestamp: '2026-05-24T22:04:12Z',
    integrationName: 'Manual Enterprise CSV Bulk Loader',
    type: 'success',
    message: 'Bulk manifest processed successfully. Extracted and formatted 125 new competencies in Engineering.'
  }
];
