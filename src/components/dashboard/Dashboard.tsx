import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import StatsCards from './StatsCards';
import QuickFilters from './QuickFilters';
import RecentSubmissions from './RecentSubmissions';
import DashboardCharts from './DashboardCharts';
import QuickActions from './QuickActions';

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('today');
  const [formFilter, setFormFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your website.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Quick Filters */}
      <QuickFilters
        timeFilter={timeFilter}
        formFilter={formFilter}
        statusFilter={statusFilter}
        onTimeFilterChange={setTimeFilter}
        onFormFilterChange={setFormFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Recent Submissions */}
          <RecentSubmissions />

          {/* Charts */}
          <DashboardCharts />
        </div>

        {/* Quick Actions Sidebar */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}