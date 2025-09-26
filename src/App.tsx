import React, { useState } from 'react';
import { 
  Server, 
  Cloud, 
  Shield, 
  Zap, 
  Globe, 
  Database, 
  Settings, 
  Users, 
  CreditCard,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Plus,
  Play,
  Square,
  RotateCcw,
  Trash2,
  Activity,
  HardDrive,
  Network,
  Lock,
  Key,
  Bell,
  User,
  LogOut,
  Eye,
  EyeOff,
  Copy,
  Check,
  ShoppingBag,
  Terminal
} from 'lucide-react';
import Marketplace from './components/Marketplace';
import DropletManagement from './components/DropletManagement';
import Security from './components/Security';

type Tab = 'dashboard' | 'instances' | 'droplets' | 'networking' | 'storage' | 'marketplace' | 'api' | 'security' | 'admin' | 'billing' | 'support';

interface Instance {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'creating';
  os: string;
  cpu: number;
  ram: number;
  storage: number;
  ip: string;
  region: string;
  uptime: string;
}

interface NetworkConfig {
  id: string;
  name: string;
  type: 'vpc' | 'firewall' | 'loadbalancer';
  status: 'active' | 'inactive';
  resources: number;
}

interface StorageVolume {
  id: string;
  name: string;
  size: number;
  type: 'ssd' | 'hdd';
  attached: string | null;
  status: 'available' | 'in-use';
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [keyGenerated, setKeyGenerated] = useState(false);

  const instances: Instance[] = [
    {
      id: 'i-1',
      name: 'web-server-prod',
      status: 'running',
      os: 'Ubuntu 22.04',
      cpu: 4,
      ram: 8,
      storage: 160,
      ip: '192.168.1.10',
      region: 'us-east-1',
      uptime: '15d 3h 21m'
    },
    {
      id: 'i-2',
      name: 'db-server',
      status: 'running',
      os: 'CentOS 8',
      cpu: 8,
      ram: 16,
      storage: 320,
      ip: '192.168.1.11',
      region: 'us-east-1',
      uptime: '22d 8h 45m'
    },
    {
      id: 'i-3',
      name: 'test-environment',
      status: 'stopped',
      os: 'Debian 11',
      cpu: 2,
      ram: 4,
      storage: 80,
      ip: '192.168.1.12',
      region: 'us-west-1',
      uptime: '0m'
    }
  ];

  const networkConfigs: NetworkConfig[] = [
    { id: 'n-1', name: 'main-vpc', type: 'vpc', status: 'active', resources: 3 },
    { id: 'n-2', name: 'web-firewall', type: 'firewall', status: 'active', resources: 8 },
    { id: 'n-3', name: 'load-balancer-1', type: 'loadbalancer', status: 'active', resources: 2 }
  ];

  const storageVolumes: StorageVolume[] = [
    { id: 'v-1', name: 'web-data', size: 100, type: 'ssd', attached: 'web-server-prod', status: 'in-use' },
    { id: 'v-2', name: 'db-backup', size: 500, type: 'hdd', attached: 'db-server', status: 'in-use' },
    { id: 'v-3', name: 'temp-storage', size: 50, type: 'ssd', attached: null, status: 'available' }
  ];

