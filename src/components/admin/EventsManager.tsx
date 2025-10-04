import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Upload, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { events as defaultEvents, Event as EventType } from '@/constants/events';
import ImageUpload from './ImageUpload';

interface EventsManagerProps {
  onBackToDashboard: () => void;
}

const EventsManager: React.FC<EventsManagerProps> = ({ onBackToDashboard }) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [formData, setFormData] = useState<Partial<EventType>>({});
  const [showImageUpload, setShowImageUpload] = useState(false);

  useEffect(() => {
    // Load events from localStorage or defaults
    const stored = localStorage.getItem('cms_events');
    if (stored) {
      setEvents(JSON.parse(stored));
    } else {
      setEvents(defaultEvents);
    }
  }, []);

  const saveEvents = (newEvents: EventType[]) => {
    setEvents(newEvents);
    localStorage.setItem('cms_events', JSON.stringify(newEvents));
  };

  const handleAdd = () => {
    setEditingEvent(null);
    setFormData({
      id: Date.now(),
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: '',
      status: 'upcoming',
      category: '',
      registrationLink: '',
      tags: []
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (event: EventType) => {
    setEditingEvent(event);
    setFormData({ ...event });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const newEvents = events.filter(e => e.id !== id);
    saveEvents(newEvents);
    toast.success('Event deleted successfully');
  };

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    let newEvents;
    if (editingEvent) {
      newEvents = events.map(e => e.id === editingEvent.id ? { ...formData } as EventType : e);
      toast.success('Event updated successfully');
    } else {
      newEvents = [...events, { ...formData } as EventType];
      toast.success('Event added successfully');
    }

    saveEvents(newEvents);
    setIsDialogOpen(false);
  };

  const handleInputChange = (field: keyof EventType, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBackToDashboard}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Events Management</h2>
        <p className="text-gray-600 text-sm">Total Events: {events.length}</p>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">All Events</h3>
            <Button onClick={handleAdd} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(event.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
            <DialogDescription>
              Fill in the event details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={formData.time || ''}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
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
            <div className="space-y-3">
              <Label htmlFor="image">Event Image</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image" className="text-sm text-gray-600">Image URL</Label>
                  <Input
                    id="image"
                    placeholder="Enter image URL or upload below"
                    value={formData.image || ''}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowImageUpload(!showImageUpload)}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {showImageUpload ? 'Hide Upload' : 'Upload Image'}
                  </Button>
                </div>
              </div>

              {showImageUpload && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <ImageUpload
                    onImagesUploaded={(images) => {
                      if (images.length > 0) {
                        handleInputChange('image', images[0]);
                        setShowImageUpload(false);
                      }
                    }}
                    maxFiles={1}
                    maxSizeMB={5}
                    existingImages={[]}
                  />
                </motion.div>
              )}

              {formData.image && (
                <div className="mt-3">
                  <Label className="text-sm text-gray-600">Preview</Label>
                  <div className="mt-2 w-32 h-20 bg-gray-100 rounded border overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Event preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/src/assets/placeholder.svg';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status || 'upcoming'} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="registrationLink">Registration Link</Label>
                <Input
                  id="registrationLink"
                  value={formData.registrationLink || ''}
                  onChange={(e) => handleInputChange('registrationLink', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags?.join(', ') || ''}
                onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(t => t.trim()))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingEvent ? 'Update' : 'Add'} Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsManager;
