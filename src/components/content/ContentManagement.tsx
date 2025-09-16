import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TestimonialsManagement from './TestimonialsManagement';
import BlogManagement from './BlogManagement';
import TeamManagement from './TeamManagement';
import ServicesManagement from './ServicesManagement';

export default function ContentManagement() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1>Content Blocks</h1>
        <p className="text-muted-foreground">
          Manage testimonials, blog posts, team members, and services
        </p>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="testimonials" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="blog">Blog/News</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="testimonials" className="mt-6">
          <TestimonialsManagement />
        </TabsContent>
        
        <TabsContent value="blog" className="mt-6">
          <BlogManagement />
        </TabsContent>
        
        <TabsContent value="team" className="mt-6">
          <TeamManagement />
        </TabsContent>
        
        <TabsContent value="services" className="mt-6">
          <ServicesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}