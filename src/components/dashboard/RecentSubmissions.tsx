import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Eye, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Create a forwardRef wrapper for Link to fix ref forwarding issues
const ForwardedLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>((props, ref) => (
  <Link {...props} ref={ref} />
));

const mockSubmissions = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    formType: 'Contact',
    datetime: '2025-01-15 14:30',
    status: 'new',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    phone: '+1 (555) 987-6543',
    formType: 'Quote Request',
    datetime: '2025-01-15 13:15',
    status: 'read',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    phone: '+1 (555) 456-7890',
    formType: 'Newsletter',
    datetime: '2025-01-15 11:45',
    status: 'converted',
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma@startup.io',
    phone: '+1 (555) 234-5678',
    formType: 'Contact',
    datetime: '2025-01-15 10:20',
    status: 'new',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'dbrown@corp.com',
    phone: '+1 (555) 345-6789',
    formType: 'Quote Request',
    datetime: '2025-01-15 09:30',
    status: 'read',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return <Badge variant="destructive">New</Badge>;
    case 'read':
      return <Badge variant="secondary">Read</Badge>;
    case 'converted':
      return <Badge variant="default" className="bg-green-600">Converted</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function RecentSubmissions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
        <CardDescription>
          Latest form submissions based on your current filters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>Form Type</TableHead>
                <TableHead className="hidden lg:table-cell">Date/Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {submission.phone}
                  </TableCell>
                  <TableCell>{submission.formType}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {submission.datetime}
                  </TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center mt-4">
          <Button asChild variant="outline">
            <ForwardedLink to="/forms">View All Submissions</ForwardedLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}