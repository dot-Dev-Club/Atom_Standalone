import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, Calendar, Building, Image } from 'lucide-react';
import EventsManager from '@/components/admin/EventsManager';
import CoordinatorsManager from '@/components/admin/CoordinatorsManager';
import ClubsManager from '@/components/admin/ClubsManager';
import GalleryManager from '@/components/admin/GalleryManager';

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('events');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">ATOM CMS Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="coordinators" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Coordinators
            </TabsTrigger>
            <TabsTrigger value="clubs" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Clubs
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Events Management</CardTitle>
                <CardDescription>
                  Add, edit, and delete events displayed on the website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EventsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coordinators">
            <Card>
              <CardHeader>
                <CardTitle>Coordinators Management</CardTitle>
                <CardDescription>
                  Manage coordinator information and profiles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CoordinatorsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clubs">
            <Card>
              <CardHeader>
                <CardTitle>Clubs Management</CardTitle>
                <CardDescription>
                  Edit club details, coordinators, projects, and galleries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClubsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Photo Gallery Management</CardTitle>
                <CardDescription>
                  Manage the main photo gallery images.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GalleryManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
