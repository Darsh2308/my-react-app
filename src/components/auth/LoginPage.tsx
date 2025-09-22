import React from 'react';
import { Navigate } from 'react-router-dom';
import { SignIn, useUser } from '@clerk/clerk-react';

export default function LoginPage() {
  const { user, isLoaded } = useUser();

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
              card: 'shadow-lg',
              headerTitle: 'text-2xl font-bold',
              headerSubtitle: 'text-muted-foreground',
              socialButtonsBlockButton: 'border border-input hover:bg-accent hover:text-accent-foreground',
              formFieldInput: 'border border-input bg-background',
              footerActionLink: 'text-primary hover:text-primary/80',
              footerActionText: 'display: none',
              footerAction: 'display: none',
            }
          }}
          routing="hash"
          redirectUrl="/dashboard"
          signUpUrl={undefined}
          signUpFallbackRedirectUrl={undefined}
          signUpForceRedirectUrl={undefined}
        />
      </div>
    </div>
  );
}