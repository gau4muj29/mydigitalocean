import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Smartphone, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Settings, 
  Plus, 
  Trash2, 
  QrCode, 
  Download, 
  RefreshCw,
  UserCheck,
  Activity,
  Globe,
  Wifi,
  Server,
  Database
} from 'lucide-react';

interface TwoFactorDevice {
  id: string;
  name: string;
  type: 'authenticator' | 'sms' | 'hardware';
  enabled: boolean;
  lastUsed?: string;
  created: string;
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'failed_login' | '2fa_enabled' | '2fa_disabled' | 'password_changed' | 'api_key_created';
  description: string;
  ip: string;
  location: string;
  timestamp: string;
  success: boolean;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed?: string;
  created: string;
  expires?: string;
}

const twoFactorDevices: TwoFactorDevice[] = [
  {
    id: '2fa-1',
    name: 'Google Authenticator',
    type: 'authenticator',
    enabled: true,
    lastUsed: '2024-01-25 14:30',
    created: '2024-01-01'
  },
  {
    id: '2fa-2',
    name: 'SMS +1 (555) 123-4567',
    type: 'sms',
    enabled: false,
    created: '2024-01-15'
  }
];

const securityEvents: SecurityEvent[] = [
  {
    id: 'evt-1',
    type: 'login',
    description: 'Successful login',
    ip: '192.168.1.100',
    location: 'New York, US',
    timestamp: '2024-01-25 14:30',
    success: true
  },
  {
    id: 'evt-2',
    type: 'failed_login',
    description: 'Failed login attempt',
    ip: '203.0.113.45',
    location: 'Unknown',
    timestamp: '2024-01-25 12:15',
    success: false
  },
  {
    id: 'evt-3',
    type: '2fa_enabled',
    description: '2FA enabled for account',
    ip: '192.168.1.100',
    location: 'New York, US',
    timestamp: '2024-01-24 09:20',
    success: true
  },
  {
    id: 'evt-4',
    type: 'api_key_created',
    description: 'New API key created',
    ip: '192.168.1.100',
    location: 'New York, US',
    timestamp: '2024-01-23 16:45',
    success: true
  }
];

const apiKeys: APIKey[] = [
  {
    id: 'api-1',
    name: 'Production API Key',
    key: 'chp_live_sk_12345abcdef67890',
    permissions: ['read', 'write', 'delete'],
    lastUsed: '2024-01-25 14:30',
    created: '2024-01-01',
    expires: '2024-12-31'
  },
  {
    id: 'api-2',
    name: 'Development Key',
    key: 'chp_test_sk_09876fedcba54321',
    permissions: ['read', 'write'],
    lastUsed: '2024-01-24 10:15',
    created: '2024-01-15'
  }
];

