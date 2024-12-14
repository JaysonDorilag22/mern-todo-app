import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ErrorMessage = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Alert variant="destructive" className="mb-6 max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An unexpected error occurred. We apologize for the inconvenience.
        </AlertDescription>
      </Alert>
      <div className="flex space-x-4">
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
        <Button onClick={() => window.location.href = '/home'}>
          Go to Homepage
        </Button>
        <Button onClick={() => window.location.reload()}>
          Reload Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorMessage;