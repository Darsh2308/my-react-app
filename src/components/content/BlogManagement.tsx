import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const mockPosts = [
  {
    id: '1',
    title: 'How to Improve Your Business Operations',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    excerpt: 'Learn the best practices for streamlining your business operations and increasing efficiency.',
    featuredImage: null,
    publishDate: '2025-01-15',
    status: 'published',
    metaTitle: 'Improve Business Operations - Tips & Strategies',
    metaDescription: 'Discover proven strategies to improve your business operations and boost productivity.',
  },
  {
    id: '2',
    title: 'The Future of Digital Marketing',
    content: 'Digital marketing continues to evolve rapidly. Here are the trends to watch in 2025...',
    excerpt: 'Explore the latest trends and technologies shaping the future of digital marketing.',
    featuredImage: null,
    publishDate: '2025-01-12',
    status: 'published',
    metaTitle: 'Future of Digital Marketing 2025',
    metaDescription: 'Stay ahead with the latest digital marketing trends and predictions for 2025.',
  },
  {
    id: '3',
    title: 'Customer Service Excellence',
    content: 'Draft content about providing exceptional customer service...',
    excerpt: 'Tips for delivering outstanding customer service that builds loyalty.',
    featuredImage: null,
    publishDate: '2025-01-20',
    status: 'draft',
    metaTitle: 'Customer Service Excellence Guide',
    metaDescription: 'Master the art of customer service with these proven strategies.',
  },
];

export default function BlogManagement() {
  const [posts, setPosts] = useState(mockPosts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    publishDate: new Date().toISOString().split('T')[0],
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
  });

  const handleAdd = () => {
    const newPost = {
      id: Date.now().toString(),
      ...formData,
      featuredImage: null,
    };
    setPosts([...posts, newPost]);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      publishDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      metaTitle: '',
      metaDescription: '',
    });
    setIsAddDialogOpen(false);
    toast.success('Blog post created successfully!');
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      publishDate: post.publishDate,
      status: post.status,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
    });
  };

  const handleUpdate = () => {
    setPosts(posts.map(p => 
      p.id === editingPost.id ? { ...editingPost, ...formData } : p
    ));
    setEditingPost(null);
    toast.success('Blog post updated successfully!');
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    toast.success('Blog post deleted successfully!');
  };

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

  const BlogForm = () => (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter post title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Brief description of the post"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Write your blog post content here"
          rows={8}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="publishDate">Publish Date</Label>
          <Input
            id="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value: string) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaTitle">Meta Title (SEO)</Label>
        <Input
          id="metaTitle"
          value={formData.metaTitle}
          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
          placeholder="SEO title for search engines"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
        <Textarea
          id="metaDescription"
          value={formData.metaDescription}
          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          placeholder="SEO description for search engines"
          rows={2}
        />
      </div>

      <Button 
        onClick={editingPost ? handleUpdate : handleAdd}
        className="w-full"
      >
        {editingPost ? 'Update' : 'Create'} Blog Post
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Blog & News</h2>
          <p className="text-muted-foreground">
            Manage your blog posts and news articles
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
                Write and publish a new blog post or news article
              </DialogDescription>
            </DialogHeader>
            <BlogForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {post.excerpt}
                  </CardDescription>
                </div>
                {getStatusBadge(post.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishDate).toLocaleDateString()}
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.content}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update the blog post details
            </DialogDescription>
          </DialogHeader>
          <BlogForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}