export default function Security() {
  const [activeTab, setActiveTab] = useState<'overview' | '2fa' | 'api' | 'activity'>('overview');
  const [showQRCode, setShowQRCode] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [showApiKey, setShowApiKey] = useState<{[key: string]: boolean}>({});
  const [copied, setCopied] = useState<{[key: string]: boolean}>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied({...copied, [id]: true});
    setTimeout(() => setCopied({...copied, [id]: false}), 2000);
  };

  const toggleApiKeyVisibility = (id: string) => {
    setShowApiKey({...showApiKey, [id]: !showApiKey[id]});
  };

  const getEventIcon = (type: string, success: boolean) => {
    if (!success) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    
    switch (type) {
      case 'login': return <UserCheck className="h-4 w-4 text-green-500" />;
      case 'failed_login': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case '2fa_enabled': return <Shield className="h-4 w-4 text-blue-500" />;
      case '2fa_disabled': return <Shield className="h-4 w-4 text-orange-500" />;
      case 'password_changed': return <Key className="h-4 w-4 text-purple-500" />;
      case 'api_key_created': return <Key className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Security Score */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Security Score</h2>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="85, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">85%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">2FA Enabled</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">Strong Password</span>
          </div>
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-600">API Keys Expiring</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => setActiveTab('2fa')}
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left"
        >
          <Shield className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Two-Factor Auth</h3>
          <p className="text-sm text-gray-600">Manage 2FA devices</p>
        </button>
        <button 
          onClick={() => setActiveTab('api')}
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left"
        >
          <Key className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">API Keys</h3>
          <p className="text-sm text-gray-600">Manage API access</p>
        </button>
        <button className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left">
          <Lock className="h-8 w-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Password</h3>
          <p className="text-sm text-gray-600">Change password</p>
        </button>
        <button 
          onClick={() => setActiveTab('activity')}
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left"
        >
          <Activity className="h-8 w-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Activity Log</h3>
          <p className="text-sm text-gray-600">View security events</p>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Security Events</h2>
        </div>
        <div className="divide-y">
          {securityEvents.slice(0, 5).map(event => (
            <div key={event.id} className="p-4 flex items-center space-x-4">
              {getEventIcon(event.type, event.success)}
              <div className="flex-1">
                <p className="text-sm text-gray-900">{event.description}</p>
                <p className="text-xs text-gray-500">{event.ip} • {event.location} • {event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const render2FA = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
        </div>
        <button 
          onClick={() => setShow2FASetup(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Device</span>
        </button>
      </div>

      <div className="space-y-4">
        {twoFactorDevices.map(device => (
          <div key={device.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${device.enabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                  {device.type === 'authenticator' && <Smartphone className={`h-6 w-6 ${device.enabled ? 'text-green-600' : 'text-gray-400'}`} />}
                  {device.type === 'sms' && <Smartphone className={`h-6 w-6 ${device.enabled ? 'text-green-600' : 'text-gray-400'}`} />}
                  {device.type === 'hardware' && <Key className={`h-6 w-6 ${device.enabled ? 'text-green-600' : 'text-gray-400'}`} />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{device.name}</h3>
                  <p className="text-sm text-gray-500">
                    {device.type === 'authenticator' && 'Authenticator App'}
                    {device.type === 'sms' && 'SMS Authentication'}
                    {device.type === 'hardware' && 'Hardware Key'}
                  </p>
                  {device.lastUsed && (
                    <p className="text-xs text-gray-400">Last used: {device.lastUsed}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  device.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {device.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <button className="text-gray-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Setup Two-Factor Authentication</h2>
                <button 
                  onClick={() => setShow2FASetup(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="h-24 w-24 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">Scan this QR code with your authenticator app</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter this code manually:
                  </label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                      JBSWY3DPEHPK3PXP
                    </code>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter verification code:
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button 
                onClick={() => setShow2FASetup(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAPI = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
          <p className="text-sm text-gray-600">Manage API keys for programmatic access</p>
        </div>
        <button 
          onClick={() => setShowApiKeyForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create API Key</span>
        </button>
      </div>

      <div className="space-y-4">
        {apiKeys.map(apiKey => (
          <div key={apiKey.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{apiKey.name}</h3>
                <p className="text-sm text-gray-500">Created {apiKey.created}</p>
                {apiKey.lastUsed && (
                  <p className="text-sm text-gray-500">Last used: {apiKey.lastUsed}</p>
                )}
                {apiKey.expires && (
                  <p className="text-sm text-orange-600">Expires: {apiKey.expires}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {copied[apiKey.id] ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <code className="flex-1 text-sm font-mono text-gray-800">
                  {showApiKey[apiKey.id] ? apiKey.key : '••••••••••••••••••••••••'}
                </code>
                <button 
                  onClick={() => toggleApiKeyVisibility(apiKey.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showApiKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Permissions:</p>
              <div className="flex flex-wrap gap-2">
                {apiKey.permissions.map(permission => (
                  <span key={permission} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Security Activity</h2>
        <p className="text-sm text-gray-600">Monitor login attempts and security events</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="divide-y">
          {securityEvents.map(event => (
            <div key={event.id} className="p-4">
              <div className="flex items-start space-x-4">
                {getEventIcon(event.type, event.success)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{event.description}</p>
                    <span className="text-xs text-gray-500">{event.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Globe className="h-3 w-3" />
                      <span>{event.ip}</span>
                    </span>
                    <span>{event.location}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      event.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {event.success ? 'Success' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security & Authentication</h1>
        <p className="text-gray-600">Manage your account security settings and access controls</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('2fa')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === '2fa'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Two-Factor Auth
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'api'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            API Keys
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'activity'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Activity Log
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === '2fa' && render2FA()}
      {activeTab === 'api' && renderAPI()}
      {activeTab === 'activity' && renderActivity()}
    </div>
  );
}