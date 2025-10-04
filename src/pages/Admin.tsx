import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LogOut,
  Users,
  Calendar,
  Building,
  Image,
  BarChart3,
  Menu,
  X,
  Atom
} from 'lucide-react';
import EventsManager from '@/components/admin/EventsManager';
import CoordinatorsManager from '@/components/admin/CoordinatorsManager';
import ClubsManager from '@/components/admin/ClubsManager';
import GalleryManager from '@/components/admin/GalleryManager';
import { getEvents, getCoordinators, getClubs, getGalleryImages } from '@/utils/dataService';

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    events: 0,
    coordinators: 0,
    clubs: 0,
    gallery: 0
  });

  useEffect(() => {
    // Load statistics
    const events = getEvents();
    const coordinators = getCoordinators();
    const clubs = getClubs();
    const gallery = getGalleryImages();

    setStats({
      events: events.length,
      coordinators: coordinators.length,
      clubs: clubs.length,
      gallery: gallery.length
    });
  }, []);

  const handleLogout = () => {
    logout();
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'coordinators', name: 'Coordinators', icon: Users },
    { id: 'clubs', name: 'Clubs', icon: Building },
    { id: 'gallery', name: 'Gallery', icon: Image },
  ];

  const StatCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: React.ComponentType<any> }) => (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className="p-2 bg-gray-100 rounded-lg">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h2>
                  <p className="text-gray-600">Manage your website content from here.</p>
                </div>
                <Atom className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Events" value={stats.events} icon={Calendar} />
              <StatCard title="Coordinators" value={stats.coordinators} icon={Users} />
              <StatCard title="Active Clubs" value={stats.clubs} icon={Building} />
              <StatCard title="Gallery Images" value={stats.gallery} icon={Image} />
            </div>

            {/* Quick Actions */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to manage your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {navigation.slice(1).map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant="outline"
                        className="h-16 flex flex-col items-center justify-center space-y-1"
                        onClick={() => setActiveSection(item.id)}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs">{item.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'events':
        return <EventsManager onBackToDashboard={() => setActiveSection('dashboard')} />;

      case 'coordinators':
        return <CoordinatorsManager onBackToDashboard={() => setActiveSection('dashboard')} />;

      case 'clubs':
        return <ClubsManager onBackToDashboard={() => setActiveSection('dashboard')} />;

      case 'gallery':
        return <GalleryManager onBackToDashboard={() => setActiveSection('dashboard')} />;

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Atom className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">ATOM CMS</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {navigation.find(item => item.id === activeSection)?.name || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">Manage your website content</p>
              </div>
            </div>

            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </Badge>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
