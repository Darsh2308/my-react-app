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
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

const mockTeamMembers = [
  {
    id: '1',
    name: 'John Smith',
    position: 'CEO & Founder',
    bio: 'John has over 15 years of experience in technology and business development. He founded the company with a vision to deliver exceptional services.',
    photo: null,
    displayOrder: 1,
    isActive: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    position: 'Head of Operations',
    bio: 'Sarah leads our operations team and ensures smooth delivery of all projects. She brings 12 years of operational excellence.',
    photo: null,
    displayOrder: 2,
    isActive: true,
  },
  {
    id: '3',
    name: 'Mike Wilson',
    position: 'Lead Developer',
    bio: 'Mike is our technical lead with expertise in modern web technologies. He has been with us for 8 years.',
    photo: null,
    displayOrder: 3,
    isActive: true,
  },
  {
    id: '4',
    name: 'Emma Davis',
    position: 'Marketing Director',
    bio: 'Emma drives our marketing initiatives and brand strategy. She has a proven track record in digital marketing.',
    photo: null,
    displayOrder: 4,
    isActive: false,
  },
];

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    displayOrder: teamMembers.length + 1,
    isActive: true,
  });

  const handleAdd = () => {
    const newMember = {
      id: Date.now().toString(),
      ...formData,
      photo: null,
    };
    setTeamMembers([...teamMembers, newMember]);
    setFormData({
      name: '',
      position: '',
      bio: '',
      displayOrder: teamMembers.length + 2,
      isActive: true,
    });
    setIsAddDialogOpen(false);
    toast.success('Team member added successfully!');
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      displayOrder: member.displayOrder,
      isActive: member.isActive,
    });
  };

  const handleUpdate = () => {
    setTeamMembers(teamMembers.map(m => 
      m.id === editingMember.id ? { ...editingMember, ...formData } : m
    ));
    setEditingMember(null);
    toast.success('Team member updated successfully!');
  };

  const handleDelete = (id: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
    toast.success('Team member deleted successfully!');
  };

  const toggleActive = (id: string) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === id ? { ...m, isActive: !m.isActive } : m
    ));
    toast.success('Team member status updated!');
  };

  const moveUp = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    if (member && member.displayOrder > 1) {
      const updated = teamMembers.map(m => {
        if (m.id === id) return { ...m, displayOrder: m.displayOrder - 1 };
        if (m.displayOrder === member.displayOrder - 1) return { ...m, displayOrder: m.displayOrder + 1 };
        return m;
      });
      setTeamMembers(updated);
      toast.success('Order updated!');
    }
  };

  const moveDown = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    const maxOrder = Math.max(...teamMembers.map(m => m.displayOrder));
    if (member && member.displayOrder < maxOrder) {
      const updated = teamMembers.map(m => {
        if (m.id === id) return { ...m, displayOrder: m.displayOrder + 1 };
        if (m.displayOrder === member.displayOrder + 1) return { ...m, displayOrder: m.displayOrder - 1 };
        return m;
      });
      setTeamMembers(updated);
      toast.success('Order updated!');
    }
  };

  const sortedMembers = [...teamMembers].sort((a, b) => a.displayOrder - b.displayOrder);

  const TeamMemberForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter team member name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">Position/Title</Label>
        <Input
          id="position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          placeholder="Enter job title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Enter team member bio"
          rows={4}
        />
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
          onCheckedChange={(checked: boolean) => setFormData({ ...formData, isActive: checked })}
        />
      </div>

      <div className="space-y-2">
        <Label>Profile Photo</Label>
        <div className="flex items-center gap-4">
          <Input type="file" accept="image/*" className="hidden" id="photo-upload" />
          <Button
            variant="outline"
            onClick={() => document.getElementById('photo-upload')?.click()}
          >
            Upload Photo
          </Button>
          <span className="text-sm text-muted-foreground">
            Upload a profile photo (optional)
          </span>
        </div>
      </div>

      <Button 
        onClick={editingMember ? handleUpdate : handleAdd}
        className="w-full"
      >
        {editingMember ? 'Update' : 'Add'} Team Member
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Team Members</h2>
          <p className="text-muted-foreground">
            Manage your team member profiles and information
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Create a new team member profile
              </DialogDescription>
            </DialogHeader>
            <TeamMemberForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMembers.map((member) => (
          <Card key={member.id} className={!member.isActive ? 'opacity-60' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.photo || ''} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{member.name}</CardTitle>
                    <CardDescription>{member.position}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  #{member.displayOrder}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {member.bio}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant={member.isActive ? 'default' : 'secondary'}>
                  {member.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveUp(member.id)}
                    disabled={member.displayOrder === 1}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveDown(member.id)}
                    disabled={member.displayOrder === Math.max(...teamMembers.map(m => m.displayOrder))}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(member.id)}
                  >
                    <Switch checked={member.isActive} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
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
      <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update the team member details
            </DialogDescription>
          </DialogHeader>
          <TeamMemberForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}