import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { coordinators as defaultCoordinators } from '@/constants/coordinators';

interface Coordinator {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
}

const CoordinatorsManager: React.FC = () => {
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoordinator, setEditingCoordinator] = useState<Coordinator | null>(null);
  const [formData, setFormData] = useState<Partial<Coordinator>>({});

  useEffect(() => {
    // Load coordinators from localStorage or defaults
    const stored = localStorage.getItem('cms_coordinators');
    if (stored) {
      setCoordinators(JSON.parse(stored));
    } else {
      setCoordinators(defaultCoordinators);
    }
  }, []);

  const saveCoordinators = (newCoordinators: Coordinator[]) => {
    setCoordinators(newCoordinators);
    localStorage.setItem('cms_coordinators', JSON.stringify(newCoordinators));
  };

  const handleAdd = () => {
    setEditingCoordinator(null);
    setFormData({
      id: Date.now(),
      name: '',
      role: '',
      image: '',
      bio: '',
      linkedin: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (coordinator: Coordinator) => {
    setEditingCoordinator(coordinator);
    setFormData({ ...coordinator });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const newCoordinators = coordinators.filter(c => c.id !== id);
    saveCoordinators(newCoordinators);
    toast.success('Coordinator deleted successfully');
  };

  const handleSave = () => {
    if (!formData.name || !formData.role || !formData.bio) {
      toast.error('Please fill in all required fields');
      return;
    }

    let newCoordinators;
    if (editingCoordinator) {
      newCoordinators = coordinators.map(c => c.id === editingCoordinator.id ? { ...formData } as Coordinator : c);
      toast.success('Coordinator updated successfully');
    } else {
      newCoordinators = [...coordinators, { ...formData } as Coordinator];
      toast.success('Coordinator added successfully');
    }

    saveCoordinators(newCoordinators);
    setIsDialogOpen(false);
  };

  const handleInputChange = (field: keyof Coordinator, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Coordinators ({coordinators.length})</h3>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Coordinator
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Bio</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coordinators.map((coordinator) => (
            <TableRow key={coordinator.id}>
              <TableCell className="font-medium">{coordinator.name}</TableCell>
              <TableCell>{coordinator.role}</TableCell>
              <TableCell className="max-w-xs truncate">{coordinator.bio}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(coordinator)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(coordinator.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCoordinator ? 'Edit Coordinator' : 'Add Coordinator'}</DialogTitle>
            <DialogDescription>
              Fill in the coordinator details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role || ''}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image || ''}
                onChange={(e) => handleInputChange('image', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={formData.linkedin || ''}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingCoordinator ? 'Update' : 'Add'} Coordinator
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoordinatorsManager;
