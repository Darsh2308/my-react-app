import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '../ui/sidebar';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Grid3x3,
  Users,
  Globe,
  Settings,
  Building2,
} from 'lucide-react';

// Create a forwardRef wrapper for Link to fix ref forwarding issues
const ForwardedLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>((props, ref) => (
  <Link {...props} ref={ref} />
));

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    url: '/dashboard',
  },
  {
    title: 'Pages',
    icon: FileText,
    url: '/pages',
  },
  {
    title: 'Forms & Leads',
    icon: Inbox,
    url: '/forms',
  },
  {
    title: 'Content Blocks',
    icon: Grid3x3,
    url: '/content',
  },
  {
    title: 'Users',
    icon: Users,
    url: '/users',
  },
  {
    title: 'Sites',
    icon: Globe,
    url: '/sites',
  },
  {
    title: 'Settings',
    icon: Settings,
    url: '/settings',
  },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Building2 className="h-6 w-6" />
          <span className="font-semibold">CMS Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url || 
                           (item.url !== '/dashboard' && location.pathname.startsWith(item.url));
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <ForwardedLink to={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </ForwardedLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 text-xs text-muted-foreground">
          CMS v1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}