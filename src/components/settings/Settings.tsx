import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Upload, Save, TestTube, Mail, Globe, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'CMS Dashboard',
    adminEmail: 'admin@example.com',
    companyLogo: null as File | null,
    timeZone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'your-email@gmail.com',
    smtpPassword: '',
    useSSL: true,
    notificationEmail: 'admin@example.com',
    emailFromName: 'CMS Dashboard',
  });

  const [securitySettings, setSecuritySettings] = useState({
    requireTwoFactor: false,
    sessionTimeout: '60',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    requirePasswordComplexity: true,
  });

  const handleGeneralSave = () => {
    toast.success('General settings saved successfully!');
  };

  const handleEmailSave = () => {
    toast.success('Email settings saved successfully!');
  };

  const handleSecuritySave = () => {
    toast.success('Security settings saved successfully!');
  };

  const handleTestEmail = () => {
    toast.info('Sending test email...');
    setTimeout(() => {
      toast.success('Test email sent successfully!');
    }, 2000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGeneralSettings({ ...generalSettings, companyLogo: file });
      toast.success('Logo uploaded successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground">
          Configure system settings and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Settings
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic site configuration and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  placeholder="Enter site name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={generalSettings.adminEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })}
                  placeholder="Enter admin email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyLogo">Company Logo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('companyLogo')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                  {generalSettings.companyLogo && (
                    <span className="text-sm text-muted-foreground">
                      {generalSettings.companyLogo.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <Select 
                    value={generalSettings.timeZone} 
                    onValueChange={(value: string) => setGeneralSettings({ ...generalSettings, timeZone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select 
                    value={generalSettings.dateFormat} 
                    onValueChange={(value:string) => setGeneralSettings({ ...generalSettings, dateFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGeneralSave}>
                <Save className="mr-2 h-4 w-4" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure SMTP settings and email templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpUsername">SMTP Username</Label>
                <Input
                  id="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                  placeholder="your-email@gmail.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                  placeholder="Enter SMTP password"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="useSSL">Use SSL/TLS</Label>
                <Switch
                  id="useSSL"
                  checked={emailSettings.useSSL}
                  onCheckedChange={(checked: boolean) => setEmailSettings({ ...emailSettings, useSSL: checked })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="emailFromName">Email From Name</Label>
                <Input
                  id="emailFromName"
                  value={emailSettings.emailFromName}
                  onChange={(e) => setEmailSettings({ ...emailSettings, emailFromName: e.target.value })}
                  placeholder="CMS Dashboard"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationEmail">Notification Email</Label>
                <Input
                  id="notificationEmail"
                  type="email"
                  value={emailSettings.notificationEmail}
                  onChange={(e) => setEmailSettings({ ...emailSettings, notificationEmail: e.target.value })}
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Form Notification Template</Label>
                <Textarea
                  placeholder="Email template for form notifications..."
                  rows={6}
                  value="Subject: New Form Submission

Hello,

You have received a new form submission:

Name: {name}
Email: {email}
Message: {message}

Best regards,
CMS Dashboard"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleEmailSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Email Settings
                </Button>
                <Button variant="outline" onClick={handleTestEmail}>
                  <TestTube className="mr-2 h-4 w-4" />
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security policies and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requireTwoFactor">Require Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Force all users to enable 2FA for enhanced security
                  </p>
                </div>
                <Switch
                  id="requireTwoFactor"
                  checked={securitySettings.requireTwoFactor}
                  onCheckedChange={(checked: boolean) => setSecuritySettings({ ...securitySettings, requireTwoFactor: checked })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                    placeholder="60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: e.target.value })}
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                <Input
                  id="passwordMinLength"
                  type="number"
                  value={securitySettings.passwordMinLength}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: e.target.value })}
                  placeholder="8"
                  min="6"
                  max="20"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requirePasswordComplexity">Require Password Complexity</Label>
                  <p className="text-sm text-muted-foreground">
                    Passwords must contain uppercase, lowercase, numbers, and symbols
                  </p>
                </div>
                <Switch
                  id="requirePasswordComplexity"
                  checked={securitySettings.requirePasswordComplexity}
                  onCheckedChange={(checked:boolean) => setSecuritySettings({ ...securitySettings, requirePasswordComplexity: checked })}
                />
              </div>


              <Separator />

              <div className="space-y-4">
                <h4>Security Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">SSL Certificate</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">Active and valid</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Firewall Status</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">Active protection</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Last Security Scan</span>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleSecuritySave}>
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}