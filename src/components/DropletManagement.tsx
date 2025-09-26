import React, { useState } from 'react';
import { 
  Server, 
  Terminal, 
  Key, 
  Shield, 
  Monitor, 
  HardDrive, 
  Network, 
  Settings,
  Play,
  Square,
  RotateCcw,
  Trash2,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Download,
  Upload,
  Activity,
  Cpu,
  MemoryStick,
  Wifi,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

interface Droplet {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'creating' | 'rebooting';
  os: string;
  cpu: number;
  ram: number;
  storage: number;
  ip: string;
  privateIp: string;
  region: string;
  uptime: string;
  monthlyPrice: number;
  sshKeys: string[];
  backups: boolean;
  monitoring: boolean;
  ipv6: boolean;
  vpc: string;
  tags: string[];
  created: string;
  lastBackup?: string;
}

interface SSHKey {
  id: string;
  name: string;
  fingerprint: string;
  publicKey: string;
  created: string;
  lastUsed?: string;
}

const droplets: Droplet[] = [
  {
    id: 'drop-1',
    name: 'web-server-prod',
    status: 'running',
    os: 'Ubuntu 22.04 LTS',
    cpu: 4,
    ram: 8,
    storage: 160,
    ip: '192.168.1.10',
    privateIp: '10.0.1.10',
    region: 'datacenter-1',
    uptime: '15d 3h 21m',
    monthlyPrice: 48,
    sshKeys: ['ssh-1', 'ssh-2'],
    backups: true,
    monitoring: true,
    ipv6: true,
    vpc: 'main-vpc',
    tags: ['production', 'web', 'nginx'],
    created: '2024-01-10',
    lastBackup: '2024-01-25 02:00'
  },
  {
    id: 'drop-2',
    name: 'db-server',
    status: 'running',
    os: 'CentOS 8',
    cpu: 8,
    ram: 16,
    storage: 320,
    ip: '192.168.1.11',
    privateIp: '10.0.1.11',
    region: 'datacenter-1',
    uptime: '22d 8h 45m',
    monthlyPrice: 96,
    sshKeys: ['ssh-1'],
    backups: true,
    monitoring: true,
    ipv6: false,
    vpc: 'main-vpc',
    tags: ['production', 'database', 'postgresql'],
    created: '2024-01-05',
    lastBackup: '2024-01-25 02:30'
  },
  {
    id: 'drop-3',
    name: 'test-environment',
    status: 'stopped',
    os: 'Debian 11',
    cpu: 2,
    ram: 4,
    storage: 80,
    ip: '192.168.1.12',
    privateIp: '10.0.1.12',
    region: 'datacenter-2',
    uptime: '0m',
    monthlyPrice: 24,
    sshKeys: ['ssh-2'],
    backups: false,
    monitoring: false,
    ipv6: false,
    vpc: 'test-vpc',
    tags: ['development', 'testing'],
    created: '2024-01-20'
  }
];

const sshKeys: SSHKey[] = [
  {
    id: 'ssh-1',
    name: 'main-workstation',
    fingerprint: 'SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8',
    publicKey: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC7vbqajDjnGHBo...',
    created: '2024-01-01',
    lastUsed: '2024-01-25 14:30'
  },
  {
    id: 'ssh-2',
    name: 'backup-laptop',
    fingerprint: 'SHA256:kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8nThbg6',
    publicKey: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDjnGHBo7vbqaj...',
    created: '2024-01-15',
    lastUsed: '2024-01-23 09:15'
  }
];

export default function DropletManagement() {
  const [selectedDroplet, setSelectedDroplet] = useState<Droplet | null>(null);
  const [showSSHKeys, setShowSSHKeys] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [consoleInput, setConsoleInput] = useState('');
  const [showCreateDroplet, setShowCreateDroplet] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-red-100 text-red-800';
      case 'creating': return 'bg-yellow-100 text-yellow-800';
      case 'rebooting': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'stopped': return <Square className="h-4 w-4 text-red-600" />;
      case 'creating': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rebooting': return <RotateCcw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleConsoleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    
    const newOutput = consoleOutput + `$ ${consoleInput}\n`;
    setConsoleOutput(newOutput + `Command executed: ${consoleInput}\n`);
    setConsoleInput('');
  };

  const openSSHConsole = (droplet: Droplet) => {
    setSelectedDroplet(droplet);
    setShowConsole(true);
    setConsoleOutput(`Connected to ${droplet.name} (${droplet.ip})\nUbuntu 22.04.3 LTS\n\nLast login: ${new Date().toLocaleString()}\n`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Droplets</h1>
          <p className="text-gray-600">Manage your virtual machines and cloud servers</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowSSHKeys(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Key className="h-4 w-4" />
            <span>SSH Keys</span>
          </button>
          <button 
            onClick={() => setShowCreateDroplet(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Droplet</span>
          </button>
        </div>
      </div>

      {/* Droplets Grid */}
      <div className="grid gap-6">
        {droplets.map((droplet) => (
          <div key={droplet.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Server className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{droplet.name}</h3>
                    <p className="text-sm text-gray-500">{droplet.os}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(droplet.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(droplet.status)}`}>
                        {droplet.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${droplet.monthlyPrice}/mo</p>
                  <p className="text-sm text-gray-500">Created {droplet.created}</p>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{droplet.cpu} vCPU</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MemoryStick className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{droplet.ram}GB RAM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{droplet.storage}GB SSD</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Network className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{droplet.region}</span>
                </div>
              </div>

              {/* Network Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Network Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Public IP</label>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono bg-white px-2 py-1 rounded border">{droplet.ip}</code>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Private IP</label>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono bg-white px-2 py-1 rounded border">{droplet.privateIp}</code>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    {droplet.backups ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Square className="h-4 w-4 text-gray-400" />}
                    <span className={droplet.backups ? 'text-green-700' : 'text-gray-500'}>Backups</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {droplet.monitoring ? <Activity className="h-4 w-4 text-blue-500" /> : <Square className="h-4 w-4 text-gray-400" />}
                    <span className={droplet.monitoring ? 'text-blue-700' : 'text-gray-500'}>Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {droplet.ipv6 ? <Wifi className="h-4 w-4 text-purple-500" /> : <Square className="h-4 w-4 text-gray-400" />}
                    <span className={droplet.ipv6 ? 'text-purple-700' : 'text-gray-500'}>IPv6</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {droplet.tags.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm text-gray-500 mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {droplet.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => openSSHConsole(droplet)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  disabled={droplet.status !== 'running'}
                >
                  <Terminal className="h-4 w-4" />
                  <span>Console</span>
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Start</span>
                </button>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>Reboot</span>
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                  <Square className="h-4 w-4" />
                  <span>Stop</span>
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Destroy</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SSH Keys Modal */}
      {showSSHKeys && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">SSH Keys</h2>
                <button 
                  onClick={() => setShowSSHKeys(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add SSH Key</span>
                </button>
              </div>
              <div className="space-y-4">
                {sshKeys.map(key => (
                  <div key={key.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{key.name}</h3>
                        <p className="text-sm text-gray-500">Added {key.created}</p>
                        {key.lastUsed && (
                          <p className="text-sm text-gray-500">Last used: {key.lastUsed}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-sm text-gray-600 mb-2">Fingerprint:</p>
                      <code className="text-xs font-mono text-gray-800">{key.fingerprint}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Console Modal */}
      {showConsole && selectedDroplet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="bg-gray-800 p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Terminal className="h-5 w-5 text-green-400" />
                  <h2 className="text-lg font-semibold text-white">
                    Console - {selectedDroplet.name}
                  </h2>
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                    Connected
                  </span>
                </div>
                <button 
                  onClick={() => setShowConsole(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 h-96 overflow-y-auto">
              <div className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                {consoleOutput}
              </div>
            </div>
            <div className="bg-gray-800 p-4 border-t border-gray-700">
              <form onSubmit={handleConsoleCommand} className="flex space-x-2">
                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-green-400 font-mono">$</span>
                  <input
                    type="text"
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border-gray-600 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                    placeholder="Enter command..."
                    autoFocus
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Execute
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}