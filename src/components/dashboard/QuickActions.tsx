import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Edit, 
  Plus, 
  MessageSquare, 
  Eye, 
  Download, 
  Settings, 
  Users, 
  Shield, 
  Calendar 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Create a forwardRef wrapper for Link to fix ref forwarding issues
const ForwardedLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>((props, ref) => (
  <Link {...props} ref={ref} />
));

export default function QuickActions() {
  return (
    <div className="space-y-6">
      {/* Content Management */}
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild variant="outline" className="w-full justify-start">
            <ForwardedLink to="/pages/homepage">
              <Edit className="mr-2 h-4 w-4" />
              Edit Homepage
              <span className="ml-auto text-xs text-muted-foreground">
                2h ago
              </span>
            </ForwardedLink>
          </Button>
          
          <Button asChild variant="outline" className="w-full justify-start">
            <ForwardedLink to="/content/blog">
              <Plus className="mr-2 h-4 w-4" />
              Add New Blog Post
            </ForwardedLink>
          </Button>
          
          <Button asChild variant="outline" className="w-full justify-start">
            <ForwardedLink to="/content/testimonials">
              <MessageSquare className="mr-2 h-4 w-4" />
              Manage Testimonials
            </ForwardedLink>
          </Button>
        </CardContent>
      </Card>

      {/* Lead Management */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild variant="outline" className="w-full justify-start">
            <ForwardedLink to="/forms">
              <Eye className="mr-2 h-4 w-4" />
              View Unread Leads
              <Badge variant="destructive" className="ml-auto">
                5
              </Badge>
            </ForwardedLink>
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Download className="mr-2 h-4 w-4" />
            Export This Month's Data
          </Button>
          
          <Button asChild variant="outline" className="w-full justify-start">
            <ForwardedLink to="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Contact Form Settings
            </ForwardedLink>
          </Button>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">Active Users Online</span>
            </div>
            <Badge variant="secondary">3</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">System Health</span>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Latest Backup</span>
            </div>
            <span className="text-xs text-muted-foreground">
              2h ago
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}