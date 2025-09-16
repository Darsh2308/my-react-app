import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Plus, Edit, Trash2, Shield, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../App';

const mockUsers = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@example.com',
    role: 'super_admin',
    lastLogin: '2025-01-15 14:30',
    status: 'active',
    sitesAccess: ['all'],
  },
  {
    id: '2',
    name: 'Sarah Editor',
    email: 'sarah@example.com',
    role: 'admin',
    lastLogin: '2025-01-15 10:20',
    status: 'active',
    sitesAccess: ['main-site'],
  },
  {
    id: '3',
    name: 'Mike Content',
    email: 'mike@example.com',
    role: 'editor',
    lastLogin: '2025-01-14 16:45',
    status: 'active',
    sitesAccess: ['main-site'],
  },
  {
    id: '4',
    name: 'Emma Designer',
    email: 'emma@example.com',
    role: 'editor',
    lastLogin: '2025-01-10 09:15',
    status: 'inactive',
    sitesAccess: ['design-site'],
  },
];

const roleDescriptions = {
  super_admin: 'Full access to everything including user management and system settings',
  admin: 'Content management, form submissions, cannot manage users or sites',
  editor: 'Limited content editing, can view form submissions',
};

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'super_admin':
      return <Badge variant="destructive">Super Admin</Badge>;
    case 'admin':
      return <Badge variant="default">Admin</Badge>;
    case 'editor':
      return <Badge variant="secondary">Editor</Badge>;
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="default" className="bg-green-600">Active</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inactive</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState(mockUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor',
    status: 'active',
    sitesAccess: ['main-site'],
  });

  // Check if current user can manage users
  const canManageUsers = currentUser?.role === 'super_admin';

  if (!canManageUsers) {
    return (
      <div className="space-y-6">
        <div>
          <h1>User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3>Access Restricted</h3>
              <p className="text-muted-foreground">
                You don't have permission to manage users. Contact a Super Admin for access.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAdd = () => {
    const newUser = {
      id: Date.now().toString(),
      ...formData,
      lastLogin: 'Never',
    };
    setUsers([...users, newUser]);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'editor',
      status: 'active',
      sitesAccess: ['main-site'],
    });
    setIsAddDialogOpen(false);
    toast.success('User created successfully!');
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status,
      sitesAccess: user.sitesAccess,
    });
  };

  const handleUpdate = () => {
    setUsers(users.map(u => 
      u.id === editingUser.id ? { 
        ...editingUser, 
        ...formData,
        // Don't update password if it's empty
        ...(formData.password ? {} : { password: undefined })
      } : u
    ));
    setEditingUser(null);
    toast.success('User updated successfully!');
  };

  const handleDelete = (id: string) => {
    if (id === currentUser?.id) {
      toast.error('You cannot delete your own account!');
      return;
    }
    setUsers(users.filter(u => u.id !== id));
    toast.success('User deleted successfully!');
  };

  const toggleStatus = (id: string) => {
    if (id === currentUser?.id) {
      toast.error('You cannot deactivate your own account!');
      return;
    }
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
    toast.success('User status updated!');
  };

  const UserForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Password {editingUser && '(leave blank to keep current)'}
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder={editingUser ? 'Enter new password (optional)' : 'Enter password'}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="super_admin">Super Admin</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {roleDescriptions[formData.role as keyof typeof roleDescriptions]}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Sites Access</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="all-sites"
              checked={formData.sitesAccess.includes('all')}
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData({ ...formData, sitesAccess: ['all'] });
                } else {
                  setFormData({ ...formData, sitesAccess: ['main-site'] });
                }
              }}
            />
            <Label htmlFor="all-sites">All Sites</Label>
          </div>
          {!formData.sitesAccess.includes('all') && (
            <>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="main-site"
                  checked={formData.sitesAccess.includes('main-site')}
                  onChange={(e) => {
                    const newAccess = e.target.checked
                      ? [...formData.sitesAccess, 'main-site']
                      : formData.sitesAccess.filter(s => s !== 'main-site');
                    setFormData({ ...formData, sitesAccess: newAccess });
                  }}
                />
                <Label htmlFor="main-site">Main Site</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="blog-site"
                  checked={formData.sitesAccess.includes('blog-site')}
                  onChange={(e) => {
                    const newAccess = e.target.checked
                      ? [...formData.sitesAccess, 'blog-site']
                      : formData.sitesAccess.filter(s => s !== 'blog-site');
                    setFormData({ ...formData, sitesAccess: newAccess });
                  }}
                />
                <Label htmlFor="blog-site">Blog Site</Label>
              </div>
            </>
          )}
        </div>
      </div>

      <Button 
        onClick={editingUser ? handleUpdate : handleAdd}
        className="w-full"
      >
        {editingUser ? 'Update' : 'Create'} User
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with appropriate permissions
              </DialogDescription>
            </DialogHeader>
            <UserForm />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts and their access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          {user.id === currentUser?.id && (
                            <div className="text-xs text-muted-foreground">(You)</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <div className="px-2">
                          <Switch 
                            checked={user.status === 'active'} 
                            onCheckedChange={() => toggleStatus(user.id)}
                            disabled={user.id === currentUser?.id}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          disabled={user.id === currentUser?.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details and permissions
            </DialogDescription>
          </DialogHeader>
          <UserForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}