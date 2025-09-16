import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronDown, Save, Eye, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function PageEditor() {
  const { id } = useParams();
  const isHomepage = id === 'homepage' || location.pathname.includes('homepage');
  
  const [pageData, setPageData] = useState({
    title: isHomepage ? 'Homepage' : 'About Us',
    content: `<h2>Welcome to Our Website</h2>
<p>This is sample content for the page. You can edit this content using the rich text editor.</p>
<p>Add your own content here to customize this page for your website.</p>`,
    metaTitle: isHomepage ? 'Welcome to Our Company' : 'About Us - Our Company',
    metaDescription: 'Welcome to our company website. Learn more about our services and how we can help you.',
    isPublished: true,
    featuredImage: null as File | null,
  });

  const [seoExpanded, setSeoExpanded] = useState(false);

  const handleSave = () => {
    toast.success('Page saved successfully!');
  };

  const handlePreview = () => {
    toast.info('Opening preview in new window...');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPageData({ ...pageData, featuredImage: file });
      toast.success('Image uploaded successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Edit {isHomepage ? 'Homepage' : 'Page'}</h1>
          <p className="text-muted-foreground">
            {isHomepage ? 'Customize your homepage sections' : 'Edit page content and settings'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={pageData.title}
                  onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={pageData.content}
                  onChange={(e) => setPageData({ ...pageData, content: e.target.value })}
                  className="min-h-[300px]"
                  placeholder="Enter your page content here..."
                />
                <p className="text-sm text-muted-foreground">
                  Rich text editor functionality would be implemented here
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-image">Featured Image</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="featured-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('featured-image')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  {pageData.featuredImage && (
                    <span className="text-sm text-muted-foreground">
                      {pageData.featuredImage.name}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Homepage Specific Sections */}
          {isHomepage && (
            <Card>
              <CardHeader>
                <CardTitle>Homepage Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hero Section */}
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg">
                    <h3>Hero Section</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Main Headline</Label>
                      <Input placeholder="Welcome to Our Company" />
                    </div>
                    <div className="space-y-2">
                      <Label>Subheadline</Label>
                      <Input placeholder="We provide excellent services..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Call-to-Action Button Text</Label>
                      <Input placeholder="Get Started" />
                    </div>
                    <div className="space-y-2">
                      <Label>Background Image</Label>
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Background
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Services Section */}
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg">
                    <h3>Services Section</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input placeholder="Our Services" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="We offer a wide range of services..." />
                    </div>
                    <Button variant="outline">Add/Remove Service Blocks</Button>
                  </CollapsibleContent>
                </Collapsible>

                {/* About Section */}
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg">
                    <h3>About Section</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Company Description</Label>
                      <Textarea placeholder="About our company..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Image</Label>
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Published</Label>
                <Switch
                  id="published"
                  checked={pageData.isPublished}
                  onCheckedChange={(checked: boolean) =>
                    setPageData({ ...pageData, isPublished: checked })
                  }
                />
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                Last saved: Today at 2:30 PM
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Collapsible open={seoExpanded} onOpenChange={setSeoExpanded}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    SEO Options
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input
                      id="meta-title"
                      value={pageData.metaTitle}
                      onChange={(e) =>
                        setPageData({ ...pageData, metaTitle: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={pageData.metaDescription}
                      onChange={(e) =>
                        setPageData({ ...pageData, metaDescription: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}