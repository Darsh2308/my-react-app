import React from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Download } from 'lucide-react';

interface QuickFiltersProps {
  timeFilter: string;
  formFilter: string;
  statusFilter: string;
  onTimeFilterChange: (value: string) => void;
  onFormFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

export default function QuickFilters({
  timeFilter,
  formFilter,
  statusFilter,
  onTimeFilterChange,
  onFormFilterChange,
  onStatusFilterChange,
}: QuickFiltersProps) {
  const timeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const formOptions = [
    { value: 'all', label: 'All Forms' },
    { value: 'contact', label: 'Contact' },
    { value: 'quote', label: 'Quote Request' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'other', label: 'Other' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'converted', label: 'Converted' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-lg">
      {/* Time Period Buttons */}
      <div className="flex flex-wrap gap-2">
        {timeOptions.slice(0, 4).map((option) => (
          <Button
            key={option.value}
            variant={timeFilter === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTimeFilterChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Form Type Filter */}
      <Select value={formFilter} onValueChange={onFormFilterChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Form Type" />
        </SelectTrigger>
        <SelectContent>
          {formOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Export Button */}
      <Button variant="outline" size="sm" className="ml-auto">
        <Download className="mr-2 h-4 w-4" />
        Export Filtered Data
      </Button>
    </div>
  );
}