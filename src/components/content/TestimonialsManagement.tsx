import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';

const mockTestimonials = [
  {
    id: '1',
    clientName: 'John Smith',
    company: 'Tech Solutions Inc.',
    testimonial: 'Outstanding service and support. The team went above and beyond to deliver exactly what we needed.',
    rating: 5,
    photo: null,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    company: 'Creative Agency',
    testimonial: 'Professional, reliable, and innovative. Highly recommend their services to anyone looking for quality work.',
    rating: 5,
    photo: null,
    isActive: true,
    displayOrder: 2,
  },
  {
    id: '3',
    clientName: 'Mike Wilson',
    company: 'Startup Co.',
    testimonial: 'Excellent communication throughout the project. The final result exceeded our expectations.',
    rating: 4,
    photo: null,
    isActive: false,
    displayOrder: 3,
  },
];

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    testimonial: '',
    rating: 5,
    isActive: true,
    displayOrder: testimonials.length + 1,
  });

  const handleAdd = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      ...formData,
      photo: null,
    };
    setTestimonials([...testimonials, newTestimonial]);
    setFormData({
      clientName: '',
      company: '',
      testimonial: '',
      rating: 5,
      isActive: true,
      displayOrder: testimonials.length + 2,
    });
    setIsAddDialogOpen(false);
    toast.success('Testimonial added successfully!');
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      company: testimonial.company,
      testimonial: testimonial.testimonial,
      rating: testimonial.rating,
      isActive: testimonial.isActive,
      displayOrder: testimonial.displayOrder,
    });
  };

  const handleUpdate = () => {
    setTestimonials(testimonials.map(t => 
      t.id === editingTestimonial.id ? { ...editingTestimonial, ...formData } : t
    ));
    setEditingTestimonial(null);
    toast.success('Testimonial updated successfully!');
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    toast.success('Testimonial deleted successfully!');
  };

  const toggleActive = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, isActive: !t.isActive } : t
    ));
    toast.success('Testimonial status updated!');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const TestimonialForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="clientName">Client Name</Label>
        <Input
          id="clientName"
          value={formData.clientName}
          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          placeholder="Enter client name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company/Position</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="Enter company or position"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="testimonial">Testimonial Text</Label>
        <Textarea
          id="testimonial"
          value={formData.testimonial}
          onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
          placeholder="Enter the testimonial text"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <select
          id="rating"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
          className="w-full p-2 border rounded-md"
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="displayOrder">Display Order</Label>
        <Input
          id="displayOrder"
          type="number"
          value={formData.displayOrder}
          onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
          min="1"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="isActive">Active</Label>
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked:boolean) => setFormData({ ...formData, isActive: checked })}
        />
      </div>

      <Button 
        onClick={editingTestimonial ? handleUpdate : handleAdd}
        className="w-full"
      >
        {editingTestimonial ? 'Update' : 'Add'} Testimonial
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Testimonials</h2>
          <p className="text-muted-foreground">
            Manage customer testimonials and reviews
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>
                Create a new customer testimonial
              </DialogDescription>
            </DialogHeader>
            <TestimonialForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={!testimonial.isActive ? 'opacity-60' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.photo || ''} />
                    <AvatarFallback>
                      {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{testimonial.clientName}</CardTitle>
                    <CardDescription>{testimonial.company}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                "{testimonial.testimonial}"
              </p>
              <div className="flex items-center justify-between">
                <Badge variant={testimonial.isActive ? 'default' : 'secondary'}>
                  {testimonial.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(testimonial.id)}
                  >
                    <Switch checked={testimonial.isActive} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingTestimonial} onOpenChange={() => setEditingTestimonial(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>
              Update the testimonial details
            </DialogDescription>
          </DialogHeader>
          <TestimonialForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}