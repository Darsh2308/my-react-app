import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Edit, Eye, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Create a forwardRef wrapper for Link to fix ref forwarding issues
const ForwardedLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>((props, ref) => (
  <Link {...props} ref={ref} />
));

const mockPages = [
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
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function PagesManagement() {
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
                {mockPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>{page.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {page.url}
                    </TableCell>
                    <TableCell>{page.lastModified}</TableCell>
                    <TableCell>{getStatusBadge(page.status)}</TableCell>
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
                        <Button variant="ghost" size="sm">
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