  const generateApiKey = () => {
    setKeyGenerated(true);
    setTimeout(() => setKeyGenerated(false), 2000);
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CloudHost Pro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Products</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Docs</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Support</button>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </nav>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Enterprise Cloud Infrastructure
            <span className="block text-blue-600">On Your Premises</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Deploy and manage virtual servers, storage, and networking with enterprise-grade reliability. 
            Full control, maximum security, hosted on your infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Scale
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl border hover:shadow-lg transition-shadow">
              <Server className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Virtual Machines</h3>
              <p className="text-gray-600">Deploy Linux and Windows VMs in seconds with flexible configurations</p>
            </div>
            <div className="text-center p-6 rounded-xl border hover:shadow-lg transition-shadow">
              <Network className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Private Networking</h3>
              <p className="text-gray-600">Secure VPCs, load balancers, and advanced firewall controls</p>
            </div>
            <div className="text-center p-6 rounded-xl border hover:shadow-lg transition-shadow">
              <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Block Storage</h3>
              <p className="text-gray-600">High-performance SSD storage that scales with your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Starter</h3>
              <div className="text-3xl font-bold text-blue-600 mb-6">$12<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />2 vCPUs</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />4GB RAM</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />80GB SSD</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />2TB Transfer</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional</h3>
              <div className="text-3xl font-bold text-blue-600 mb-6">$24<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />4 vCPUs</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />8GB RAM</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />160GB SSD</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />4TB Transfer</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <div className="text-3xl font-bold text-blue-600 mb-6">$96<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />16 vCPUs</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />32GB RAM</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />640GB SSD</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-3" />8TB Transfer</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderDashboard = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your infrastructure.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Instances</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Server className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Usage</p>
              <p className="text-2xl font-bold text-gray-900">$347</p>
            </div>
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">1.2TB</p>
            </div>
            <HardDrive className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Uptime</p>
              <p className="text-2xl font-bold text-gray-900">99.9%</p>
            </div>
            <Activity className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Instances</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {instances.slice(0, 3).map((instance) => (
                <div key={instance.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${instance.status === 'running' ? 'bg-green-400' : 'bg-red-400'}`} />
                    <div>
                      <p className="font-medium text-gray-900">{instance.name}</p>
                      <p className="text-sm text-gray-500">{instance.os}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    instance.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {instance.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">CPU Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '34%'}} />
                  </div>
                  <span className="text-sm text-gray-500">34%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Memory Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '67%'}} />
                  </div>
                  <span className="text-sm text-gray-500">67%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Storage Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '89%'}} />
                  </div>
                  <span className="text-sm text-gray-500">89%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInstances = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Instances</h1>
          <p className="text-gray-600">Manage your virtual machines and containers.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Instance</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Configuration</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">IP Address</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Uptime</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {instances.map((instance) => (
                <tr key={instance.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{instance.name}</p>
                      <p className="text-sm text-gray-500">{instance.os}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      instance.status === 'running' 
                        ? 'bg-green-100 text-green-800'
                        : instance.status === 'stopped'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {instance.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">
                      {instance.cpu} vCPU, {instance.ram}GB RAM
                    </div>
                    <div className="text-sm text-gray-500">{instance.storage}GB Storage</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{instance.ip}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{instance.uptime}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-yellow-600 transition-colors">
                        <Square className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 transition-colors">
                        <RotateCcw className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderNetworking = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Networking</h1>
          <p className="text-gray-600">Configure VPCs, firewalls, and load balancers.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Network Config</span>
        </button>
      </div>

      <div className="grid gap-6">
        {networkConfigs.map((config) => (
          <div key={config.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  config.type === 'vpc' ? 'bg-blue-100' :
                  config.type === 'firewall' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  {config.type === 'vpc' ? <Globe className="h-5 w-5 text-blue-600" /> :
                   config.type === 'firewall' ? <Shield className="h-5 w-5 text-red-600" /> :
                   <Zap className="h-5 w-5 text-green-600" />}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{config.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{config.type.replace(/([A-Z])/g, ' $1')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  config.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {config.status}
                </span>
                <span className="text-sm text-gray-500">{config.resources} resources</span>
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-600">
                {config.type === 'vpc' && 'Private network with custom IP ranges and routing tables'}
                {config.type === 'firewall' && 'Security rules controlling inbound and outbound traffic'}
                {config.type === 'loadbalancer' && 'Distributes incoming traffic across multiple instances'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStorage = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Storage</h1>
          <p className="text-gray-600">Manage block storage volumes and backups.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Volume</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Size</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Type</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Attached To</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storageVolumes.map((volume) => (
                <tr key={volume.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <HardDrive className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{volume.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{volume.size}GB</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      volume.type === 'ssd' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {volume.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      volume.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {volume.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {volume.attached || 'Not attached'}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderApi = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">API Management</h1>
        <p className="text-gray-600">Generate and manage API keys for programmatic access.</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
              <p className="text-sm text-gray-600">Use these keys to authenticate API requests</p>
            </div>
            <button 
              onClick={generateApiKey}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Key className="h-4 w-4" />
              <span>Generate Key</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Key className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Production API Key</p>
                  <p className="text-sm text-gray-500">Created 2 weeks ago • Last used 3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded border">
                  <code className="text-sm font-mono text-gray-600">
                    {showApiKey ? 'chp_live_sk_12345abcdef67890' : '••••••••••••••••••••••••'}
                  </code>
                  <button 
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
              </div>
            </div>

            {keyGenerated && (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">New API Key Generated</p>
                    <p className="text-sm text-green-700">chp_live_sk_new987654321fedcba</p>
                  </div>
                </div>
                <button className="text-green-600 hover:text-green-800">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h2>
          <div className="prose max-w-none">
            <h3 className="text-md font-semibold text-gray-900 mb-2">Authentication</h3>
            <p className="text-gray-600 mb-4">Include your API key in the Authorization header:</p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
              <code>curl -H "Authorization: Bearer YOUR_API_KEY" https://api.cloudhost.example.com/v1/instances</code>
            </div>

            <h3 className="text-md font-semibold text-gray-900 mb-2">Common Endpoints</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                  <span className="ml-3 font-mono text-sm">/v1/instances</span>
                </div>
                <span className="text-sm text-gray-600">List all instances</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">POST</span>
                  <span className="ml-3 font-mono text-sm">/v1/instances</span>
                </div>
                <span className="text-sm text-gray-600">Create new instance</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <span className="font-mono text-sm bg-red-100 text-red-800 px-2 py-1 rounded">DELETE</span>
                  <span className="ml-3 font-mono text-sm">/v1/instances/{id}</span>
                </div>
                <span className="text-sm text-gray-600">Delete instance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdmin = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Monitor and manage your infrastructure and users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-600">Compute Nodes</span>
              </div>
              <span className="text-sm font-medium text-gray-900">8/8 Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-600">Storage Cluster</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-600">Network Load</span>
              </div>
              <span className="text-sm font-medium text-gray-900">High (78%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h2>
          <div className="space-y-4">
            <div className="text-2xl font-bold text-gray-900">247</div>
            <p className="text-gray-600">Active users this month</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '68%'}} />
            </div>
            <p className="text-sm text-gray-500">68% increase from last month</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Events</h2>
        </div>
        <div className="divide-y">
          <div className="p-4 flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Instance 'web-server-prod' started successfully</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="p-4 flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">New user registered: john@example.com</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
          <div className="p-4 flex items-center space-x-4">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Storage volume 'db-backup' approaching capacity</p>
              <p className="text-xs text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (activeTab === 'dashboard' && window.location.pathname === '/') {
    return renderLandingPage();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CloudHost Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm border-r min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Activity className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('instances')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'instances' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Server className="h-5 w-5" />
                <span>Instances</span>
              </button>
              <button
                onClick={() => setActiveTab('droplets')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'droplets' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Terminal className="h-5 w-5" />
                <span>Droplets</span>
              </button>
              <button
                onClick={() => setActiveTab('networking')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'networking' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Network className="h-5 w-5" />
                <span>Networking</span>
              </button>
              <button
                onClick={() => setActiveTab('storage')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'storage' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <HardDrive className="h-5 w-5" />
                <span>Storage</span>
              </button>
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'marketplace' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Marketplace</span>
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'api' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Key className="h-5 w-5" />
                <span>API</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'admin' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Admin</span>
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'billing' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>Billing</span>
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'support' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                <span>Support</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'instances' && renderInstances()}
          {activeTab === 'droplets' && <DropletManagement />}
          {activeTab === 'networking' && renderNetworking()}
          {activeTab === 'storage' && renderStorage()}
          {activeTab === 'marketplace' && <Marketplace />}
          {activeTab === 'api' && renderApi()}
          {activeTab === 'security' && <Security />}
          {activeTab === 'admin' && renderAdmin()}
          {activeTab === 'billing' && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Billing & Usage</h1>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <p className="text-gray-600">Billing management and usage tracking coming soon...</p>
              </div>
            </div>
          )}
          {activeTab === 'support' && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Support Center</h1>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <p className="text-gray-600">Support ticketing system and knowledge base coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;