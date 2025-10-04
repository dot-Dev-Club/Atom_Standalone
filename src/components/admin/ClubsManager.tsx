import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription as CardDesc, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { clubs as defaultClubs } from '@/constants/clubs';

interface ClubCoordinator {
  name: string;
  role: string;
  image: string;
  isMain: boolean;
  bio?: string;
  linkedin?: string;
}

interface ClubProject {
  name: string;
  description: string;
  github?: string;
}

interface Club {
  id: number;
  name: string;
  icon: string | React.ComponentType<any>;
  description: string;
  objectives: string;
  extraInfo: string;
  coordinators: ClubCoordinator[];
  projects: ClubProject[];
  gallery: string[];
}

const ClubsManager: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [formData, setFormData] = useState<Partial<Club>>({});

  useEffect(() => {
    // Load clubs from localStorage or defaults
    const stored = localStorage.getItem('cms_clubs');
    if (stored) {
      setClubs(JSON.parse(stored));
    } else {
      setClubs(defaultClubs);
    }
  }, []);

  const saveClubs = (newClubs: Club[]) => {
    setClubs(newClubs);
    localStorage.setItem('cms_clubs', JSON.stringify(newClubs));
  };

  const handleEdit = (club: Club) => {
    setEditingClub(club);
    setFormData({ ...club });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newClubs = clubs.map(c => c.id === editingClub!.id ? { ...formData } as Club : c);
    saveClubs(newClubs);
    toast.success('Club updated successfully');
    setIsDialogOpen(false);
  };

  const handleInputChange = (field: keyof Club, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Coordinator management
  const addCoordinator = () => {
    const newCoordinator: ClubCoordinator = {
      name: '',
      role: '',
      image: '',
      isMain: false,
      bio: '',
      linkedin: ''
    };
    setFormData(prev => ({
      ...prev,
      coordinators: [...(prev.coordinators || []), newCoordinator]
    }));
  };

  const updateCoordinator = (index: number, field: keyof ClubCoordinator, value: any) => {
    const updatedCoordinators = [...(formData.coordinators || [])];
    updatedCoordinators[index] = { ...updatedCoordinators[index], [field]: value };
    setFormData(prev => ({ ...prev, coordinators: updatedCoordinators }));
  };

  const removeCoordinator = (index: number) => {
    const updatedCoordinators = (formData.coordinators || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, coordinators: updatedCoordinators }));
  };

  // Project management
  const addProject = () => {
    const newProject: ClubProject = {
      name: '',
      description: '',
      github: ''
    };
    setFormData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProject]
    }));
  };

  const updateProject = (index: number, field: keyof ClubProject, value: string) => {
    const updatedProjects = [...(formData.projects || [])];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const removeProject = (index: number) => {
    const updatedProjects = (formData.projects || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, projects: updatedProjects }));
  };

  // Gallery management
  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), '']
    }));
  };

  const updateGalleryImage = (index: number, value: string) => {
    const updatedGallery = [...(formData.gallery || [])];
    updatedGallery[index] = value;
    setFormData(prev => ({ ...prev, gallery: updatedGallery }));
  };

  const removeGalleryImage = (index: number) => {
    const updatedGallery = (formData.gallery || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, gallery: updatedGallery }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Clubs ({clubs.length})</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Coordinators</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead>Gallery</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clubs.map((club) => (
            <TableRow key={club.id}>
              <TableCell className="font-medium">{club.name}</TableCell>
              <TableCell className="max-w-xs truncate">{club.description}</TableCell>
              <TableCell>{club.coordinators.length}</TableCell>
              <TableCell>{club.projects.length}</TableCell>
              <TableCell>{club.gallery.length}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEdit(club)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Club</DialogTitle>
            <DialogDescription>
              Modify club details, coordinators, projects, and gallery.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="coordinators">Coordinators</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon URL</Label>
                  <Input
                    id="icon"
                    value={formData.icon || ''}
                    onChange={(e) => handleInputChange('icon', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="objectives">Objectives</Label>
                  <Textarea
                    id="objectives"
                    value={formData.objectives || ''}
                    onChange={(e) => handleInputChange('objectives', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="extraInfo">Extra Info</Label>
                  <Textarea
                    id="extraInfo"
                    value={formData.extraInfo || ''}
                    onChange={(e) => handleInputChange('extraInfo', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="coordinators" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold">Coordinators</h4>
                <Button onClick={addCoordinator} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Coordinator
                </Button>
              </div>
              <div className="space-y-4">
                {(formData.coordinators || []).map((coordinator, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Coordinator {index + 1}</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => removeCoordinator(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Name"
                          value={coordinator.name}
                          onChange={(e) => updateCoordinator(index, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="Role"
                          value={coordinator.role}
                          onChange={(e) => updateCoordinator(index, 'role', e.target.value)}
                        />
                      </div>
                      <Input
                        placeholder="Image URL"
                        value={coordinator.image}
                        onChange={(e) => updateCoordinator(index, 'image', e.target.value)}
                      />
                      <Textarea
                        placeholder="Bio"
                        value={coordinator.bio || ''}
                        onChange={(e) => updateCoordinator(index, 'bio', e.target.value)}
                        rows={2}
                      />
                      <Input
                        placeholder="LinkedIn URL"
                        value={coordinator.linkedin || ''}
                        onChange={(e) => updateCoordinator(index, 'linkedin', e.target.value)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold">Projects</h4>
                <Button onClick={addProject} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
              <div className="space-y-4">
                {(formData.projects || []).map((project, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Project {index + 1}</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => removeProject(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Input
                        placeholder="Project Name"
                        value={project.name}
                        onChange={(e) => updateProject(index, 'name', e.target.value)}
                      />
                      <Textarea
                        placeholder="Description"
                        value={project.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        rows={2}
                      />
                      <Input
                        placeholder="GitHub URL"
                        value={project.github || ''}
                        onChange={(e) => updateProject(index, 'github', e.target.value)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold">Gallery Images</h4>
                <Button onClick={addGalleryImage} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </div>
              <div className="space-y-2">
                {(formData.gallery || []).map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Image URL"
                      value={image}
                      onChange={(e) => updateGalleryImage(index, e.target.value)}
                    />
                    <Button variant="outline" size="sm" onClick={() => removeGalleryImage(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Update Club
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClubsManager;
