import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const mockServices = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Custom website development using modern technologies and frameworks.',
    shortDescription: 'Build custom websites and web applications',
    price: 'Starting at $2,500',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile Friendly'],
    displayOrder: 1,
    isActive: true,
    category: 'Development',
  },
  {
    id: '2',
    name: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your online presence.',
    shortDescription: 'Boost your online visibility and reach',
    price: 'Starting at $1,200/month',
    features: ['SEO', 'Social Media', 'PPC Campaigns', 'Analytics'],
    displayOrder: 2,
    isActive: true,
    category: 'Marketing',
  },
  {
    id: '3',
    name: 'Branding & Design',
    description: 'Professional branding and graphic design services for your business.',
    shortDescription: 'Create a memorable brand identity',
    price: 'Starting at $800',
    features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'UI/UX Design'],
    displayOrder: 3,
    isActive: true,
    category: 'Design',
  },
  {
    id: '4',
    name: 'Consulting',
    description: 'Strategic business consulting to help you make informed decisions.',
    shortDescription: 'Expert business strategy guidance',
    price: '$150/hour',
    features: ['Strategy Planning', 'Market Analysis', 'Growth Planning', 'Risk Assessment'],
    displayOrder: 4,
    isActive: false,
    category: 'Consulting',
  },
];

export default function ServicesManagement() {
  const [services, setServices] = useState(mockServices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    features: [''],
    displayOrder: services.length + 1,
    isActive: true,
    category: '',
  });

  const handleAdd = () => {
    const newService = {
      id: Date.now().toString(),
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
    };
    setServices([...services, newService]);
    setFormData({
      name: '',
      description: '',
      shortDescription: '',
      price: '',
      features: [''],
      displayOrder: services.length + 2,
      isActive: true,
      category: '',
    });
    setIsAddDialogOpen(false);
    toast.success('Service added successfully!');
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      shortDescription: service.shortDescription,
      price: service.price,
      features: service.features.length > 0 ? service.features : [''],
      displayOrder: service.displayOrder,
      isActive: service.isActive,
      category: service.category,
    });
  };

  const handleUpdate = () => {
    setServices(services.map(s => 
      s.id === editingService.id ? { 
        ...editingService, 
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
      } : s
    ));
    setEditingService(null);
    toast.success('Service updated successfully!');
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    toast.success('Service deleted successfully!');
  };

  const toggleActive = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
    toast.success('Service status updated!');
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const sortedServices = [...services].sort((a, b) => a.displayOrder - b.displayOrder);

  const ServiceForm = () => (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Service Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter service name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="Enter service category"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Input
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          placeholder="Brief one-line description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Full Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Detailed service description"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="e.g., Starting at $500 or $100/hour"
        />
      </div>

      <div className="space-y-2">
        <Label>Features</Label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
              placeholder="Enter feature"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeFeature(index)}
              disabled={formData.features.length === 1}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addFeature}>
          Add Feature
        </Button>
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
        onClick={editingService ? handleUpdate : handleAdd}
        className="w-full"
      >
        {editingService ? 'Update' : 'Add'} Service
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Services & Products</h2>
          <p className="text-muted-foreground">
            Manage your service offerings and product catalog
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service or product offering
              </DialogDescription>
            </DialogHeader>
            <ServiceForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedServices.map((service) => (
          <Card key={service.id} className={!service.isActive ? 'opacity-60' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.category}</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  #{service.displayOrder}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm font-medium">{service.shortDescription}</p>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600">{service.price}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {service.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge variant={service.isActive ? 'default' : 'secondary'}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(service.id)}
                    >
                      <Switch checked={service.isActive} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update the service details
            </DialogDescription>
          </DialogHeader>
          <ServiceForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}