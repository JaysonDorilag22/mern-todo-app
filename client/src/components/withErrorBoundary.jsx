import React, { Component } from 'react';
import ErrorMessage from '@/components/ui/ErrorMessage';

const withErrorBoundary = (WrappedComponent) => {
  return class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error("Error caught by ErrorBoundary: ", error, errorInfo);
    }

    resetError = () => {
      this.setState({ hasError: false, error: null });
    };

    render() {
      if (this.state.hasError) {
        return <ErrorMessage error={this.state.error} reset={this.resetError} />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrorBoundary;