import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Eye, Download, Search, Filter, Trash2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const mockSubmissions = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    formType: 'Contact',
    message: 'I am interested in your services and would like to schedule a consultation.',
    datetime: '2025-01-15 14:30',
    status: 'new',
    source: 'Contact Page',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    phone: '+1 (555) 987-6543',
    formType: 'Quote Request',
    message: 'Please provide a quote for your premium package.',
    datetime: '2025-01-15 13:15',
    status: 'read',
    source: 'Services Page',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    phone: '+1 (555) 456-7890',
    formType: 'Newsletter',
    message: 'Subscribe to newsletter',
    datetime: '2025-01-15 11:45',
    status: 'converted',
    source: 'Homepage',
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma@startup.io',
    phone: '+1 (555) 234-5678',
    formType: 'Contact',
    message: 'Looking for partnership opportunities.',
    datetime: '2025-01-15 10:20',
    status: 'new',
    source: 'About Page',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'dbrown@corp.com',
    phone: '+1 (555) 345-6789',
    formType: 'Quote Request',
    message: 'Need pricing information for enterprise solution.',
    datetime: '2025-01-15 09:30',
    status: 'read',
    source: 'Contact Page',
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

export default function FormsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [submissions, setSubmissions] = useState(mockSubmissions);

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    ));
    toast.success(`Submission marked as ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    setSubmissions(submissions.filter(sub => sub.id !== id));
    toast.success('Submission deleted');
  };

  const handleExport = () => {
    toast.success('Export started. You will receive an email when ready.');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Form Submissions</h1>
          <p className="text-muted-foreground">
            Manage and track all form submissions from your website
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Submissions</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
          <CardDescription>
            {statusFilter === 'all' 
              ? 'All form submissions' 
              : `Submissions with status: ${statusFilter}`}
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
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(submission.id, 
                            submission.status === 'new' ? 'read' : 'converted')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(submission.id)}
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

      {/* Submission Details Modal */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              {selectedSubmission && `Submitted on ${selectedSubmission.datetime}`}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p>{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p>{selectedSubmission.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p>{selectedSubmission.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Form Type</label>
                  <p>{selectedSubmission.formType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Source</label>
                  <p>{selectedSubmission.source}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div>{getStatusBadge(selectedSubmission.status)}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <p className="mt-1 p-3 bg-muted rounded-lg">
                  {selectedSubmission.message}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleStatusChange(selectedSubmission.id, 'read')}
                  disabled={selectedSubmission.status === 'read'}
                >
                  Mark as Read
                </Button>
                <Button
                  onClick={() => handleStatusChange(selectedSubmission.id, 'converted')}
                  disabled={selectedSubmission.status === 'converted'}
                >
                  Mark as Converted
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(selectedSubmission.id);
                    setSelectedSubmission(null);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}