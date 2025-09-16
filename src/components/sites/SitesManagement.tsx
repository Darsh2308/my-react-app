import React, { useState } from 'react';
import { Plus, Globe, Settings, Trash2, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

interface Site {
  id: string;
  name: string;
  domain: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: string;
  lastModified: string;
  pages: number;
  visits: number;
  leads: number;
  isDefault: boolean;
}

const mockSites: Site[] = [
  {
    id: '1',
    name: 'Corporate Website',
    domain: 'mycompany.com',
    description: 'Main corporate website with company information and services',
    status: 'active',
    createdAt: '2024-01-15',
    lastModified: '2024-09-10',
    pages: 12,
    visits: 5420,
    leads: 89,
    isDefault: true,
  },
  {
    id: '2',
    name: 'Product Landing',
    domain: 'product.mycompany.com',
    description: 'Dedicated landing page for our flagship product',
    status: 'active',
    createdAt: '2024-03-20',
    lastModified: '2024-09-12',
    pages: 6,
    visits: 2180,
    leads: 45,
    isDefault: false,
  },
  {
    id: '3',
    name: 'Events Portal',
    domain: 'events.mycompany.com',
    description: 'Event registration and information portal',
    status: 'maintenance',
    createdAt: '2024-06-10',
    lastModified: '2024-08-15',
    pages: 8,
    visits: 890,
    leads: 23,
    isDefault: false,
  },
];

export default function SitesManagement() {
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newSite, setNewSite] = useState<{
    name: string;
    domain: string;
    description: string;
    status: Site['status'];
  }>({
    name: '',
    domain: '',
    description: '',
    status: 'active',
  });
  const [configForm, setConfigForm] = useState({
    name: '',
    domain: '',
    description: '',
    customDomain: '',
    seoTitle: '',
    seoDescription: '',
    analyticsId: '',
    faviconUrl: '',
  });

  const handleAddSite = () => {
    if (!newSite.name || !newSite.domain) {
      toast.error('Please fill in all required fields');
      return;
    }

    const site: Site = {
      id: Date.now().toString(),
      ...newSite,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      pages: 0,
      visits: 0,
      leads: 0,
      isDefault: false,
    };

    setSites([...sites, site]);
    setNewSite({ name: '', domain: '', description: '', status: 'active' });
    setIsAddDialogOpen(false);
    toast.success('Site created successfully');
  };

  const handleDeleteSite = (id: string) => {
    const site = sites.find(s => s.id === id);
    if (site?.isDefault) {
      toast.error('Cannot delete the default site');
      return;
    }
    setSites(sites.filter(s => s.id !== id));
    toast.success('Site deleted successfully');
  };

  const handleSetDefault = (id: string) => {
    setSites(sites.map(site => ({
      ...site,
      isDefault: site.id === id
    })));
    toast.success('Default site updated');
  };

  const handleStatusChange = (id: string, status: Site['status']) => {
    setSites(sites.map(site => 
      site.id === id ? { ...site, status, lastModified: new Date().toISOString().split('T')[0] } : site
    ));
    toast.success('Site status updated');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Copied to clipboard');
  };

  const handleOpenConfigure = (site: Site) => {
    setSelectedSite(site);
    setConfigForm({
      name: site.name,
      domain: site.domain,
      description: site.description,
      customDomain: site.domain !== `${site.name.toLowerCase().replace(/\s+/g, '')}.com` ? site.domain : '',
      seoTitle: `${site.name} - Official Website`,
      seoDescription: site.description,
      analyticsId: 'GA-XXXXXXXXX-X',
      faviconUrl: '',
    });
    setIsConfigureDialogOpen(true);
  };

  const handleSaveConfiguration = () => {
    if (!selectedSite) return;
    
    setSites(sites.map(site => 
      site.id === selectedSite.id 
        ? { 
            ...site, 
            name: configForm.name,
            domain: configForm.domain,
            description: configForm.description,
            lastModified: new Date().toISOString().split('T')[0]
          }
        : site
    ));
    
    setIsConfigureDialogOpen(false);
    setSelectedSite(null);
    toast.success('Site configuration updated successfully');
  };

  const handleVisitSite = (domain: string) => {
    const url = domain.startsWith('http') ? domain : `https://${domain}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success('Opening site in new tab');
  };

  const getStatusColor = (status: Site['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Sites Management</h1>
          <p className="text-muted-foreground">
            Manage your websites and domains
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Site
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Site</DialogTitle>
              <DialogDescription>
                Create a new website to manage with this CMS.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Site Name *</Label>
                <Input
                  id="name"
                  value={newSite.name}
                  onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                  placeholder="My Awesome Website"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="domain">Domain *</Label>
                <Input
                  id="domain"
                  value={newSite.domain}
                  onChange={(e) => setNewSite({ ...newSite, domain: e.target.value })}
                  placeholder="example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSite.description}
                  onChange={(e) => setNewSite({ ...newSite, description: e.target.value })}
                  placeholder="Brief description of the website"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Initial Status</Label>
                <Select value={newSite.status} onValueChange={(value: Site['status']) => setNewSite({ ...newSite, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSite}>Create Site</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Site Configuration Dialog */}
      <Dialog open={isConfigureDialogOpen} onOpenChange={setIsConfigureDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure Site: {selectedSite?.name}</DialogTitle>
            <DialogDescription>
              Manage your website settings, SEO, and advanced configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Basic Information</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="config-name">Site Name</Label>
                  <Input
                    id="config-name"
                    value={configForm.name}
                    onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="config-domain">Primary Domain</Label>
                  <Input
                    id="config-domain"
                    value={configForm.domain}
                    onChange={(e) => setConfigForm({ ...configForm, domain: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="config-description">Description</Label>
                <Textarea
                  id="config-description"
                  value={configForm.description}
                  onChange={(e) => setConfigForm({ ...configForm, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="config-custom-domain">Custom Domain (Optional)</Label>
                <Input
                  id="config-custom-domain"
                  value={configForm.customDomain}
                  onChange={(e) => setConfigForm({ ...configForm, customDomain: e.target.value })}
                  placeholder="www.example.com"
                />
              </div>
            </div>

            <Separator />

            {/* SEO Settings */}
            <div className="space-y-4">
              <h4 className="font-medium">SEO Settings</h4>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="config-seo-title">SEO Title</Label>
                  <Input
                    id="config-seo-title"
                    value={configForm.seoTitle}
                    onChange={(e) => setConfigForm({ ...configForm, seoTitle: e.target.value })}
                    placeholder="Your Site Title - Description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="config-seo-description">Meta Description</Label>
                  <Textarea
                    id="config-seo-description"
                    value={configForm.seoDescription}
                    onChange={(e) => setConfigForm({ ...configForm, seoDescription: e.target.value })}
                    placeholder="Brief description for search engines"
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="config-favicon">Favicon URL</Label>
                  <Input
                    id="config-favicon"
                    value={configForm.faviconUrl}
                    onChange={(e) => setConfigForm({ ...configForm, faviconUrl: e.target.value })}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Analytics */}
            <div className="space-y-4">
              <h4 className="font-medium">Analytics & Tracking</h4>
              <div className="grid gap-2">
                <Label htmlFor="config-analytics">Google Analytics ID</Label>
                <Input
                  id="config-analytics"
                  value={configForm.analyticsId}
                  onChange={(e) => setConfigForm({ ...configForm, analyticsId: e.target.value })}
                  placeholder="GA-XXXXXXXXX-X"
                />
              </div>
            </div>

            {/* Site Stats Preview */}
            <div className="rounded-lg border p-4 bg-muted/50">
              <h4 className="font-medium mb-3">Current Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{selectedSite?.pages || 0}</div>
                  <div className="text-sm text-muted-foreground">Pages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{selectedSite?.visits.toLocaleString() || 0}</div>
                  <div className="text-sm text-muted-foreground">Total Visits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{selectedSite?.leads || 0}</div>
                  <div className="text-sm text-muted-foreground">Leads Generated</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsConfigureDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConfiguration}>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <Card key={site.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  {site.isDefault && (
                    <Badge variant="secondary" className="text-xs">
                      Default
                    </Badge>
                  )}
                </div>
                <Badge className={getStatusColor(site.status)}>
                  {site.status}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {site.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Domain:</span>
                <span className="text-sm font-mono">{site.domain}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard(site.domain, site.id)}
                >
                  {copiedId === site.id ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-medium">{site.pages}</div>
                  <div className="text-xs text-muted-foreground">Pages</div>
                </div>
                <div>
                  <div className="text-sm font-medium">{site.visits.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Visits</div>
                </div>
                <div>
                  <div className="text-sm font-medium">{site.leads}</div>
                  <div className="text-xs text-muted-foreground">Leads</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`status-${site.id}`} className="text-sm">
                    Status
                  </Label>
                  <Select
                    value={site.status}
                    onValueChange={(value: Site['status']) => handleStatusChange(site.id, value)}
                  >
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor={`default-${site.id}`} className="text-sm">
                    Default Site
                  </Label>
                  <Switch
                    id={`default-${site.id}`}
                    checked={site.isDefault}
                    onCheckedChange={() => handleSetDefault(site.id)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1" 
                  onClick={() => handleOpenConfigure(site)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleVisitSite(site.domain)}
                  title="Visit site"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                {!site.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSite(site.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                Created: {new Date(site.createdAt).toLocaleDateString()}
                <br />
                Modified: {new Date(site.lastModified).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sites.length === 0 && (
        <div className="text-center py-12">
          <Globe className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No sites found</h3>
          <p className="mt-2 text-muted-foreground">
            Get started by creating your first website.
          </p>
          <div className="mt-6">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Site
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}