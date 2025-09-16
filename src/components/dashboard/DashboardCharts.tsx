import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const submissionsData = [
  { date: 'Jan 1', submissions: 12 },
  { date: 'Jan 2', submissions: 19 },
  { date: 'Jan 3', submissions: 8 },
  { date: 'Jan 4', submissions: 15 },
  { date: 'Jan 5', submissions: 22 },
  { date: 'Jan 6', submissions: 18 },
  { date: 'Jan 7', submissions: 25 },
  { date: 'Jan 8', submissions: 30 },
  { date: 'Jan 9', submissions: 28 },
  { date: 'Jan 10', submissions: 35 },
  { date: 'Jan 11', submissions: 32 },
  { date: 'Jan 12', submissions: 40 },
  { date: 'Jan 13', submissions: 38 },
  { date: 'Jan 14', submissions: 45 },
  { date: 'Jan 15', submissions: 42 },
];

const formSourcesData = [
  { name: 'Contact Form', value: 45, color: '#0ea5e9' },
  { name: 'Quote Request', value: 30, color: '#10b981' },
  { name: 'Newsletter', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 10, color: '#ef4444' },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Submissions Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions Over Time</CardTitle>
          <CardDescription>
            Daily submissions for the last 15 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={submissionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="submissions" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ fill: '#0ea5e9', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Form Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Form Sources</CardTitle>
          <CardDescription>
            Distribution of submissions by form type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={formSourcesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props) => {
                  const { name, percent } = props as { name?: string; percent?: number };
                  if (name && typeof percent === 'number') {
                    return `${name} ${(percent * 100).toFixed(0)}%`;
                  }
                  return '';
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {formSourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {formSourcesData.map((source, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm">{source.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">
                  {source.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}