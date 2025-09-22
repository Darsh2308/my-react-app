import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Edit, Eye, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Create a forwardRef wrapper for Link to fix ref forwarding issues
const ForwardedLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>((props, ref) => (
  <Link {...props} ref={ref} />
));

const initialPages = [
  {
    id: 'homepage',
    name: 'Homepage',
    lastModified: '2025-01-15 14:30',
    status: 'published',
    url: '/',
  },
  {
    id: 'about',
    name: 'About Us',
    lastModified: '2025-01-14 10:15',
    status: 'published',
    url: '/about',
  },
  {
    id: 'services',
    name: 'Services',
    lastModified: '2025-01-13 16:45',
    status: 'published',
    url: '/services',
  },
  {
    id: 'contact',
    name: 'Contact Us',
    lastModified: '2025-01-12 09:20',
    status: 'published',
    url: '/contact',
  },
  {
    id: 'privacy',
    name: 'Privacy Policy',
    lastModified: '2025-01-10 11:30',
    status: 'published',
    url: '/privacy',
  },
  {
    id: 'terms',
    name: 'Terms & Conditions',
    lastModified: '2025-01-08 14:00',
    status: 'draft',
    url: '/terms',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'published':
      return <Badge variant="default" className="bg-green-600">Published</Badge>;
    case 'draft':
      return <Badge variant="secondary">Draft</Badge>;
    case 'archived':
      return <Badge variant="outline">Archived</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function PagesManagement() {
  const [pages, setPages] = useState(initialPages);

  const handleStatusChange = (id: string, newStatus: string) => {
    setPages(pages.map(page => 
      page.id === id ? { 
        ...page, 
        status: newStatus,
        lastModified: new Date().toISOString().slice(0, 16).replace('T', ' ')
      } : page
    ));
    toast.success(`Page status updated to ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    const page = pages.find(p => p.id === id);
    if (page?.id === 'homepage') {
      toast.error('Cannot delete the homepage');
      return;
    }
    setPages(pages.filter(page => page.id !== id));
    toast.success('Page deleted successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Pages</h1>
          <p className="text-muted-foreground">
            Manage your website pages and content
          </p>
        </div>
        <Button asChild>
          <ForwardedLink to="/pages/add">
            <Plus className="mr-2 h-4 w-4" />
            Add New Page
          </ForwardedLink>
        </Button>
      </div>

      {/* Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Name</TableHead>
                  <TableHead className="hidden md:table-cell">URL</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>{page.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {page.url}
                    </TableCell>
                    <TableCell>{page.lastModified}</TableCell>
                    <TableCell>
                      <Select
                        value={page.status}
                        onValueChange={(value) => handleStatusChange(page.id, value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue>
                            {getStatusBadge(page.status)}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">
                            <Badge variant="default" className="bg-green-600">Published</Badge>
                          </SelectItem>
                          <SelectItem value="draft">
                            <Badge variant="secondary">Draft</Badge>
                          </SelectItem>
                          <SelectItem value="archived">
                            <Badge variant="outline">Archived</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="sm">
                          <ForwardedLink to={`/pages/edit/${page.id}`}>
                            <Edit className="h-4 w-4" />
                          </ForwardedLink>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(page.id)}
                          disabled={page.id === 'homepage'}
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
    </div>
  );
}